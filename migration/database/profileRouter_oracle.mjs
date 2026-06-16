import { Router } from "express";
import db from "./db_oracle.mjs";
import protectUser from "../../server/src/middleware/protectUser.mjs";
import multer from "multer";
import fs from "fs/promises";
import path from "path";

const profileRouter = Router();
const multerUpload = multer({ storage: multer.memoryStorage() });
const imageFileUpload = multerUpload.fields([
  { name: "imageFile", maxCount: 1 },
]);

const UPLOADS_DIR = process.env.UPLOADS_DIR || "/var/www/uploads/profiles";

// Get main author (first admin user) for homepage
profileRouter.get("/author", async (req, res) => {
  try {
    const querySql = `
      SELECT id, name, username, profile_pic, bio 
      FROM users 
      WHERE role = 'admin' 
      ORDER BY created_at ASC 
      OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY
    `;

    const result = await db.execute(querySql);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    const author = result.rows[0];
    return res.status(200).json({
      id: author.ID,
      name: author.NAME,
      username: author.USERNAME,
      profile_pic: author.PROFILE_PIC,
      bio: author.BIO
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to get author profile",
      error: err.message,
    });
  }
});

// Get user profile by ID (public)
profileRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const querySql = `
      SELECT id, name, username, profile_pic, role, bio 
      FROM users 
      WHERE id = :userId
    `;

    const result = await db.execute(querySql, { userId });
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    return res.status(200).json({
      id: user.ID,
      name: user.NAME,
      username: user.USERNAME,
      profile_pic: user.PROFILE_PIC,
      role: user.ROLE,
      bio: user.BIO
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to get user profile",
      error: err.message,
    });
  }
});

profileRouter.put("/", [imageFileUpload, protectUser], async (req, res) => {
  const { id: userId } = req.user;
  const { name, username, bio } = req.body;
  const file = req.files?.imageFile?.[0];

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  if (name && (name.trim().length === 0 || name.length > 100)) {
    return res
      .status(400)
      .json({ message: "Name cannot be empty or exceed 100 characters" });
  }

  if (username && (username.trim().length === 0 || username.length > 50)) {
    return res
      .status(400)
      .json({ message: "Username cannot be empty or exceed 50 characters" });
  }

  if (bio && bio.length > 500) {
    return res
      .status(400)
      .json({ message: "Bio cannot exceed 500 characters" });
  }

  let profilePicUrl = null;

  try {
    if (file) {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      const filename = `profile-${userId}-${Date.now()}${path.extname(file.originalname)}`;
      const localFilePath = path.join(UPLOADS_DIR, filename);
      await fs.writeFile(localFilePath, file.buffer);
      profilePicUrl = `/uploads/profiles/${filename}`;
    }

    // Dynamic SQL update builder for Oracle
    const updateFields = [];
    const binds = { userId };

    if (name) {
      updateFields.push("name = :name");
      binds.name = name;
    }
    if (username) {
      updateFields.push("username = :username");
      binds.username = username;
    }
    if (bio !== undefined) {
      updateFields.push("bio = :bio");
      binds.bio = bio;
    }
    if (profilePicUrl) {
      updateFields.push("profile_pic = :profilePic");
      binds.profilePic = profilePicUrl;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update provided" });
    }

    const updateSql = `
      UPDATE users 
      SET ${updateFields.join(", ")}
      WHERE id = :userId
    `;

    const result = await db.execute(updateSql, binds);

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "User profile not found to update" });
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
});

export default profileRouter;
