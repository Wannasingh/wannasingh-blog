import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectAdmin from "../middleware/protectAdmin.mjs";

const notificationRouter = Router();

// Get all notifications for admin (only their posts)
notificationRouter.get("/", protectAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    console.log('Admin ID:', adminId); // Debug log

    // First get all post IDs created by this admin
    const { data: adminPosts, error: postsError } = await supabase
      .from("posts")
      .select("id")
      .eq("user_id", adminId);

    console.log('Admin Posts:', adminPosts); // Debug log

    if (postsError) {
      console.error('Posts Error:', postsError);
      throw postsError;
    }

    const postIds = adminPosts.map(post => post.id);
    console.log('Post IDs:', postIds); // Debug log

    if (postIds.length === 0) {
      return res.status(200).json([]);
    }

    // Get notifications for those posts
    const { data, error } = await supabase
      .from("notifications")
      .select(`
        *,
        users!notifications_user_id_fkey(name, profile_pic),
        posts!notifications_post_id_fkey(title)
      `)
      .in("post_id", postIds)
      .order("created_at", { ascending: false })
      .limit(50);

    console.log('Notifications:', data); // Debug log

    if (error) {
      console.error('Notifications Error:', error);
      throw error;
    }

    const formattedData = data.map((notification) => ({
      id: notification.id,
      type: notification.type,
      user_name: notification.users?.name,
      user_avatar: notification.users?.profile_pic,
      article_title: notification.posts?.title,
      post_id: notification.post_id,
      content: notification.content,
      created_at: notification.created_at,
      is_read: notification.is_read,
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

    // First get all post IDs created by this admin
    const { data: adminPosts, error: postsError } = await supabase
      .from("posts")
      .select("id")
      .eq("user_id", adminId);

    if (postsError) throw postsError;

    const postIds = adminPosts.map(post => post.id);

    if (postIds.length === 0) {
      return res.status(200).json({ count: 0 });
    }

    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .in("post_id", postIds)
      .eq("is_read", false);

    if (error) throw error;

    return res.status(200).json({ count: count || 0 });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ count: 0 });
  }
});

// Mark notification as read
notificationRouter.put("/:notificationId/read", protectAdmin, async (req, res) => {
  try {
    const notificationId = req.params.notificationId;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    if (error) throw error;

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

    // First get all post IDs created by this admin
    const { data: adminPosts, error: postsError } = await supabase
      .from("posts")
      .select("id")
      .eq("user_id", adminId);

    if (postsError) throw postsError;

    const postIds = adminPosts.map(post => post.id);

    if (postIds.length === 0) {
      return res.status(200).json({ message: "No notifications to update" });
    }

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .in("post_id", postIds)
      .eq("is_read", false);

    if (error) throw error;

    return res.status(200).json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not update notifications",
    });
  }
});

export default notificationRouter;
