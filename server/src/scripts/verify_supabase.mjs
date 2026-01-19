import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log("--- Supabase Debug Script ---");
console.log("URL:", supabaseUrl);
console.log("Key:", supabaseKey ? supabaseKey.slice(0, 10) + "..." : "MISSING");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Environment Variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  // Test 1: Database (PostgREST)
  console.log("\n1. Testing Database Connection...");
  const { data: dbData, error: dbError } = await supabase
    .from("users")
    .select("count", { count: "exact", head: true });

  if (dbError) {
    console.error("❌ Database Error:", dbError.message, dbError.code, dbError.hint);
  } else {
    console.log("✅ Database Connection OK (Status: Connected)");
  }

  // Test 2: Auth
  console.log("\n2. Testing Auth Configuration...");
  // Attempt to sign up a fake user that definitely has a valid format
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: `test_${Date.now()}@example.com`,
    password: "testpassword123",
  });

  if (authError) {
    console.error("❌ Auth Error:", authError.message, authError.code);
  } else {
    console.log("✅ Auth Connection OK. Created test user:", authData.user?.email);
    // Cleanup: Delete the test user (if possible with anon key? usually not, but that's fine)
  }
}

test();
