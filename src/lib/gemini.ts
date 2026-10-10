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

const SYSTEM_PROMPT = `
You are the CivicLens AI vision analyst for municipal civic issues (e.g. potholes, broken streetlights, sewage overflows, garbage piles, electrical hazards).
Analyze the provided image and citizen description.

Respond with strict JSON ONLY using this schema:
{
  "issue_type": "pothole | garbage_accumulation | drainage_sewer | water_leakage | electrical_hazard | broken_streetlight | road_obstruction | other",
  "severity": "low | medium | high | critical | uncertain",
  "severity_reason": "Concise 1-2 sentence evidence-based reason derived strictly from visible visual cues in the image",
  "description_summary": "Concise summary of the civic defect observed",
  "suggested_keywords": ["keyword1", "keyword2", "keyword3"],
  "confidence": 0.0 to 1.0
}

Guidelines:
- Never claim official legal responsibility or property ownership.
- If the image does not show a recognizable civic defect or is too blurry/unclear, set severity to "uncertain" and issue_type to "other" or "unclear_civic_issue".
- Severity rating criteria:
  - "critical": immediate life/safety hazard (e.g. live hanging electrical wire, deep open manhole on high-speed road, major road collapse).
  - "high": major physical disruption (e.g. deep pothole >10cm, sewer flooding into street, large garbage blockage).
  - "medium": standard municipal defect needing repair within SLA (e.g. moderate road surface wear, overflowing dustbin).
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

    const candidateModels = [primaryModel, "gemini-3.8-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

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

        const validSeverities: CivicSeverity[] = ["low", "medium", "high", "critical", "uncertain"];
        const severity: CivicSeverity = validSeverities.includes(parsed.severity)
          ? parsed.severity
          : "medium";

        return {
          issue_type: parsed.issue_type || "other",
          severity,
          severity_reason: parsed.severity_reason || "Visual analysis completed.",
          description_summary: parsed.description_summary || citizenDescription || "Reported civic issue.",
          suggested_keywords: Array.isArray(parsed.suggested_keywords) ? parsed.suggested_keywords : [parsed.issue_type || "civic"],
          raw_confidence: typeof parsed.confidence === "number" ? parsed.confidence : undefined,
        };
      } catch (err) {
        // Try next model if model not found
        console.warn(`Model ${modelName} call notice: ${(err as Error).message}`);
      }
    }

    throw new Error("All candidate Gemini models failed to generate content.");
  } catch (error) {
    console.error("Gemini Vision API error:", (error as Error).message);
    // Fallback if model fails or image cannot be processed
    return {
      issue_type: "unclassified_civic_issue",
      severity: "uncertain",
      severity_reason: "AI vision processing encountered an error or image was unreadable; human inspection required.",
      description_summary: citizenDescription || "Civic report awaiting manual triage.",
      suggested_keywords: ["general", "review"],
    };
  }
}
