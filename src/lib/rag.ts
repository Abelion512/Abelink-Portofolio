import { supabase } from "./supabase";
import {
  PortfolioDoc,
  PORTFOLIO_DOCS_STATIC,
  detectSecurityThreat,
  RAGResult,
} from "./rag-core";

export type { PortfolioDoc, RAGResult };
export { PORTFOLIO_DOCS_STATIC, detectSecurityThreat };

// Re-exporting other core items for convenience if needed
export {
  BLOCKED_TOPICS,
  PII_PATTERNS,
  getTieredResponse,
  formatResponse,
} from "./rag-core";

// Cache for performance (5 minutes)
let cachedDocs: PortfolioDoc[] = [];
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fetch knowledge docs from Supabase (with caching)
export async function getKnowledgeDocs(): Promise<PortfolioDoc[]> {
  const now = Date.now();

  // Return cache if still valid
  if (cachedDocs.length > 0 && now - lastFetch < CACHE_DURATION) {
    return cachedDocs;
  }

  try {
    const { data, error } = await supabase
      .from("knowledge_docs")
      .select("doc_id, content, security_level")
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching knowledge docs:", error);
      return PORTFOLIO_DOCS_STATIC; // Fallback to static
    }

    // Convert to PortfolioDoc format
    cachedDocs = data.map((doc) => ({
      id: doc.doc_id,
      content: doc.content,
      securityLevel: doc.security_level as "public" | "sensitive" | "private",
    }));

    lastFetch = now;
    return cachedDocs;
  } catch (error) {
    console.error("Error fetching knowledge docs:", error);
    return PORTFOLIO_DOCS_STATIC; // Fallback to static
  }
}

// Cache for live context (30 seconds - shorter since it represents "realtime" status)
let cachedLiveContext = "";
let lastLiveFetch = 0;
const LIVE_CONTEXT_CACHE_DURATION = 30 * 1000; // 30 seconds

// Retrieve relevant context from Supabase realtime data
export async function getLiveContext(): Promise<string> {
  const now = Date.now();

  // Return cache if still valid
  if (cachedLiveContext && now - lastLiveFetch < LIVE_CONTEXT_CACHE_DURATION) {
    return cachedLiveContext;
  }

  try {
    // SECURITY: Only fetch public settings
    const { data } = await supabase
      .from("settings")
      .select("currently_learning, currently_building")
      .eq("id", 1)
      .single();

    if (!data) {
      cachedLiveContext = "";
      lastLiveFetch = now;
      return "";
    }

    cachedLiveContext = `LIVE STATUS (as of now):
- Currently building: ${data.currently_building ?? "Not specified"}
- Currently learning: ${data.currently_learning ?? "Not specified"}`;
    lastLiveFetch = now;
    return cachedLiveContext;
  } catch {
    return cachedLiveContext || "";
  }
}

// Enhanced RAG with confidence scoring and tiered responses
export async function getRelevantContextWithConfidence(
  query: string,
): Promise<RAGResult> {
  // Get docs dynamically from Supabase
  const docs = await getKnowledgeDocs();

  // SECURITY CHECK FIRST
  const securityCheck = detectSecurityThreat(query);
  if (securityCheck.blocked) {
    return {
      context: "",
      confidence: 0,
      tier: 3,
      securityBlock: true,
      securityReason: securityCheck.reason,
    };
  }

  const q = query.toLowerCase();
  const keywords = q.split(" ").filter((w) => w.length > 3);

  if (keywords.length === 0) {
    return {
      context: docs[0]?.content || "",
      confidence: 0.5,
      tier: 2,
    };
  }

  // Pre-compile keyword regexes once (avoids repeated compilation per document)
  const keywordRegexes = keywords.map((keyword) => new RegExp(keyword, "g"));

  // Score each document
  const scored = docs.map((doc) => {
    const docLower = doc.content.toLowerCase();
    let matchCount = 0;
    let totalWeight = 0;

    for (const keywordRegex of keywordRegexes) {
      keywordRegex.lastIndex = 0; // Reset for reuse on this document
      const matches = docLower.match(keywordRegex);
      if (matches) {
        matchCount += matches.length;
        // Boost score for exact keyword matches
        totalWeight +=
          matches.length * (doc.securityLevel === "public" ? 1.5 : 1.0);
      }
    }

    // Calculate confidence based on keyword density and document length
    const docLength = docLower.split(" ").length;
    const keywordDensity = matchCount / Math.max(keywords.length, 1);
    const lengthNormalized = Math.min(docLength / 50, 1); // Normalize by expected doc length

    const score = (keywordDensity * 0.6 + lengthNormalized * 0.4) * totalWeight;

    return { doc, score };
  });

  // Filter documents with positive scores
  const relevant = scored.filter((s) => s.score > 0);

  if (relevant.length === 0) {
    return {
      context: "",
      confidence: 0,
      tier: 3,
    };
  }

  // Sort by score and take top matches
  relevant.sort((a, b) => b.score - a.score);

  // Calculate overall confidence (0-1 scale)
  const maxPossibleScore = keywords.length * 2; // Theoretical max
  const rawConfidence = Math.min(relevant[0].score / maxPossibleScore, 1);

  // Boost confidence for public documents, reduce for sensitive
  const securityModifier =
    relevant[0].doc.securityLevel === "public" ? 1.0 : 0.7;
  const confidence = rawConfidence * securityModifier;

  // Determine tier based on confidence
  let tier: 1 | 2 | 3 = 3;
  if (confidence >= 0.98)
    tier = 1; // 98%+ for full AI answers
  else if (confidence >= 0.9) tier = 2; // 90-97% limited info
  // Below 90% = Tier 3 (no answer)

  // Get context from top matching documents
  const topDocs = relevant.slice(0, 3); // Max 3 documents
  const context = topDocs.map((d) => d.doc.content).join("\n\n");

  return {
    context,
    confidence,
    tier,
  };
}

// Simple keyword retrieval (backward compatibility)
export async function getRelevantContext(query: string): Promise<string> {
  const result = await getRelevantContextWithConfidence(query);
  return result.context || PORTFOLIO_DOCS_STATIC[0].content;
}
