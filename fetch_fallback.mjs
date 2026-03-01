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

async function fetchTable(table) {
  console.log(`Fetching ${table} via REST...`);
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/${table}?select=*`, {
      method: "GET",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    if (!res.ok) {
      console.error(`Fetch failed for ${table}`, res.status, await res.text());
      return [];
    }

    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function generateFallback() {
  const projects = await fetchTable("projects");
  const team = await fetchTable("team");
  const testimonials = await fetchTable("testimonials");

  const fallbackData = {
    projects,
    team,
    testimonials,
  };

  const dir = path.resolve(process.cwd(), "src/data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.resolve(dir, "fallbackData.json"),
    JSON.stringify(fallbackData, null, 2),
    "utf-8",
  );
  console.log("Fallback data written to src/data/fallbackData.json");
}

generateFallback();
