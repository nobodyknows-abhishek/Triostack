import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFetch() {
  console.log("Fetching projects...");
  const { data, error } = await supabase.from("projects").select("*");
  console.log("Data:", data);
  console.log("Error:", error);
}

testFetch();
