import express from "express";
import cors from "cors";

import postRouter from "./routes/posts.mjs";
import commentRouter from "./routes/comments.mjs";
import memberRouter from "./routes/members.mjs";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use("/members", memberRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Wannasingh Blog API!");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
