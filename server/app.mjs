import express from "express";
import cors from "cors";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Wannasingh Blog API!");
});

app.post("/posts", async (req, res) => {
  const newPost = req.body;
  try {
    const query = `insert into posts (title, image, category_id, description, content, status_id)
    values ($1, $2, $3, $4, $5, $6)`;
    const values = [
      newPost.title,
      newPost.image,
      newPost.category_id,
      newPost.description,
      newPost.content,
      newPost.status_id,
    ];

    await connectionPool.query(query, values);
  } catch {
    return res.status(500).json({
      message: `Server could not create post because database connection`,
    });
  }
  return res.status(201).json({ message: "Created post successfully" });
});

app.get("/posts", async (req, res) => {
  const { keyword } = req.query;

  try {
    const query = keyword
      ? `select * from posts where title ILIKE '%${keyword}%'`
      : "select * from posts";

    const result = await connectionPool.query(query);
    return res.status(200).json(result.rows);
  } catch {
    return res.status(500).json({
      message: `Server could not fetch posts because database connection`,
    });
  }
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = "select * from posts where id = $1";
    const values = [id];
    const result = await connectionPool.query(query, values);

    if (!result.rows.length) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch {
    return res.status(500).json({
      message: `Server could not fetch post because database connection`,
    });
  }
});

app.get("/posts", async (req, res) => {
  const category = req.query.category;
  const length = req.query.length;

  try {
    const query = category
      ? `select * from posts where category_id = $1 limit $2`
      : "select * from posts limit $1";
    const values = category ? [category, length] : [length];
    const result = await connectionPool.query(query, values);

    return res.status(200).json(result.rows);
  } catch {
    return res.status(500).json({
      message: `Server could not fetch posts because database connection`,
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
