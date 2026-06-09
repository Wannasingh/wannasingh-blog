import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *, 
      categories!inner(name), 
      statuses!inner(status),
      users!posts_user_id_fkey(id, name, profile_pic)
    `);
  console.log("Data length:", data?.length);
  console.log("Error:", error);
}

test();
