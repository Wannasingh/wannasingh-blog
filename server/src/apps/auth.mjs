import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import db from "../utils/db.mjs";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, username, name } = req.body;

  try {
    // Check if username already exists
    const checkUsername = await db.execute(
      "SELECT id FROM users WHERE username = :username",
      { username }
    );
    if (checkUsername.rows.length > 0) {
      return res.status(400).json({ error: "This username is already taken" });
    }

    // Check if email already exists
    const checkEmail = await db.execute(
      "SELECT id FROM users WHERE email = :email",
      { email }
    );
    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = crypto.randomUUID();

    const insertSql = `
      INSERT INTO users (id, username, email, name, password, role)
      VALUES (:id, :username, :email, :name, :password, 'user')
    `;

    await db.execute(insertSql, {
      id: userId,
      username,
      email,
      name,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: userId,
        username,
        email,
        name,
        role: "user"
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const querySql = `
      SELECT id, username, email, name, password, role 
      FROM users 
      WHERE email = :email OR username = :email
    `;
    const result = await db.execute(querySql, { email });

    if (result.rows.length === 0) {
      return res.status(400).json({
        error: "Your password is incorrect or this email doesn't exist",
      });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);

    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Your password is incorrect or this email doesn't exist",
      });
    }

    const token = jwt.sign(
      { id: user.ID, role: user.ROLE },
      process.env.JWT_SECRET || "supersecretjwtkey",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Signed in successfully",
      access_token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

authRouter.get("/get-user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretjwtkey");

    const querySql = `
      SELECT id, username, email, name, role, profile_pic 
      FROM users 
      WHERE id = :id
    `;
    const result = await db.execute(querySql, { id: decoded.id });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Unauthorized or token expired" });
    }

    const user = result.rows[0];

    res.status(200).json({
      id: user.ID,
      email: user.EMAIL,
      username: user.USERNAME,
      name: user.NAME,
      role: user.ROLE,
      profilePic: user.PROFILE_PIC,
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(401).json({ error: "Unauthorized or token expired" });
  }
});

authRouter.put("/reset-password", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { oldPassword, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretjwtkey");

    const querySql = `
      SELECT id, password 
      FROM users 
      WHERE id = :id
    `;
    const result = await db.execute(querySql, { id: decoded.id });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const user = result.rows[0];
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.PASSWORD);

    if (!isOldPasswordValid) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const updateSql = `
      UPDATE users 
      SET password = :password 
      WHERE id = :id
    `;
    await db.execute(updateSql, { password: hashedNewPassword, id: decoded.id });

    res.status(200).json({
      message: "Password updated successfully"
    });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default authRouter;
