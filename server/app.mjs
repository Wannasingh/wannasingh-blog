import express from "express";
import cors from "cors";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/profiles", (req, res) => {
  try {
    const profileData = {
      name: "john",
      age: 20,
    };
    return res.json({
      data: profileData,
    });
  } catch (error) {
    Error.captureStackTrace(error);
    console.error("Error fetching profile data:", error.stack);
    return res.status(500).json({
      error: "An error occurred while fetching the profile data.",
    });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
    };
    console.log(newPost);
    await connectionPool.query(
      `INSERT INTO posts (user_id, title, content, category, length, created_at, updated_at, published_at, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        1,
        newPost.title,
        newPost.content,
        newPost.category,
        newPost.length,
        newPost.createdAt,
        newPost.updatedAt,
        newPost.publishedAt,
        newPost.status,
      ]
    );
    return res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error) {
    Error.captureStackTrace(error);
    console.error("Error creating post:", error.stack);
    return res.status(500).json({
      error: "An error occurred while creating the post.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
