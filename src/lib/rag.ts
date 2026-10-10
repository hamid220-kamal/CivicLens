import { CivicEvidence } from "@/lib/types/api";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import seedData from "../../knowledge-base/civic_knowledge_seeds.json";

export interface KnowledgeSeedItem {
  source_title: string;
  source_publisher: string;
  source_url: string;
  verification_status?: string;
  retrieval_date?: string;
  category: string;
  department: string;
  sla_hours?: number;
  keywords: string[];
  content: string;
}

const STOP_WORDS = new Set([
  "the", "and", "a", "an", "in", "on", "at", "to", "for", "of", "with", "is", "are", "was",
  "were", "this", "that", "these", "those", "near", "from", "have", "has", "had", "been",
  "there", "here", "some", "any", "please", "help", "view", "seen", "very", "much", "road",
  "street", "area", "lane", "place", "city", "hyderabad", "issue", "problem", "defect"
]);

function tokenizeQuery(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

interface ScoredChunk {
  chunk: KnowledgeSeedItem;
  score: number;
}

function scoreKnowledgeChunk(chunk: KnowledgeSeedItem, queryTokens: string[], normalizedQuery: string, detectedCategory?: string): number {
  let score = 0;

  // 1. Direct Category Match (+5.0)
  if (detectedCategory && chunk.category.toLowerCase().includes(detectedCategory.toLowerCase())) {
    score += 5.0;
  } else if (detectedCategory && detectedCategory.toLowerCase().includes(chunk.category.toLowerCase())) {
    score += 5.0;
  }

  // 2. Specific Domain Keyword Matches (+3.0 per matching keyword)
  const keywords = chunk.keywords || [];
  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    if (normalizedQuery.includes(kwLower)) {
      score += 3.5;
    } else {
      // Check if keyword tokens match query tokens
      const kwTokens = kwLower.split(/\s+/);
      const allTokensMatch = kwTokens.every((t) => queryTokens.includes(t));
      if (allTokensMatch && kwTokens.length > 0) {
        score += 3.0;
      }
    }
  }

  // 3. Meaningful token overlap in content (+0.3 per distinct token)
  const contentLower = chunk.content.toLowerCase();
  for (const token of queryTokens) {
    if (contentLower.includes(token)) {
      score += 0.3;
    }
  }

  return score;
}

/**
 * Retrieve authentic municipal guidance relevant to a given issue category or description text.
 * Strictly returns genuine citations from verified Hyderabad civic authorities.
 * Enforces a minimum relevance score (threshold = 3.0) to prevent false-positive matches.
 */
export async function retrieveCivicGuidance(
  queryText: string,
  detectedCategory?: string
): Promise<{
  evidence: CivicEvidence[];
  recommendedDepartment?: { name: string; reason: string; sla_hours?: number };
}> {
  const normalizedQuery = (queryText + " " + (detectedCategory || "")).toLowerCase();
  const queryTokens = tokenizeQuery(normalizedQuery);

  let candidateChunks: KnowledgeSeedItem[] = [];

  // 1. Try querying Supabase knowledge_chunks table
  try {
    const supabase = getSupabaseServerClient();
    const { data: chunks, error } = await supabase
      .from("knowledge_chunks")
      .select("source_title, source_publisher, source_url, content, department, sla_hours, category, keywords");

    if (!error && chunks && chunks.length > 0) {
      candidateChunks = chunks as KnowledgeSeedItem[];
    }
  } catch (err) {
    console.warn("Notice: Querying knowledge_chunks database table encountered:", (err as Error).message);
  }

  // 2. Fallback to local verified seed documents if Supabase table is empty or unavailable
  if (candidateChunks.length === 0) {
    candidateChunks = seedData as KnowledgeSeedItem[];
  }

  // 3. Score and rank all candidate chunks
  const scoredChunks: ScoredChunk[] = candidateChunks.map((chunk) => ({
    chunk,
    score: scoreKnowledgeChunk(chunk, queryTokens, normalizedQuery, detectedCategory),
  }));

  // Sort descending by relevance score
  scoredChunks.sort((a, b) => b.score - a.score);

  const RELEVANCE_THRESHOLD = 3.0;
  const topMatch = scoredChunks[0];

  // 4. If top match does NOT meet relevance threshold, return empty evidence and unknown department
  if (!topMatch || topMatch.score < RELEVANCE_THRESHOLD) {
    return {
      evidence: [],
      recommendedDepartment: {
        name: "unknown",
        reason: "No authenticated municipal charter standard matched this issue description. Human review required.",
      },
    };
  }

  // 5. Build bounded evidence list (top 1-2 chunks above threshold)
  const validMatches = scoredChunks.filter((sc) => sc.score >= RELEVANCE_THRESHOLD).slice(0, 2);

  const evidence: CivicEvidence[] = validMatches.map((m) => ({
    source_title: m.chunk.source_title,
    publisher: m.chunk.source_publisher,
    source_url: m.chunk.source_url,
    excerpt: m.chunk.content,
  }));

  const bestChunk = topMatch.chunk;

  return {
    evidence,
    recommendedDepartment: {
      name: bestChunk.department || "unknown",
      reason: `Recommended based on ${bestChunk.source_title} (${bestChunk.source_publisher})`,
      sla_hours: bestChunk.sla_hours,
    },
  };
}
