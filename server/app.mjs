import "dotenv/config";
import express from "express";
import cors from "cors";
import postRouter from "./src/apps/postRouter.mjs";
import categoryRouter from "./src/apps/categoryRouter.mjs";
import authRouter from "./src/apps/auth.mjs";
import profileRouter from "./src/apps/profileRouter.mjs";
import notificationRouter from "./src/apps/notificationRouter.mjs";
import messageRouter from "./src/apps/messageRouter.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to My Personal Blog API Server! 👋");
});

app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/notifications", notificationRouter);
app.use("/messages", messageRouter);

// For local development and standalone VM deployment
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

// Export for Vercel
export default app;
