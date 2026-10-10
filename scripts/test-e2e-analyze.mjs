import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// 1. Load environment variables safely
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

// 2. Target server configuration
const targetServerUrl = process.env.TEST_SERVER_URL || "http://localhost:3000";
const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Valid 1x1 Red PNG bytes (Base64)
const TEST_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

console.log("\n==================================================================");
console.log("CivicLens Real HTTP End-to-End Test (/api/analyze-report)");
console.log(`Target Server: ${targetServerUrl}`);
console.log("==================================================================\n");

async function runRealHttpE2ETest() {
  // Check required environment configuration
  if (!sbUrl || !sbKey) {
    console.error("❌ E2E Pre-flight Failure: Missing Supabase environment configuration.");
    process.exit(1);
  }

  // Pre-flight check: Is the test server running?
  let isServerRunning = false;
  try {
    const pingRes = await fetch(`${targetServerUrl}/api/reports?limit=1`, {
      signal: AbortSignal.timeout(3000),
    });
    if (pingRes.status < 500) {
      isServerRunning = true;
    }
  } catch (err) {
    isServerRunning = false;
  }

  if (!isServerRunning) {
    console.error(`❌ E2E Test Execution Halted: Target server is not running at ${targetServerUrl}.`);
    console.error("   To execute the real HTTP E2E test, launch the local dev server first:");
    console.error("   Command: npm run dev\n");
    console.error("   Honest Test Status: E2E HTTP pipeline test cannot pass without a live server listening.");
    process.exit(1);
  }

  console.log("✅ Pre-flight: Target HTTP server is responsive.\n");

  const supabase = createClient(sbUrl, sbKey);
  let createdReportId = null;
  let createdStoragePath = null;
  let testPassed = false;

  try {
    // 1. Prepare genuine multipart/form-data upload
    console.log("Step 1: Dispatching real HTTP POST to /api/analyze-report with test image...");
    const imageBuffer = Buffer.from(TEST_PNG_BASE64, "base64");
    const formData = new FormData();
    const blob = new Blob([imageBuffer], { type: "image/png" });
    formData.append("image", blob, "test_pothole_fixture.png");
    formData.append("latitude", "17.3616");
    formData.append("longitude", "78.4747");
    formData.append("description", "Pothole crater on municipal road asphalt surface");

    const startTime = Date.now();
    const httpRes = await fetch(`${targetServerUrl}/api/analyze-report`, {
      method: "POST",
      body: formData,
    });
    const durationMs = Date.now() - startTime;

    console.log(`HTTP Response Status: ${httpRes.status} (in ${durationMs}ms)`);

    if (!httpRes.ok) {
      const errBody = await httpRes.text();
      throw new Error(`HTTP endpoint returned error status ${httpRes.status}: ${errBody}`);
    }

    const json = await httpRes.json();

    // 2. Validate API contract and response shape
    console.log("\nStep 2: Validating response contract (AnalyzeReportResponse)...");
    if (!json.success || !json.report) {
      throw new Error(`Endpoint did not return success: true. Body: ${JSON.stringify(json)}`);
    }

    const report = json.report;
    createdReportId = report.id;

    if (!createdReportId || typeof createdReportId !== "string") {
      throw new Error("Missing or invalid 'id' in returned CivicReport.");
    }

    console.log(`✅ Returned valid report ID: ${createdReportId}`);

    // Check classification
    if (!report.issue_type || typeof report.issue_type !== "string") {
      throw new Error("Missing or invalid 'issue_type'.");
    }

    // Check grounded department & SLA
    const dept = report.department_recommendation;
    if (!dept || !dept.name) {
      throw new Error("Missing 'department_recommendation'.");
    }
    console.log(`✅ Recommended Department: "${dept.name}"`);

    // Check evidence grounding
    if (!Array.isArray(report.evidence) || report.evidence.length === 0) {
      throw new Error("Report does not contain grounded municipal evidence citations.");
    }
    const primaryEvidence = report.evidence[0];
    if (!primaryEvidence.source_title || !primaryEvidence.source_url) {
      throw new Error("Evidence citation is missing authentic source metadata.");
    }
    console.log(`✅ Grounded Citation: "${primaryEvidence.source_title}" (${primaryEvidence.source_url})`);

    // Check storage image URL
    if (!report.image_url || typeof report.image_url !== "string") {
      throw new Error("Missing 'image_url' in report response.");
    }
    console.log(`✅ Uploaded Image URL: ${report.image_url}`);

    // Extract storage filename from URL
    try {
      const parsedUrl = new URL(report.image_url);
      const parts = parsedUrl.pathname.split("/civic-reports/");
      if (parts.length > 1) {
        createdStoragePath = parts[1];
      }
    } catch {}

    // 3. Verify actual persistence in Supabase
    console.log("\nStep 3: Verifying database persistence in Supabase...");
    const { data: dbRow, error: dbErr } = await supabase
      .from("reports")
      .select("id, issue_type, department, status, image_url")
      .eq("id", createdReportId)
      .single();

    if (dbErr || !dbRow) {
      throw new Error(`Persisted record was not found in database: ${dbErr?.message}`);
    }
    console.log(`✅ Confirmed record exists in Supabase 'reports' table with ID: ${dbRow.id}`);

    testPassed = true;
    console.log("\n==================================================================");
    console.log("🎉 ALL REAL HTTP E2E PIPELINE ASSERTIONS PASSED!");
    console.log("==================================================================\n");
  } catch (err) {
    console.error(`\n❌ E2E TEST FAILED: ${err.message}\n`);
    testPassed = false;
  } finally {
    // 4. Guaranteed Cleanup of test artifacts
    console.log("--- Cleanup: Removing test artifacts from database and storage ---");

    if (createdReportId) {
      const { error: delErr } = await supabase.from("reports").delete().eq("id", createdReportId);
      if (delErr) {
        console.warn(`⚠️ Warning: Failed to clean up test report ${createdReportId}: ${delErr.message}`);
      } else {
        console.log(`🧹 Cleaned up database test report: ${createdReportId}`);
      }
    }

    if (createdStoragePath) {
      const { error: storageDelErr } = await supabase.storage.from("civic-reports").remove([createdStoragePath]);
      if (storageDelErr) {
        console.warn(`⚠️ Warning: Failed to clean up storage object ${createdStoragePath}: ${storageDelErr.message}`);
      } else {
        console.log(`🧹 Cleaned up storage test object: ${createdStoragePath}`);
      }
    }

    if (!testPassed) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
}

runRealHttpE2ETest().catch((err) => {
  console.error("Unhandled error in E2E runner:", err.message);
  process.exit(1);
});
