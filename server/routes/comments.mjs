import express from "express";

const commentRouter = express.Router();

commentRouter.get("/comments", async (req, res) => {
    try {
        const query = "SELECT * FROM comments";
        const result = await connectionPool.query(query);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

commentRouter.get("/comments/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const query = "SELECT * FROM comments WHERE id = $1";
        const result = await connectionPool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Comment not found" });
        }
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

commentRouter.post("/comments", async (req, res) => {
    const { post_id, user_id, content } = req.body;
    try {
        const query = "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *";
        const result = await connectionPool.query(query, [post_id, user_id, content]);
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

export default commentRouter;