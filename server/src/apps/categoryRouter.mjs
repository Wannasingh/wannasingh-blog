import express from "express";
import supabase from "../utils/db.mjs";
import protectAdmin from "../middleware/protectAdmin.mjs";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    if (error) {
      throw error;
    }

    return res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
});

categoryRouter.get("/:categoryId", async (req, res) => {
  const { id } = req.params;
  try {
    const { data: category, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json(category);
  } catch {
    return res.status(500).json({ error: "Failed to fetch category" });
  }
});

categoryRouter.post("/", protectAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const { error } = await supabase.from("categories").insert([{ name }]);
    if (error) {
      throw error;
    }
    return res.status(201).json({ message: "Created category successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to create category" });
  }
});

categoryRouter.put("/:id", protectAdmin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const { data, error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(201).json({ message: "Updated category successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to update category" });
  }
});

categoryRouter.delete("/:categoryId", protectAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json({ message: "Deleted category successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to delete category" });
  }
});

export default categoryRouter;
