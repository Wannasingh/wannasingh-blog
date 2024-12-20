import "dotenv/config";
import express from "express";
import cors from "cors";
import postRouter from "./src/apps/postRouter.mjs";
import categoryRouter from "./src/apps/categoryRouter.mjs";
import authRouter from "./src/apps/auth.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});