// Generic OpenAI-compatible AI client — works with OpenRouter, OpenAI, Groq, etc.
// Configure via env vars: AI_BASE_URL, AI_API_KEY, AI_MODEL

import {
  getRelevantContextWithConfidence,
  getTieredResponse,
  detectSecurityThreat,
} from "./rag";
import { env } from "./env";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  language?: "id" | "en";
}

const BASE_URL = env.AI_BASE_URL;
const API_KEY = env.AI_API_KEY;
const MODEL = env.AI_MODEL;

export async function generateChatResponse(
  messages: ChatMessage[],
  systemPrompt: string,
) {
  const lastMsg = messages[messages.length - 1].content;
  const userLang = messages[messages.length - 1]?.language || "id";

  // SECURITY: Check for threats first
  const securityCheck = detectSecurityThreat(lastMsg);
  if (securityCheck.blocked) {
    return getTieredResponse(lastMsg, 3, "", false, userLang, true);
  }

  const { context, confidence, tier } =
    await getRelevantContextWithConfidence(lastMsg);

  const isGeneralQuestion =
    /who are you|what (is|can|do)|siapa (kamu|anda)|apa (ini|itu)/i.test(
      lastMsg,
    );

  if (confidence < env.AI_CONFIDENCE_HIGH && !isGeneralQuestion) {
    return getTieredResponse(lastMsg, tier, context, false, userLang);
  }

  const langInstruction =
    userLang === "id"
      ? "Jawab dalam bahasa Indonesia yang natural dan ringkas."
      : "Answer in natural, concise English.";

  const enhancedPrompt = `${systemPrompt}\n\n${langInstruction}\n\n### CONTEXT:\n${context || "General info about Ihsanuddin Salav"}`;

  if (!API_KEY) {
    throw new Error("AI_API_KEY is not configured");
  }

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": env.SITE_URL,
        "X-Title": "Abelink Portfolio AI",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: enhancedPrompt },
          { role: "user", content: lastMsg },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      throw new Error(
        `AI API error ${response.status}: ${errBody || response.statusText}`,
      );
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (error) {
    console.error("AI API Error:", error);
    return userLang === "id"
      ? "Maaf, terjadi kesalahan saat memproses permintaan Anda."
      : "Sorry, an error occurred while processing your request.";
  }
}

export function detectPromptInjection(text: string): boolean {
  // Layer 1: Direct instruction override patterns
  const directOverridePatterns = [
    /ignore\s+(previous|all|above)\s+(instructions|rules|prompts|guidelines)/i,
    /disregard\s+(previous|all|above)/i,
    /forget\s+(previous|all|everything|your\s+(instructions|training))/i,
    /override\s+(your|the)\s+(instructions|system|prompt)/i,
    /replace\s+(your|the)\s+(instructions|system\s+prompt)/i,
  ];

  // Layer 2: System prompt exposure attempts
  const systemExposurePatterns = [
    /system\s+prompt/i,
    /system\s+message/i,
    /initial\s+instructions/i,
    /core\s+directives?/i,
    /reveal\s+(your|the)\s+(full|complete|original|hidden)\s+(prompt|instructions)/i,
    /show\s+me\s+your\s+(prompt|instructions|system)/i,
  ];

  // Layer 3: Role-play and persona hijacking
  const roleplayPatterns = [
    /act\s+as\s+(an?\s+)?(unrestricted|unfiltered|unlimited|developer|admin|system)/i,
    /pretend\s+(you're|to\s+be)\s+(an?\s+)?(unrestricted|unfiltered|developer|admin)/i,
    /role\s*[.-]?\s*play\s+as\s+(an?\s+)?(developer|admin|system)/i,
    /you\s+are\s+now\s+(an?\s+)?(developer|admin|system|unrestricted)/i,
    /switch\s+to\s+(dev|admin|debug|unrestricted)\s+mode/i,
    /enable\s+(dev|admin|debug|developer|unrestricted)\s+mode/i,
  ];

  // Layer 4: Security bypass attempts
  const securityBypassPatterns = [
    /bypass\s+(security|restrictions|filters|limits|guardrails)/i,
    /disable\s+(security|safety|filters|restrictions|guardrails)/i,
    /turn\s+off\s+(security|safety|filters|restrictions)/i,
    /remove\s+(all\s+)?(restrictions|limitations|filters|guardrails)/i,
    /no\s+(ethical|safety|content)\s+(restrictions|guidelines|rules|filters)/i,
    /without\s+(any\s+)?(restrictions|limitations|filters)/i,
    /\bno\s+(filters|restrictions|limits)\b/i,
    /\bbypass\s+\w+\s+filter/i,
  ];

  // Layer 5: Delimiter and structural injection
  const delimiterPatterns = [
    /###\s*(system|user|assistant|instructions)\s*###/i,
    /<{0,2}(system|user|assistant|prompt)>{0,2}/i,
    /\[system\]|\[user\]|\[assistant\]/i,
    /BEGIN\s+(SYSTEM|USER|PROMPT|INSTRUCTIONS)/i,
    /END\s+(SYSTEM|USER|PROMPT|INSTRUCTIONS)/i,
  ];

  // Layer 6: Encoded or obfuscated attempts
  const encodedPatterns = [
    /base64[:\s]/i,
    /decode\s+(this|the\s+following)/i,
    /\\x[0-9a-f]{2}/i,
    /&#?[0-9]+;/i,
    /%[0-9a-f]{2}/i,
  ];

  // Layer 7: Jailbreak and manipulation
  const jailbreakPatterns = [
    /dan\s+mode/i,
    /developer\s+mode\s+enabled/i,
    /always\s+say\s+yes/i,
    /never\s+(refuse|decline|deny|reject)/i,
    /you\s+(must|should|will)\s+(always|now|obey)/i,
    /this\s+is\s+(for|a)\s+(research|educational|testing|academic)/i,
  ];

  // Layer 8: Context manipulation
  const contextManipulationPatterns = [
    /from\s+now\s+on/i,
    /starting\s+now/i,
    /your\s+new\s+(role|purpose|function|task)/i,
    /you\s+have\s+been\s+(updated|upgraded|modified)/i,
    /previous\s+restrictions\s+(no\s+longer\s+)?apply/i,
  ];

  const allPatterns = [
    ...directOverridePatterns,
    ...systemExposurePatterns,
    ...roleplayPatterns,
    ...securityBypassPatterns,
    ...delimiterPatterns,
    ...encodedPatterns,
    ...jailbreakPatterns,
    ...contextManipulationPatterns,
  ];

  const hasPatternMatch = allPatterns.some((pattern) => pattern.test(text));

  const specialCharRatio =
    (text.match(/[###\[\]{}<>]/g) || []).length / text.length;
  const hasSuspiciousStructure = specialCharRatio > 0.05 && text.length > 50;

  return hasPatternMatch || hasSuspiciousStructure;
}

export function containsPII(text: string): boolean {
  const phoneRegex = /(\+62|62|0)8[1-9][0-9]{6,10}/;
  const emailRegex = /\b[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}\b/;
  return phoneRegex.test(text) || emailRegex.test(text);
}
