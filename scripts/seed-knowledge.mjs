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

  for (const item of rawSeeds) {
    const { data, error } = await supabase.from("knowledge_chunks").upsert(
      {
        source_title: item.source_title,
        source_publisher: item.source_publisher,
        source_url: item.source_url,
        category: item.category,
        department: item.department,
        sla_hours: item.sla_hours,
        keywords: item.keywords,
        content: item.content,
      },
      { onConflict: "source_title" }
    );

    if (error) {
      // If table doesn't have unique constraint on source_title, do insert
      const { error: insertErr } = await supabase.from("knowledge_chunks").insert({
        source_title: item.source_title,
        source_publisher: item.source_publisher,
        source_url: item.source_url,
        category: item.category,
        department: item.department,
        sla_hours: item.sla_hours,
        keywords: item.keywords,
        content: item.content,
      });

      if (insertErr && !insertErr.message.includes("duplicate")) {
        console.warn(`⚠️ Notice for "${item.source_title}": ${insertErr.message}`);
      } else {
        console.log(`✅ Seeded: ${item.source_title} (${item.department})`);
      }
    } else {
      console.log(`✅ Seeded: ${item.source_title} (${item.department})`);
    }
  }

  console.log("\n🎉 Municipal Knowledge Base Seeding Complete!\n");
}

seedKnowledge().catch((err) => {
  console.error("Seeding failed:", err.message);
});
