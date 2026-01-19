import { createClient } from "@supabase/supabase-js";
import connectionPool from "../utils/db.mjs";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testConnections() {
  console.log("--- Testing Connections ---");

  // 1. Test Supabase API (Auth/REST)
  console.log("\n1. Testing Supabase API (via URL + Anon Key)...");
  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    // Note: 'users' table might not exist yet, so this might error, but if it's a 404 or permission error, it means we reached Supabase.
    // Better test: check health or just auth.
    const { error: authError } = await supabase.auth.getSession();
    
    if (authError) {
        console.error("❌ Supabase API Connection Failed:", authError.message);
    } else {
        console.log("✅ Supabase API Connection Successful (URL + Key are valid)");
    }
  } catch (err) {
    console.error("❌ Supabase API Error:", err.message);
  }

  // 2. Test PostgreSQL Database (via Connection String)
  console.log("\n2. Testing Direct Database Connection (via CONNECTION_STRING)...");
  if (!process.env.CONNECTION_STRING) {
      console.log("❌ CONNECTION_STRING is missing from .env file. Cannot connect to database directly.");
  } else {
      try {
        const client = await connectionPool.connect();
        console.log("✅ Database Connection Successful!");
        client.release();
      } catch (err) {
        console.error("❌ Database Connection Failed:", err.message);
      }
  }
  
  console.log("\n---------------------------");
  process.exit();
}

testConnections();
