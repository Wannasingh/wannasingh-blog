import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectAdmin from "../middleware/protectAdmin.mjs";
import protectUser from "../middleware/protectUser.mjs";
import multer from "multer";

const postRouter = Router();

const multerUpload = multer({ storage: multer.memoryStorage() });

const imageFileUpload = multerUpload.fields([
  { name: "imageFile", maxCount: 1 },
]);


postRouter.post("/", [imageFileUpload, protectAdmin], async (req, res) => {
  const newPost = req.body;
  const file = req.files.imageFile[0];

  const bucketName = "articles";
  const filePath = `posts/${Date.now()}`;

  try {

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) throw uploadError;


    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(uploadData.path);


    const { error: insertError } = await supabase.from("posts").insert([
      {
        title: newPost.title,
        image: publicUrl,
        category_id: parseInt(newPost.category_id),
        description: newPost.description,
        content: newPost.content,
        status_id: parseInt(newPost.status_id),
      },
    ]);

    if (insertError) throw insertError;

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
    const from = (safePage - 1) * safeLimit;
    const to = from + safeLimit - 1;


    let query = supabase
      .from("posts")
      .select(`*, categories!inner(name), statuses!inner(status)`, { count: "exact" })
      .eq("status_id", 2);


    if (category) {
      query = query.ilike("categories.name", `%${category}%`);
    }

    if (keyword) {

      query = query.or(
        `title.ilike.%${keyword}%,description.ilike.%${keyword}%,content.ilike.%${keyword}%`
      );
    }


    const { data, count, error } = await query
      .order("date", { ascending: false })
      .range(from, to);

    if (error) throw error;


    const results = {
      totalPosts: count,
      totalPages: Math.ceil(count / safeLimit),
      currentPage: safePage,
      limit: safeLimit,
      posts: data.map((post) => ({
        ...post,
        category: post.categories?.name,
        status: post.statuses?.status,
      })),
    };

    if (to + 1 < count) {
      results.nextPage = safePage + 1;
    }
    if (from > 0) {
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
    const { data, error } = await supabase
      .from("posts")
      .select(`*, categories(name), statuses(status)`)
      .order("date", { ascending: false });

    if (error) throw error;

    const posts = data.map((post) => ({
      ...post,
      category: post.categories?.name,
      status: post.statuses?.status,
    }));

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read posts because of a database issue",
    });
  }
});


postRouter.get("/:postId", async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, categories(name), statuses(status)`)
      .eq("id", postIdFromClient)
      .eq("status_id", 2)
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: `Server could not find a requested post (post id: ${postIdFromClient})`,
      });
    }

    return res.status(200).json({
      ...data,
      category: data.categories?.name,
      status: data.statuses?.status,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server could not read post because database issue`,
    });
  }
});


postRouter.get("/admin/:postId", protectAdmin, async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, categories(name), statuses(status)`)
      .eq("id", postIdFromClient)
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: `Server could not find a requested post (post id: ${postIdFromClient})`,
      });
    }

    return res.status(200).json({
      ...data,
      category: data.categories?.name,
      status: data.statuses?.status,
    });
  } catch {
    return res.status(500).json({
      message: `Server could not read post because database issue`,
    });
  }
});


postRouter.put(
  "/:postId",
  [imageFileUpload, protectAdmin],
  async (req, res) => {
    const postIdFromClient = req.params.postId;
    const updatedPost = { ...req.body, date: new Date() };
    const bucketName = "articles";

    try {
      let publicUrl = updatedPost.image;
      const file = req.files?.imageFile?.[0];

      if (file) {
        const filePath = `posts/${Date.now()}`;
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (error) throw error;

        const response = supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);

        publicUrl = response.data.publicUrl;
      }

      const { data, error } = await supabase
        .from("posts")
        .update({
          title: updatedPost.title,
          image: publicUrl,
          category_id: parseInt(updatedPost.category_id),
          description: updatedPost.description,
          content: updatedPost.content,
          status_id: parseInt(updatedPost.status_id),
          date: updatedPost.date,
        })
        .eq("id", postIdFromClient)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: `Server could not find a requested post to update (post id: ${postIdFromClient})`,
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
  }
);


postRouter.delete("/:postId", protectAdmin, async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postIdFromClient)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Server could not find a requested post to delete (post id: ${postIdFromClient})`,
      });
    }

    return res.status(200).json({
      message: "Deleted post successfully",
    });
  } catch {
    return res.status(500).json({
      message: `Server could not delete post because database connection`,
    });
  }
});


postRouter.get("/:postId/comments", async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const { data, error } = await supabase
      .from("comments")
      .select(`*, users(name, username, profile_pic, role)`)
      .eq("post_id", postIdFromClient)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const formattedData = data.map((comment) => ({
      ...comment,
      name: comment.users?.name,
      username: comment.users?.username,
      profile_pic: comment.users?.profile_pic,
      role: comment.users?.role,
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
  const postIdFromClient = req.params.postId;
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
    const { error } = await supabase.from("comments").insert([
      {
        post_id: postIdFromClient,
        user_id: userId,
        comment_text: comment,
      },
    ]);

    if (error) throw error;

    return res.status(201).json({ message: "Created comment successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message:
        "Server could not create comment due to a database connection issue",
      error: err.message,
    });
  }
});


postRouter.get("/:postId/likes", async (req, res) => {
  const postIdFromClient = req.params.postId;
  try {
    const { count, error } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postIdFromClient);

    if (error) throw error;

    return res.status(200).json({ like_count: count });
  } catch {
    return res.status(500).json({
      message: `Server could not count likes because database connection`,
    });
  }
});


postRouter.post("/:postId/likes", protectUser, async (req, res) => {
  const postIdFromClient = req.params.postId;
  const userId = req.user.id;
  try {
    const { error } = await supabase.from("likes").insert([
      {
        post_id: postIdFromClient,
        user_id: userId,
      },
    ]);

    if (error) throw error;

    return res.status(201).json({ message: "Created like successfully" });
  } catch (err) {
    return res.status(500).json({
      message:
        "Server could not create like because of a database connection issue",
      error: err.message,
    });
  }
});


postRouter.delete("/:postId/likes", protectUser, async (req, res) => {
  const postIdFromClient = req.params.postId;
  const userId = req.user.id;
  try {
    const { data, error } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postIdFromClient)
      .eq("user_id", userId)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Like not found or you do not own this like" });
    }

    return res.status(200).json({ message: "Deleted like successfully" });
  } catch (err) {
    return res.status(500).json({
      message: `Server could not delete like due to a database connection issue`,
      error: err.message,
    });
  }
});

export default postRouter;
