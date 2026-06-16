import { Router } from "express";
import db from "../utils/db.mjs";
import protectAdmin from "../middleware/protectAdmin.mjs";

const notificationRouter = Router();

// Get all notifications for admin (only their posts)
notificationRouter.get("/", protectAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    console.log('Admin ID:', adminId); // Debug log

    const querySql = `
      SELECT n.id, n.type, n.post_id, n.content, n.is_read, n.created_at,
             u.name AS user_name, u.profile_pic AS user_avatar,
             p.title AS article_title
      FROM notifications n
      JOIN posts p ON n.post_id = p.id
      JOIN users u ON n.user_id = u.id
      WHERE p.user_id = :adminId
      ORDER BY n.created_at DESC
      OFFSET 0 ROWS FETCH NEXT 50 ROWS ONLY
    `;

    const result = await db.execute(querySql, { adminId });

    const formattedData = result.rows.map((row) => ({
      id: row.ID,
      type: row.TYPE,
      user_name: row.USER_NAME,
      user_avatar: row.USER_AVATAR,
      article_title: row.ARTICLE_TITLE,
      post_id: row.POST_ID,
      content: row.CONTENT,
      created_at: row.CREATED_AT,
      is_read: row.IS_READ === "Y",
    }));

    return res.status(200).json(formattedData);
  } catch (err) {
    console.error('Error in notifications route:', err);
    return res.status(500).json({
      message: "Server could not read notifications",
      error: err.message,
    });
  }
});

// Get unread notification count
notificationRouter.get("/unread-count", protectAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;

    const querySql = `
      SELECT COUNT(*) AS count
      FROM notifications n
      JOIN posts p ON n.post_id = p.id
      WHERE p.user_id = :adminId AND n.is_read = 'N'
    `;
    const result = await db.execute(querySql, { adminId });
    const count = result.rows[0]?.COUNT || 0;

    return res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ count: 0 });
  }
});

// Mark notification as read
notificationRouter.put("/:notificationId/read", protectAdmin, async (req, res) => {
  try {
    const notificationId = req.params.notificationId;

    const updateSql = `
      UPDATE notifications
      SET is_read = 'Y'
      WHERE id = :notificationId
    `;
    await db.execute(updateSql, { notificationId: parseInt(notificationId) });

    return res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not update notification",
    });
  }
});

// Mark all notifications as read
notificationRouter.put("/read-all", protectAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;

    const updateSql = `
      UPDATE notifications n
      SET n.is_read = 'Y'
      WHERE n.is_read = 'N'
        AND n.post_id IN (SELECT p.id FROM posts p WHERE p.user_id = :adminId)
    `;
    await db.execute(updateSql, { adminId });

    return res.status(200).json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not update notifications",
    });
  }
});

export default notificationRouter;
