import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import createJiti from "jiti";

// 1. Load .env.local safely without printing secrets
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

// 2. Initialize jiti to import actual production TypeScript modules directly
const jiti = createJiti(process.cwd(), {
  alias: {
    "^@/(.*)$": resolve(process.cwd(), "src/$1"),
    "@/": resolve(process.cwd(), "src") + "/",
  },
});

const { retrieveCivicGuidance } = jiti("./src/lib/rag.ts");
const { calculateDistanceMeters, findDuplicateCandidates } = jiti("./src/lib/duplicateMatcher.ts");

console.log("\n==================================================================");
console.log("CivicLens Backend & Grounded Intelligence Test Suite");
console.log("==================================================================\n");

async function runBackendTests() {
  let passedUnit = 0;
  let totalUnit = 8;
  let failedUnit = 0;

  console.log("--- PART 1: Deterministic Production Unit Tests ---\n");

  // Test 1: Production RAG - Pothole query (GHMC 15 days / 360h SLA)
  try {
    const res = await retrieveCivicGuidance("deep pothole in asphalt road", "pothole");
    if (
      res.evidence.length > 0 &&
      res.evidence[0].source_title.includes("GHMC Citizen Charter") &&
      res.evidence[0].source_url === "https://ghmc.gov.in/CitizenCharter/CitizenCharter-19.06.pdf" &&
      res.recommendedDepartment?.name.includes("GHMC Engineering Wing (Roads)") &&
      res.recommendedDepartment?.sla_hours === 360
    ) {
      console.log("✅ Test 1 Passed: Production RAG grounded in verified GHMC PDF Item 1 (15 days / 360h SLA).");
      passedUnit++;
    } else {
      console.error("❌ Test 1 Failed: Pothole retrieval mismatch:", res);
      failedUnit++;
    }
  } catch (err) {
    console.error("❌ Test 1 Failed with exception:", err.message);
    failedUnit++;
  }

  // Test 2: Production RAG - Water stagnation (GHMC 48h SLA)
  try {
    const res = await retrieveCivicGuidance("water stagnation accumulation on road puddle", "water_stagnation");
    if (
      res.evidence.length > 0 &&
      res.evidence[0].source_title.includes("Water Stagnation") &&
      res.recommendedDepartment?.sla_hours === 48
    ) {
      console.log("✅ Test 2 Passed: Water stagnation correctly matched 48h SLA under GHMC charter.");
      passedUnit++;
    } else {
      console.error("❌ Test 2 Failed: Water stagnation SLA mismatch:", res);
      failedUnit++;
    }
  } catch (err) {
    console.error("❌ Test 2 Failed with exception:", err.message);
    failedUnit++;
  }

  // Test 3: Production RAG - Sanitation & Waste (GHMC 48h SLA)
  try {
    const res = await retrieveCivicGuidance("overflowing dumper bin and dead animal on road", "garbage_accumulation");
    if (
      res.evidence.length > 0 &&
      res.evidence[0].source_title.includes("Health & Sanitation Services") &&
      res.recommendedDepartment?.sla_hours === 48
    ) {
      console.log("✅ Test 3 Passed: Health & Sanitation matched verified 48h SLA under GHMC charter.");
      passedUnit++;
    } else {
      console.error("❌ Test 3 Failed: Sanitation SLA mismatch:", res);
      failedUnit++;
    }
  } catch (err) {
    console.error("❌ Test 3 Failed with exception:", err.message);
    failedUnit++;
  }

  // Test 4: Regression Check - Traffic Police omits unverified statutory SLA
  try {
    const res = await retrieveCivicGuidance("traffic light signal timer failure", "broken_streetlight");
    if (
      res.evidence.length > 0 &&
      res.recommendedDepartment?.name.includes("Traffic Police") &&
      res.recommendedDepartment?.sla_hours === undefined
    ) {
      console.log("✅ Test 4 Passed: Traffic Police guideline correctly omits unverified SLA (sla_hours: undefined).");
      passedUnit++;
    } else {
      console.error("❌ Test 4 Failed: Fabricated statutory SLA detected on Traffic Police:", res);
      failedUnit++;
    }
  } catch (err) {
    console.error("❌ Test 4 Failed with exception:", err.message);
    failedUnit++;
  }

  // Test 5: Regression Check - HMWSSB & TGSPDCL advisory guidelines omit statutory SLA
  try {
    const sewerRes = await retrieveCivicGuidance("sewage overflow contaminated water from manhole", "drainage_sewer");
    const elecRes = await retrieveCivicGuidance("live electric wire hanging low from pole sparking", "electrical_hazard");
    if (
      sewerRes.evidence.length > 0 &&
      sewerRes.recommendedDepartment?.sla_hours === undefined &&
      elecRes.evidence.length > 0 &&
      elecRes.recommendedDepartment?.sla_hours === undefined
    ) {
      console.log("✅ Test 5 Passed: Advisory guidelines (HMWSSB, TGSPDCL) correctly omit statutory fixed-hour commitments.");
      passedUnit++;
    } else {
      console.error("❌ Test 5 Failed: Advisory sources incorrectly returned statutory promises:", { sewerRes, elecRes });
      failedUnit++;
    }
  } catch (err) {
    console.error("❌ Test 5 Failed with exception:", err.message);
    failedUnit++;
  }

  // Test 6: Non-Hallucination on Irrelevant Query
  try {
    const res = await retrieveCivicGuidance("alien spaceship landed in backyard near bench", "other");
    if (res.evidence.length === 0 && res.recommendedDepartment?.name === "unknown") {
      console.log("✅ Test 6 Passed: Irrelevant query returned empty evidence [] and department 'unknown' without hallucinating.");
      passedUnit++;
    } else {
      console.error("❌ Test 6 Failed: Hallucinated evidence for out-of-scope query:", res);
      failedUnit++;
    }
  } catch (err) {
    console.error("❌ Test 6 Failed with exception:", err.message);
    failedUnit++;
  }

  // Test 7: Haversine Spatial Distance Math
  try {
    const distValid = calculateDistanceMeters(17.3616, 78.4747, 17.3620, 78.4752);
    const distFar = calculateDistanceMeters(17.3616, 78.4747, 17.4500, 78.5500);
    if (distValid === 69 && distFar > 10000) {
      console.log(`✅ Test 7 Passed: Proximity distance calculated correctly (${distValid}m nearby, ${distFar}m far).`);
      passedUnit++;
    } else {
      console.error("❌ Test 7 Failed: Unexpected distance calculations:", { distValid, distFar });
      failedUnit++;
    }
  } catch (err) {
    console.error("❌ Test 7 Failed with exception:", err.message);
    failedUnit++;
  }

  // Test 8: Coordinate Boundary & Rejection Checks
  try {
    const invalidDist1 = calculateDistanceMeters(95.0, 78.0, 17.0, 78.0); // Lat > 90
    const invalidDist2 = calculateDistanceMeters(NaN, 78.0, 17.0, 78.0);
    const emptyCandidates = await findDuplicateCandidates("pothole", 95.0, 78.0); // Out of bounds
    if (invalidDist1 === Infinity && invalidDist2 === Infinity && emptyCandidates.length === 0) {
      console.log("✅ Test 8 Passed: Out-of-bounds coordinates safely rejected by spatial matcher.");
      passedUnit++;
    } else {
      console.error("❌ Test 8 Failed: Out-of-bounds coordinates were not safely rejected:", { invalidDist1, invalidDist2, emptyCandidates });
      failedUnit++;
    }
  } catch (err) {
    console.error("❌ Test 8 Failed with exception:", err.message);
    failedUnit++;
  }

  console.log(`\nUnit Tests Result: ${passedUnit}/${totalUnit} Passed (${failedUnit} Failed)\n`);

  // --- PART 2: Optional Live Integration Tests ---
  const runLive = process.argv.includes("--live") || process.env.RUN_LIVE_TESTS === "true";

  if (runLive) {
    console.log("--- PART 2: Live External Services Verification ---\n");
    let livePassed = 0;
    let liveTotal = 2;

    // Live Test 1: Gemini API Connectivity
    const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;
    if (!apiKey) {
      console.error("❌ Live Test 1 Failed: Missing GEMINI_API_KEY in environment.");
      process.exit(1);
    } else {
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemma-4-26b-a4b-it" });
        const res = await model.generateContent("Respond with: OK");
        const text = res.response.text().trim();
        if (text) {
          console.log(`✅ Live Test 1 Passed: Google AI Studio API verified active.`);
          livePassed++;
        } else {
          console.error("❌ Live Test 1 Failed: Empty response from model.");
          process.exit(1);
        }
      } catch (err) {
        console.error("❌ Live Test 1 Failed with error:", err.message);
        process.exit(1);
      }
    }

    // Live Test 2: Supabase Connectivity
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!sbUrl || !sbKey) {
      console.error("❌ Live Test 2 Failed: Missing Supabase credentials in environment.");
      process.exit(1);
    } else {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const sb = createClient(sbUrl, sbKey);
        const { count, error } = await sb.from("reports").select("*", { count: "exact", head: true });
        if (!error) {
          console.log(`✅ Live Test 2 Passed: Supabase reports table reachable (record count: ${count ?? 0}).`);
          livePassed++;
        } else {
          console.error("❌ Live Test 2 Failed:", error.message);
          process.exit(1);
        }
      } catch (err) {
        console.error("❌ Live Test 2 Failed with error:", err.message);
        process.exit(1);
      }
    }

    console.log(`\nLive Tests Result: ${livePassed}/${liveTotal} Passed\n`);
  } else {
    console.log("ℹ️ Live integration tests skipped (pass --live to execute live Gemini & Supabase checks).\n");
  }

  if (failedUnit > 0) {
    console.error("❌ Test run failed: one or more unit tests failed.");
    process.exit(1);
  } else {
    console.log("🎉 All unit tests passed cleanly with zero failures.\n");
    process.exit(0);
  }
}

runBackendTests().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
