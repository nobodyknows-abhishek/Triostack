import fs from "fs";
import path from "path";

// Read .env file manually to avoid dotenv dependency
const envFile = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf-8");
const envConfig = envFile.split("\n").reduce((acc, line) => {
  const [key, ...value] = line.split("=");
  if (key && value) {
    acc[key.trim()] = value.join("=").trim().replace(/"/g, "");
  }
  return acc;
}, {});

const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseAnonKey = envConfig.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

async function testFetch() {
  console.log("Fetching projects via REST...");
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/projects?select=*`, {
      method: "GET",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    if (!res.ok) {
      console.error("Fetch failed", res.status, await res.text());
      return;
    }

    const data = await res.json();
    fs.writeFileSync(
      "output-utf8.json",
      JSON.stringify(data, null, 2),
      "utf-8",
    );
    console.log("Done writing");
  } catch (e) {
    console.error(e);
  }
}

testFetch();
