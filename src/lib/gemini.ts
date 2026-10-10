import { GoogleGenerativeAI } from "@google/generative-ai";
import { CivicSeverity } from "@/lib/types/api";

export interface VisionAnalysisResult {
  issue_type: string;
  severity: CivicSeverity;
  severity_reason: string;
  description_summary: string;
  suggested_keywords: string[];
  raw_confidence?: number;
}

const ALLOWED_ISSUE_TYPES = new Set([
  "pothole",
  "garbage_accumulation",
  "drainage_sewer",
  "water_leakage",
  "electrical_hazard",
  "broken_streetlight",
  "road_obstruction",
  "water_stagnation",
  "other",
]);

const VALID_SEVERITIES = new Set<CivicSeverity>(["low", "medium", "high", "critical", "uncertain"]);

const SYSTEM_PROMPT = `
You are the CivicLens AI vision analyst for municipal civic issues.
Analyze the provided image and citizen description.

Respond with strict JSON ONLY using this schema:
{
  "issue_type": "pothole | garbage_accumulation | drainage_sewer | water_leakage | electrical_hazard | broken_streetlight | road_obstruction | water_stagnation | other",
  "severity": "low | medium | high | critical | uncertain",
  "severity_reason": "Concise 1-2 sentence evidence-based reason derived strictly from visible visual cues in the image",
  "description_summary": "Concise summary of the civic defect observed",
  "suggested_keywords": ["keyword1", "keyword2"],
  "confidence": 0.0 to 1.0
}

Guidelines:
- Never claim official municipal dispatch authorization or legal property ownership.
- If the image does not show a recognizable municipal defect or is too blurry/unclear, set severity to "uncertain" and issue_type to "other".
- Severity rating criteria:
  - "critical": immediate life/safety hazard (e.g. live hanging electrical wire, deep open manhole on active road).
  - "high": major physical disruption (e.g. deep pothole, active sewer flooding, large road blockage).
  - "medium": standard municipal defect needing repair within normal SLA.
  - "low": minor cosmetic or non-obstructive issue.
  - "uncertain": insufficient visual evidence.
`;

export async function analyzeCivicImage(
  imageBuffer: Buffer,
  mimeType: string,
  citizenDescription?: string
): Promise<VisionAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable.");
  }

  try {
    const primaryModel = process.env.GEMINI_VISION_MODEL || "gemini-3.8-flash";
    const genAI = new GoogleGenerativeAI(apiKey);
    const candidateModels = [primaryModel, "gemini-3.8-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemma-4-26b-a4b-it"];

    const userPrompt = citizenDescription
      ? `Citizen Description: "${citizenDescription}". Please analyze the attached image.`
      : "Please analyze the attached civic issue image.";

    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: mimeType || "image/jpeg",
      },
    };

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: "application/json",
          },
        });

        const result = await model.generateContent([
          SYSTEM_PROMPT,
          imagePart,
          userPrompt,
        ]);

        const responseText = result.response.text();
        const parsed = JSON.parse(responseText);

        // Sanitize issue_type
        const rawIssueType = (parsed.issue_type || "").toString().toLowerCase().trim();
        const issue_type = ALLOWED_ISSUE_TYPES.has(rawIssueType) ? rawIssueType : "other";

        // Sanitize severity
        const rawSeverity = (parsed.severity || "").toString().toLowerCase().trim() as CivicSeverity;
        const severity: CivicSeverity = VALID_SEVERITIES.has(rawSeverity) ? rawSeverity : "uncertain";

        const confidence = typeof parsed.confidence === "number" && isFinite(parsed.confidence)
          ? Math.max(0, Math.min(1, parsed.confidence))
          : undefined;

        const reasonSuffix = " (AI recommendation; subject to field verification)";
        const rawReason = parsed.severity_reason || "Visual analysis completed.";
        const severity_reason = rawReason.endsWith(")") ? rawReason : `${rawReason}${reasonSuffix}`;

        return {
          issue_type,
          severity,
          severity_reason,
          description_summary: (parsed.description_summary || citizenDescription || "Reported civic issue.").slice(0, 500),
          suggested_keywords: Array.isArray(parsed.suggested_keywords)
            ? parsed.suggested_keywords.map((k: any) => String(k).slice(0, 40))
            : [issue_type],
          raw_confidence: confidence,
        };
      } catch (err) {
        // Try next candidate model
      }
    }

    throw new Error("All candidate Gemini models failed to generate valid content.");
  } catch (error) {
    console.error("Gemini Vision API notice:", (error as Error).message);
    return {
      issue_type: "other",
      severity: "uncertain",
      severity_reason: "AI vision processing unavailable or image unreadable; human inspection required.",
      description_summary: citizenDescription || "Civic report awaiting manual triage.",
      suggested_keywords: ["general", "review"],
    };
  }
}
