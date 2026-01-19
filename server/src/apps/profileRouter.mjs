import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectUser from "../middleware/protectUser.mjs";
import multer from "multer";

const profileRouter = Router();
const multerUpload = multer({ storage: multer.memoryStorage() });
const imageFileUpload = multerUpload.fields([
  { name: "imageFile", maxCount: 1 },
]);

profileRouter.put("/", [imageFileUpload, protectUser], async (req, res) => {
  const { id: userId } = req.user;
  const { name, username } = req.body;
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
