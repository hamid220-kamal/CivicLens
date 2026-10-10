import { CivicEvidence } from "@/lib/types/api";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import seedData from "../../knowledge-base/civic_knowledge_seeds.json";

export interface KnowledgeSeedItem {
  source_title: string;
  source_publisher: string;
  source_url: string;
  category: string;
  department: string;
  sla_hours: number;
  keywords: string[];
  content: string;
}

/**
 * Retrieve authentic municipal guidance relevant to a given issue category or description text.
 * Strictly returns genuine citations from verified Hyderabad civic authorities.
 */
export async function retrieveCivicGuidance(
  queryText: string,
  detectedCategory?: string
): Promise<{
  evidence: CivicEvidence[];
  recommendedDepartment?: { name: string; reason: string; sla_hours?: number };
}> {
  const normalizedQuery = (queryText + " " + (detectedCategory || "")).toLowerCase();
  
  // 1. Try querying Supabase knowledge_chunks table
  try {
    const supabase = getSupabaseServerClient();
    const { data: chunks, error } = await supabase
      .from("knowledge_chunks")
      .select("id, source_title, source_publisher, source_url, content, department, sla_hours, category, keywords")
      .limit(10);

    if (!error && chunks && chunks.length > 0) {
      // Find matching chunk by category or keyword
      for (const chunk of chunks) {
        const keywords: string[] = chunk.keywords || [];
        const isMatch =
          (chunk.category && normalizedQuery.includes(chunk.category.toLowerCase())) ||
          keywords.some((k: string) => normalizedQuery.includes(k.toLowerCase())) ||
          (chunk.content && normalizedQuery.split(" ").some((w: string) => w.length > 3 && chunk.content.toLowerCase().includes(w)));

        if (isMatch) {
          const evidence: CivicEvidence[] = [
            {
              source_title: chunk.source_title,
              publisher: chunk.source_publisher,
              source_url: chunk.source_url,
              excerpt: chunk.content,
            },
          ];

          return {
            evidence,
            recommendedDepartment: chunk.department
              ? {
                  name: chunk.department,
                  reason: `Recommended based on ${chunk.source_title} (${chunk.source_publisher})`,
                  sla_hours: chunk.sla_hours,
                }
              : undefined,
          };
        }
      }
    }
  } catch (err) {
    console.warn("Notice: Querying knowledge_chunks database table encountered:", (err as Error).message);
  }

  // 2. Fallback to local verified seeds in knowledge-base/civic_knowledge_seeds.json
  const seeds = seedData as KnowledgeSeedItem[];
  for (const item of seeds) {
    const isMatch =
      normalizedQuery.includes(item.category.toLowerCase()) ||
      item.keywords.some((k) => normalizedQuery.includes(k.toLowerCase())) ||
      (detectedCategory && item.keywords.some((k) => detectedCategory.toLowerCase().includes(k)));

    if (isMatch) {
      return {
        evidence: [
          {
            source_title: item.source_title,
            publisher: item.source_publisher,
            source_url: item.source_url,
            excerpt: item.content,
          },
        ],
        recommendedDepartment: {
          name: item.department,
          reason: `Recommended based on ${item.source_title} (${item.source_publisher})`,
          sla_hours: item.sla_hours,
        },
      };
    }
  }

  // 3. If no verified municipal source matched, return empty evidence (no hallucinations)
  return {
    evidence: [],
    recommendedDepartment: {
      name: "unknown",
      reason: "Official municipal responsibility has not been verified for this specific issue type.",
    },
  };
}
