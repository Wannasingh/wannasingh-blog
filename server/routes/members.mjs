import { Router } from "express";

const memberRouter = Router();

memberRouter.get("/members", (req, res) => {
    res.send("Get all members");
});

memberRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Get member with id: ${id}`);
});

memberRouter.post("/", (req, res) => {
  const newMember = req.body;
  res.status(201).send(`Created member: ${JSON.stringify(newMember)}`);
});

memberRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedMember = req.body;
  res.send(
    `Updated member with id: ${id} to: ${JSON.stringify(updatedMember)}`
  );
});

memberRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Deleted member with id: ${id}`);
});

export default memberRouter;
