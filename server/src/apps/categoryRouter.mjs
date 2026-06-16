import express from "express";
import db from "../utils/db.mjs";
import protectAdmin from "../middleware/protectAdmin.mjs";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const result = await db.execute("SELECT id, name FROM categories ORDER BY id");
    const categories = result.rows.map(row => ({
      id: row.ID,
      name: row.NAME
    }));
    return res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
});

categoryRouter.get("/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await db.execute("SELECT id, name FROM categories WHERE id = :id", { id: parseInt(categoryId) });
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    const category = result.rows[0];
    return res.json({
      id: category.ID,
      name: category.NAME
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch category" });
  }
});

categoryRouter.post("/", protectAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    await db.execute("INSERT INTO categories (name) VALUES (:name)", { name });
    return res.status(201).json({ message: "Created category successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create category" });
  }
});

categoryRouter.put("/:id", protectAdmin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await db.execute("UPDATE categories SET name = :name WHERE id = :id", { name, id: parseInt(id) });
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(201).json({ message: "Updated category successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update category" });
  }
});

categoryRouter.delete("/:categoryId", protectAdmin, async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await db.execute("DELETE FROM categories WHERE id = :id", { id: parseInt(categoryId) });
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json({ message: "Deleted category successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete category" });
  }
});

export default categoryRouter;
