import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectUser from "../middleware/protectUser.mjs";

const messageRouter = Router();

// Get all conversations for a user
messageRouter.get("/conversations", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, name, profile_pic),
        receiver:users!messages_receiver_id_fkey(id, name, profile_pic)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Group by conversation
    const conversations = {};
    data.forEach((msg) => {
      const otherUserId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user: msg.sender_id === userId ? msg.receiver : msg.sender,
          lastMessage: msg.message,
          lastMessageTime: msg.created_at,
          unreadCount: 0,
        };
      }
      if (!msg.is_read && msg.receiver_id === userId) {
        conversations[otherUserId].unreadCount++;
      }
    });

    const conversationList = Object.values(conversations);
    return res.status(200).json(conversationList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get conversations" });
  }
});

// Get messages with a specific user
messageRouter.get("/:userId", protectUser, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.userId;

    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, name, profile_pic)
      `)
      .or(
        `and(sender_id.eq.${currentUserId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${currentUserId})`
      )
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Mark messages as read (only messages sent TO current user FROM other user)
    const { data: updatedMessages, error: updateError } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("receiver_id", currentUserId)
      .eq("sender_id", otherUserId)
      .eq("is_read", false)
      .select();

    if (updateError) {
      console.error("Error marking messages as read:", updateError);
    } else if (updatedMessages && updatedMessages.length > 0) {
      console.log(`Marked ${updatedMessages.length} messages as read`);
      // Update the data to reflect the read status
      data.forEach(msg => {
        if (msg.receiver_id === currentUserId && msg.sender_id === otherUserId) {
          msg.is_read = true;
        }
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get messages" });
  }
});

// Send a message
messageRouter.post("/", protectUser, async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    if (!receiverId || !message || message.trim().length === 0) {
      return res.status(400).json({ message: "Receiver and message are required" });
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id: senderId,
          receiver_id: receiverId,
          message: message.trim(),
        },
      ])
      .select();

    if (error) throw error;

    return res.status(201).json(data[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send message" });
  }
});

// Get unread message count
messageRouter.get("/unread/count", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("receiver_id", userId)
      .eq("is_read", false);

    if (error) throw error;

    return res.status(200).json({ count: count || 0 });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ count: 0 });
  }
});

// Simple in-memory store for typing status (in production, use Redis)
const typingStatus = new Map();

// Set typing status
messageRouter.post("/typing", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { receiverId } = req.body;
    
    const key = `${userId}-${receiverId}`;
    typingStatus.set(key, Date.now());
    
    // Auto-clear after 3 seconds
    setTimeout(() => {
      typingStatus.delete(key);
    }, 3000);
    
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update typing status" });
  }
});

// Get typing status
messageRouter.get("/typing/:userId", protectUser, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.userId;
    
    const key = `${otherUserId}-${currentUserId}`;
    const lastTyping = typingStatus.get(key);
    
    // Consider typing if last update was within 2 seconds
    const isTyping = lastTyping && (Date.now() - lastTyping < 2000);
    
    return res.status(200).json({ isTyping });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ isTyping: false });
  }
});

export default messageRouter;
