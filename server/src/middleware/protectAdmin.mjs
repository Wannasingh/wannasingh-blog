import jwt from "jsonwebtoken";
import db from "../utils/db.mjs";

const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretjwtkey");
    
    // Select user from Oracle
    const result = await db.execute("SELECT id, username, name, role FROM users WHERE id = :id", { id: decoded.id });
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    const user = result.rows[0];

    req.user = {
      id: user.ID,
      username: user.USERNAME,
      name: user.NAME,
      role: user.ROLE
    };

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: You do not have admin access" });
    }

    next();
  } catch (err) {
    console.error("Admin auth middleware error:", err);
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

export default protectAdmin;
