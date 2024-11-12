import express from "express";
import supabase from "../utils/db.mjs";

const commentRouter = express.Router();

commentRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

commentRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Comment not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

commentRouter.post("/", async (req, res) => {
  try {
    const newComment = req.body;
    const { data, error } = await supabase
      .from('comments')
      .insert([newComment])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

commentRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = req.body;
    const { data, error } = await supabase
      .from('comments')
      .update(updatedComment)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: "Comment not found" });
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

commentRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default commentRouter;