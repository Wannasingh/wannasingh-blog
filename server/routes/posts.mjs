import express, { Router } from "express";

const postRouter = Router();



postRouter.get("/posts", async (req, res) => {
    try {
        const query = "SELECT * FROM posts";
        const result = await connectionPool.query(query);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

postRouter.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const query = "SELECT * FROM posts WHERE id = $1";
        const result = await connectionPool.query(query, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

postRouter.post("/posts", async (req, res) => {

    const { title, image, category_id, description, content, status_id } = req.body;
});

postRouter.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { title, image, category_id, description, content, status_id } = req.body;

    try {
        const query = "UPDATE posts SET title=$1, image=$2, category_id=$3, description=$4, content=$5, status_id=$6 WHERE id=$7 RETURNING *";
        const result = await connectionPool.query(query, [title, image, category_id, description, content, status_id, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

export default postRouter;