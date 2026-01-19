import supabase from "../utils/db.mjs";


const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {

    const { data: authData, error: authError } = await supabase.auth.getUser(
      token
    );

    if (authError || !authData.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }


    const supabaseUserId = authData.user.id;


    const { data: userRole, error: dbError } = await supabase
      .from("users")
      .select("role")
      .eq("id", supabaseUserId)
      .single();

    if (dbError || !userRole) {
      return res.status(404).json({ error: "User role not found" });
    }


    req.user = { ...authData.user, role: userRole.role };


    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not have admin access" });
    }


    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectAdmin;
