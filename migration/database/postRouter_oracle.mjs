import { Router } from "express";
import db from "./db_oracle.mjs";
import protectAdmin from "../../server/src/middleware/protectAdmin.mjs";
import protectUser from "../../server/src/middleware/protectUser.mjs";
import multer from "multer";
import fs from "fs/promises";
import path from "path";

const postRouter = Router();

const multerUpload = multer({ storage: multer.memoryStorage() });

const imageFileUpload = multerUpload.fields([
  { name: "imageFile", maxCount: 1 },
]);

// Local file storage settings for VM deployment replacing Supabase Storage
const UPLOADS_DIR = process.env.UPLOADS_DIR || "/var/www/uploads/posts";

postRouter.post("/", [imageFileUpload, protectAdmin], async (req, res) => {
  const newPost = req.body;
  const file = req.files.imageFile[0];
  const userId = req.user.id; 

  try {
    // Save image locally replacing Supabase storage bucket upload
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    const filename = `posts-${Date.now()}${path.extname(file.originalname)}`;
    const localFilePath = path.join(UPLOADS_DIR, filename);
    await fs.writeFile(localFilePath, file.buffer);

    // URL path served by Nginx reverse proxy
    const publicUrl = `/uploads/posts/${filename}`;

    const insertSql = `
      INSERT INTO posts (title, image, category_id, description, content, status_id, user_id, date)
      VALUES (:title, :image, :category_id, :description, :content, :status_id, :user_id, CURRENT_TIMESTAMP)
    `;

    await db.execute(insertSql, {
      title: newPost.title,
      image: publicUrl,
      category_id: parseInt(newPost.category_id),
      description: newPost.description,
      content: newPost.content,
      status_id: parseInt(newPost.status_id),
      user_id: userId
    });

    return res.status(201).json({ message: "Created post successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not create post because database connection`,
    });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const category = req.query.category || "";
    const keyword = req.query.keyword || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(100, limit));
    const offset = (safePage - 1) * safeLimit;

    // Building search queries in Oracle Database using bind variables dynamically
    let querySql = `
      SELECT p.*, 
             c.name AS category_name, 
             s.status AS status_name,
             u.name AS author_name, 
             u.profile_pic AS author_profile_pic,
             COUNT(*) OVER() AS total_count
      FROM posts p
      JOIN categories c ON p.category_id = c.id
      JOIN statuses s ON p.status_id = s.id
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.status_id = 2
    `;

    const binds = {};

    if (category) {
      querySql += ` AND LOWER(c.name) LIKE :category`;
      binds.category = `%${category.toLowerCase()}%`;
    }

    if (keyword) {
      querySql += ` AND (LOWER(p.title) LIKE :keyword 
                     OR LOWER(p.description) LIKE :keyword 
                     OR DBMS_LOB.INSTR(LOWER(p.content), :keyword) > 0)`;
      binds.keyword = `%${keyword.toLowerCase()}%`;
    }

    // Oracle pagination: OFFSET offset ROWS FETCH NEXT limit ROWS ONLY
    querySql += ` ORDER BY p."DATE" DESC OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`;
    binds.offset = offset;
    binds.limit = safeLimit;

    const result = await db.execute(querySql, binds);
    const data = result.rows;

    const count = data.length > 0 ? data[0].TOTAL_COUNT : 0;

    const results = {
      totalPosts: count,
      totalPages: Math.ceil(count / safeLimit),
      currentPage: safePage,
      limit: safeLimit,
      posts: data.map((post) => ({
        id: post.ID,
        title: post.TITLE,
        image: post.IMAGE,
        category_id: post.CATEGORY_ID,
        description: post.DESCRIPTION,
        content: post.CONTENT,
        status_id: post.STATUS_ID,
        user_id: post.USER_ID,
        date: post.DATE,
        category: post.CATEGORY_NAME,
        status: post.STATUS_NAME,
        author: {
          id: post.USER_ID,
          name: post.AUTHOR_NAME || "Wannasingh K.",
          profile_pic: post.AUTHOR_PROFILE_PIC || null
        }
      })),
    };

    if (offset + safeLimit < count) {
      results.nextPage = safePage + 1;
    }
    if (offset > 0) {
      results.previousPage = safePage - 1;
    }

    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not read post because database issue",
    });
  }
});

postRouter.get("/admin", protectAdmin, async (req, res) => {
  try {
    const querySql = `
      SELECT p.*, c.name AS category_name, s.status AS status_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN statuses s ON p.status_id = s.id
      ORDER BY p."DATE" DESC
    `;

    const result = await db.execute(querySql);
    const posts = result.rows.map((post) => ({
      id: post.ID,
      title: post.TITLE,
      image: post.IMAGE,
      category_id: post.CATEGORY_ID,
      description: post.DESCRIPTION,
      content: post.CONTENT,
      status_id: post.STATUS_ID,
      user_id: post.USER_ID,
      date: post.DATE,
      category: post.CATEGORY_NAME,
      status: post.STATUS_NAME,
    }));

    return res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server could not read posts because of a database issue",
    });
  }
});

postRouter.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const querySql = `
      SELECT p.*, c.name AS category_name, s.status AS status_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN statuses s ON p.status_id = s.id
      WHERE p.id = :postId AND p.status_id = 2
    `;

    const result = await db.execute(querySql, { postId });
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Server could not find a requested post (post id: ${postId})`,
      });
    }

    const post = result.rows[0];

    return res.status(200).json({
      id: post.ID,
      title: post.TITLE,
      image: post.IMAGE,
      category_id: post.CATEGORY_ID,
      description: post.DESCRIPTION,
      content: post.CONTENT,
      status_id: post.STATUS_ID,
      user_id: post.USER_ID,
      date: post.DATE,
      category: post.CATEGORY_NAME,
      status: post.STATUS_NAME,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not read post because database issue`,
    });
  }
});

postRouter.get("/admin/:postId", protectAdmin, async (req, res) => {
  const postId = req.params.postId;

  try {
    const querySql = `
      SELECT p.*, c.name AS category_name, s.status AS status_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN statuses s ON p.status_id = s.id
      WHERE p.id = :postId
    `;

    const result = await db.execute(querySql, { postId });
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: `Server could not find a requested post (post id: ${postId})`,
      });
    }

    const post = result.rows[0];

    return res.status(200).json({
      id: post.ID,
      title: post.TITLE,
      image: post.IMAGE,
      category_id: post.CATEGORY_ID,
      description: post.DESCRIPTION,
      content: post.CONTENT,
      status_id: post.STATUS_ID,
      user_id: post.USER_ID,
      date: post.DATE,
      category: post.CATEGORY_NAME,
      status: post.STATUS_NAME,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not read post because database issue`,
    });
  }
});

postRouter.put("/:postId", [imageFileUpload, protectAdmin], async (req, res) => {
  const postId = req.params.postId;
  const updatedPost = req.body;

  try {
    let publicUrl = updatedPost.image;
    const file = req.files?.imageFile?.[0];

    if (file) {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      const filename = `posts-${Date.now()}${path.extname(file.originalname)}`;
      const localFilePath = path.join(UPLOADS_DIR, filename);
      await fs.writeFile(localFilePath, file.buffer);
      publicUrl = `/uploads/posts/${filename}`;
    }

    const updateSql = `
      UPDATE posts 
      SET title = :title,
          image = :image,
          category_id = :category_id,
          description = :description,
          content = :content,
          status_id = :status_id,
          "DATE" = CURRENT_TIMESTAMP
      WHERE id = :postId
    `;

    const result = await db.execute(updateSql, {
      title: updatedPost.title,
      image: publicUrl,
      category_id: parseInt(updatedPost.category_id),
      description: updatedPost.description,
      content: updatedPost.content,
      status_id: parseInt(updatedPost.status_id),
      postId: postId
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        message: `Server could not find a requested post to update (post id: ${postId})`,
      });
    }

    return res.status(200).json({
      message: "Updated post successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not update post due to an error`,
    });
  }
});

postRouter.delete("/:postId", protectAdmin, async (req, res) => {
  const postId = req.params.postId;

  try {
    const deleteSql = `DELETE FROM posts WHERE id = :postId`;
    const result = await db.execute(deleteSql, { postId });

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        message: `Server could not find a requested post to delete (post id: ${postId})`,
      });
    }

    return res.status(200).json({
      message: "Deleted post successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not delete post because database connection`,
    });
  }
});

postRouter.get("/:postId/comments", async (req, res) => {
  const postId = req.params.postId;

  try {
    const querySql = `
      SELECT c.*, u.name, u.username, u.profile_pic, u.role
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = :postId
      ORDER BY c.created_at DESC
    `;

    const result = await db.execute(querySql, { postId });
    const formattedData = result.rows.map((comment) => ({
      id: comment.ID,
      post_id: comment.POST_ID,
      user_id: comment.USER_ID,
      comment_text: comment.COMMENT_TEXT,
      created_at: comment.CREATED_AT,
      name: comment.NAME,
      username: comment.USERNAME,
      profile_pic: comment.PROFILE_PIC,
      role: comment.ROLE,
    }));

    return res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not read comments because database connection`,
    });
  }
});

postRouter.post("/:postId/comments", protectUser, async (req, res) => {
  const postId = req.params.postId;
  const { id: userId } = req.user;
  const { comment } = req.body;

  if (!comment || comment.trim().length === 0) {
    return res.status(400).json({ message: "Comment content cannot be empty" });
  }

  if (comment.length > 500) {
    return res.status(400).json({
      message: "Comment content exceeds the maximum length of 500 characters",
    });
  }

  try {
    await db.executeTransaction(async (conn) => {
      // 1. Insert comment
      const insertSql = `
        INSERT INTO comments (post_id, user_id, comment_text, created_at)
        VALUES (:post_id, :user_id, :comment_text, CURRENT_TIMESTAMP)
      `;
      await conn.execute(insertSql, {
        post_id: postId,
        user_id: userId,
        comment_text: comment
      });

      // 2. Get post author
      const postQuery = `SELECT user_id FROM posts WHERE id = :post_id`;
      const postRes = await conn.execute(postQuery, { post_id: postId });

      if (postRes.rows.length > 0) {
        const postAuthorId = postRes.rows[0].USER_ID;
        // 3. Insert notification if not self
        if (postAuthorId !== userId) {
          const notifSql = `
            INSERT INTO notifications (user_id, post_id, type, content, is_read, created_at)
            VALUES (:user_id, :post_id, 'comment', :content, 'N', CURRENT_TIMESTAMP)
          `;
          await conn.execute(notifSql, {
            user_id: userId,
            post_id: postId,
            content: comment.substring(0, 100)
          });
        }
      }
    });

    return res.status(201).json({ message: "Created comment successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not create comment due to a database connection issue",
      error: err.message,
    });
  }
});

postRouter.get("/:postId/likes", async (req, res) => {
  const postId = req.params.postId;
  try {
    const sql = `SELECT COUNT(*) AS like_count FROM likes WHERE post_id = :postId`;
    const result = await db.execute(sql, { postId });
    return res.status(200).json({ like_count: result.rows[0].LIKE_COUNT });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not count likes because database connection`,
    });
  }
});

postRouter.post("/:postId/likes", protectUser, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    await db.executeTransaction(async (conn) => {
      // 1. Insert like
      const insertSql = `INSERT INTO likes (post_id, user_id) VALUES (:post_id, :user_id)`;
      await conn.execute(insertSql, { post_id: postId, user_id: userId });

      // 2. Get post author to notify
      const postQuery = `SELECT user_id FROM posts WHERE id = :post_id`;
      const postRes = await conn.execute(postQuery, { post_id: postId });

      if (postRes.rows.length > 0) {
        const postAuthorId = postRes.rows[0].USER_ID;
        if (postAuthorId !== userId) {
          const notifSql = `
            INSERT INTO notifications (user_id, post_id, type, is_read, created_at)
            VALUES (:user_id, :post_id, 'like', 'N', CURRENT_TIMESTAMP)
          `;
          await conn.execute(notifSql, { user_id: userId, post_id: postId });
        }
      }
    });

    return res.status(201).json({ message: "Created like successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not create like because of a database connection issue",
      error: err.message,
    });
  }
});

postRouter.delete("/:postId/likes", protectUser, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    const deleteSql = `DELETE FROM likes WHERE post_id = :post_id AND user_id = :user_id`;
    const result = await db.execute(deleteSql, { post_id: postId, user_id: userId });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "Like not found or you do not own this like" });
    }

    return res.status(200).json({ message: "Deleted like successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not delete like due to a database connection issue`,
      error: err.message,
    });
  }
});

export default postRouter;
