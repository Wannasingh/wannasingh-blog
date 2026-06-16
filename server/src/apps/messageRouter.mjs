import { Router } from "express";
import oracledb from "oracledb";
import db from "../utils/db.mjs";
import protectUser from "../middleware/protectUser.mjs";

const messageRouter = Router();

// Get all conversations for a user
messageRouter.get("/conversations", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const querySql = `
      SELECT m.*, 
             s.name AS sender_name, s.profile_pic AS sender_profile_pic,
             r.name AS receiver_name, r.profile_pic AS receiver_profile_pic
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      JOIN users r ON m.receiver_id = r.id
      WHERE m.sender_id = :userId OR m.receiver_id = :userId
      ORDER BY m.created_at DESC
    `;

    const result = await db.execute(querySql, { userId });

    // Group by conversation
    const conversations = {};
    result.rows.forEach((row) => {
      const msg = {
        id: row.ID,
        sender_id: row.SENDER_ID,
        receiver_id: row.RECEIVER_ID,
        message: row.MESSAGE,
        is_read: row.IS_READ === "Y",
        created_at: row.CREATED_AT,
        sender: {
          id: row.SENDER_ID,
          name: row.SENDER_NAME,
          profile_pic: row.SENDER_PROFILE_PIC
        },
        receiver: {
          id: row.RECEIVER_ID,
          name: row.RECEIVER_NAME,
          profile_pic: row.RECEIVER_PROFILE_PIC
        }
      };

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

    const querySql = `
      SELECT m.*, 
             s.name AS sender_name, s.profile_pic AS sender_profile_pic
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      WHERE (m.sender_id = :currentUserId AND m.receiver_id = :otherUserId)
         OR (m.sender_id = :otherUserId AND m.receiver_id = :currentUserId)
      ORDER BY m.created_at ASC
    `;

    const result = await db.execute(querySql, { currentUserId, otherUserId });

    // Mark messages as read (only messages sent TO current user FROM other user)
    const updateSql = `
      UPDATE messages 
      SET is_read = 'Y' 
      WHERE receiver_id = :currentUserId 
        AND sender_id = :otherUserId 
        AND is_read = 'N'
    `;
    const updateResult = await db.execute(updateSql, { currentUserId, otherUserId });
    if (updateResult.rowsAffected > 0) {
      console.log(`Marked ${updateResult.rowsAffected} messages as read`);
    }

    const messages = result.rows.map(row => ({
      id: row.ID,
      sender_id: row.SENDER_ID,
      receiver_id: row.RECEIVER_ID,
      message: row.MESSAGE,
      is_read: row.RECEIVER_ID === currentUserId && row.SENDER_ID === otherUserId ? true : (row.IS_READ === "Y"),
      created_at: row.CREATED_AT,
      sender: {
        id: row.SENDER_ID,
        name: row.SENDER_NAME,
        profile_pic: row.SENDER_PROFILE_PIC
      }
    }));

    return res.status(200).json(messages);
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

    const insertSql = `
      INSERT INTO messages (sender_id, receiver_id, message, is_read)
      VALUES (:senderId, :receiverId, :message, 'N')
      RETURNING id INTO :id
    `;

    const result = await db.execute(insertSql, {
      senderId,
      receiverId,
      message: message.trim(),
      id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    });

    const newId = result.outBinds.id[0];

    const selectSql = `
      SELECT m.*, s.name AS sender_name, s.profile_pic AS sender_profile_pic
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      WHERE m.id = :newId
    `;
    const selectResult = await db.execute(selectSql, { newId });
    const row = selectResult.rows[0];

    const newMsg = {
      id: row.ID,
      sender_id: row.SENDER_ID,
      receiver_id: row.RECEIVER_ID,
      message: row.MESSAGE,
      is_read: row.IS_READ === "Y",
      created_at: row.CREATED_AT,
      sender: {
        id: row.SENDER_ID,
        name: row.SENDER_NAME,
        profile_pic: row.SENDER_PROFILE_PIC
      }
    };

    return res.status(201).json(newMsg);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send message" });
  }
});

// Get unread message count
messageRouter.get("/unread/count", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const querySql = `
      SELECT COUNT(*) AS count 
      FROM messages 
      WHERE receiver_id = :userId 
        AND is_read = 'N'
    `;
    const result = await db.execute(querySql, { userId });
    const count = result.rows[0]?.COUNT || 0;

    return res.status(200).json({ count });
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
