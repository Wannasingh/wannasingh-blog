import "dotenv/config";
import express from "express";
import cors from "cors";
import postRouter from "./src/routes/postRouter.mjs";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import categoryRouter from "./src/routes/categoryRouter.mjs";
import authRouter from "./src/routes/authRouter.mjs";

const app = express();
const port = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to my blog API!");
});

// Routes
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wannasingh Blog API",
      version: "1.0.0",
      description: "API documentation for Wannasingh Blog",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.mjs"], // Path to the API routes files
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
