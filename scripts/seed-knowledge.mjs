import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// 1. Load .env.local
const envPath = resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...values] = trimmed.split("=");
    if (key && values.length) {
      process.env[key.trim()] = values.join("=").trim();
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error("❌ Error: Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function seedKnowledge() {
  console.log("\n==========================================");
  console.log("CivicLens — Municipal Knowledge Base Seeder");
  console.log("==========================================\n");

  const seedsPath = resolve(process.cwd(), "knowledge-base", "civic_knowledge_seeds.json");
  if (!existsSync(seedsPath)) {
    console.error("❌ Seeds file not found at:", seedsPath);
    process.exit(1);
  }

  const rawSeeds = JSON.parse(readFileSync(seedsPath, "utf-8"));
  console.log(`Found ${rawSeeds.length} authentic Hyderabad civic standards to seed.\n`);

  // Clean obsolete unverified or legacy seed records
  const validTitles = rawSeeds.map((s) => s.source_title);
  const { error: cleanErr } = await supabase
    .from("knowledge_chunks")
    .delete()
    .not("source_title", "in", `(${validTitles.map((t) => `"${t}"`).join(",")})`);

  if (!cleanErr) {
    console.log("🧹 Cleaned obsolete legacy records from knowledge_chunks.");
  }

  for (const item of rawSeeds) {
    // Delete existing duplicate rows with the same title to ensure exactly 1 row per standard
    await supabase.from("knowledge_chunks").delete().eq("source_title", item.source_title);

    const { error: insertErr } = await supabase.from("knowledge_chunks").insert({
      source_title: item.source_title,
      source_publisher: item.source_publisher,
      source_url: item.source_url,
      category: item.category,
      department: item.department,
      sla_hours: item.sla_hours,
      keywords: item.keywords,
      content: item.content,
      metadata: {
        verification_status: item.verification_status || "verified_official_charter",
        retrieval_date: item.retrieval_date || "2026-10-10",
      },
    });

    if (insertErr) {
      console.warn(`⚠️ Notice for "${item.source_title}": ${insertErr.message}`);
    } else {
      console.log(`✅ Seeded [${item.verification_status}]: ${item.source_title} -> ${item.department}`);
    }
  }

  console.log("\n🎉 Municipal Knowledge Base Seeding Complete!\n");
}

seedKnowledge().catch((err) => {
  console.error("Seeding failed:", err.message);
});
