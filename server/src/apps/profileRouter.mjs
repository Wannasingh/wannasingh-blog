import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectUser from "../middleware/protectUser.mjs";
import multer from "multer";

const profileRouter = Router();
const multerUpload = multer({ storage: multer.memoryStorage() });
const imageFileUpload = multerUpload.fields([
  { name: "imageFile", maxCount: 1 },
]);

// Get main author (first admin user) for homepage
profileRouter.get("/author", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, username, profile_pic, bio")
      .eq("role", "admin")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.status(200).json(data);
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
    const { data, error } = await supabase
      .from("users")
      .select("id, name, username, profile_pic, role, bio")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
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
      const bucketName = "profiles";
      const filePath = `profiles/${userId}-${Date.now()}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error("Upload Error:", error);
        throw new Error("Failed to upload profile picture to storage");
      }


      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(data.path);
      profilePicUrl = publicUrl;
    }


    const updateData = {};
    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (bio !== undefined) updateData.bio = bio; // Allow empty string to clear bio
    if (profilePicUrl) updateData.profile_pic = profilePicUrl;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update provided" });
    }


    const { error: updateError } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId);

    if (updateError) {
      throw updateError;
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
