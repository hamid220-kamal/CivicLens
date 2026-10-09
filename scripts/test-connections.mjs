import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// 1. Parse .env.local
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

console.log("\n==========================================");
console.log("CivicLens — Service Connectivity Test");
console.log("==========================================\n");

// 2. Test Supabase
async function testSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.log("❌ Supabase: MISSING environment variables");
    return false;
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from("incidents").select("id").limit(1);
    if (error) {
      console.log(`⚠️ Supabase Query Notice: ${error.message}`);
      return false;
    }
    console.log("✅ Supabase: Connection & Query SUCCESSFUL (Tables & RLS ready)");
    return true;
  } catch (err) {
    console.log(`❌ Supabase Connection Failed: ${err.message}`);
    return false;
  }
}

// 3. Test Gemini API
async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;

  if (!apiKey) {
    console.log("❌ Gemini: MISSING environment variable (GEMINI_API_KEY)");
    return false;
  }

  // Test 1: Query models list to see what this key has access to
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (listRes.ok) {
      const listData = await listRes.json();
      const modelNames = (listData.models || []).map(m => m.name.replace("models/", ""));
      console.log(`✅ Google AI Studio API: Key is ACTIVE!`);
      console.log(`   Available models (${modelNames.length}): ${modelNames.slice(0, 5).join(", ")}...`);
      return true;
    } else {
      const errText = await listRes.text();
      console.log(`⚠️ Models List check failed (${listRes.status}): ${errText}`);
    }
  } catch (e) {
    console.log(`⚠️ Network error calling Gemini endpoint: ${e.message}`);
  }

  // Test 2: Try x-goog-api-key header
  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
      headers: { "x-goog-api-key": apiKey }
    });
    if (res.ok) {
      const listData = await res.json();
      console.log("✅ Google AI Studio API: Connection SUCCESSFUL (via header)");
      return true;
    } else {
      const errText = await res.text();
      console.log(`⚠️ Header check failed (${res.status}): ${errText}`);
    }
  } catch (e) {
    console.log(`⚠️ Network error: ${e.message}`);
  }

  return false;
}

async function runAll() {
  const sbOk = await testSupabase();
  const aiOk = await testGemini();
  console.log("\n------------------------------------------");
  if (sbOk && aiOk) {
    console.log("🎉 ALL CORE PREFLIGHT SERVICES READY FOR CIVICLENS MVP!");
  } else {
    console.log("ℹ️ Review the diagnostic details above.");
  }
  console.log("------------------------------------------\n");
}

runAll();
