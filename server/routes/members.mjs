import express from "express";
import supabase from "../utils/db.mjs";

const memberRouter = express.Router();

memberRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

memberRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Member not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

memberRouter.post("/", async (req, res) => {
  try {
    const newMember = req.body;
    const { data, error } = await supabase
      .from('members')
      .insert([newMember])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

memberRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMember = req.body;
    const { data, error } = await supabase
      .from('members')
      .update(updatedMember)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: "Member not found" });
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

memberRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default memberRouter;
