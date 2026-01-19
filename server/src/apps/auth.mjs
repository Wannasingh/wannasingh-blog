import { Router } from "express";
import supabase from "../utils/db.mjs";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, username, name } = req.body;

  try {

    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (checkError) {
      console.error("Error checking username:", checkError);
      return res.status(500).json({ error: "Database error checking username" });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "This username is already taken" });
    }

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });


    if (supabaseError) {
      if (supabaseError.code === "user_already_exists") {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      return res
        .status(400)
        .json({ error: "Failed to create user. Please try again." });
    }
    const supabaseUserId = data.user.id;


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: supabaseUserId,
          username,
          name,
          password: hashedPassword,
          role: "user",
        },
      ])
      .select();

    if (insertError) {
      console.error("Error creating user profile:", insertError);
      return res
        .status(500)
        .json({ error: "Failed to create user profile in database" });
    }

    res.status(201).json({
      message: "User created successfully",
      user: newUser[0],
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {

      if (
        error.code === "invalid_credentials" ||
        error.message.includes("Invalid login credentials")
      ) {
        return res.status(400).json({
          error: "Your password is incorrect or this email doesn’t exist",
        });
      }
      return res.status(400).json({ error: error.message });
    }
    console.log(data);
    return res.status(200).json({
      message: "Signed in successfully",
      access_token: data.session.access_token,
    });
  } catch {
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

authRouter.get("/get-user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {

    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      return res.status(401).json({ error: "Unauthorized or token expired" });
    }

    const supabaseUserId = data.user.id;
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", supabaseUserId)
      .single();

    if (profileError) {
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }

    res.status(200).json({
      id: data.user.id,
      email: data.user.email,
      username: userProfile.username,
      name: userProfile.name,
      role: userProfile.role,
      profilePic: userProfile.profile_pic,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
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

    const { data: userData, error: userError } = await supabase.auth.getUser(
      token
    );

    if (userError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: userData.user.email,
        password: oldPassword,
      });

    if (loginError) {
      return res.status(400).json({ error: "Invalid old password" });
    }


    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Password updated successfully",
      user: data.user,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default authRouter;
