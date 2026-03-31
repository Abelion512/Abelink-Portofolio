import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  getRelevantContextWithConfidence,
  getTieredResponse,
  detectSecurityThreat,
} from "./rag";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  language?: "id" | "en";
}

export async function generateChatResponse(
  messages: ChatMessage[],
  systemPrompt: string,
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const lastMsg = messages[messages.length - 1].content;
  const userLang = messages[messages.length - 1]?.language || "id";

  // SECURITY: Check for threats first
  const securityCheck = detectSecurityThreat(lastMsg);
  if (securityCheck.blocked) {
    // Return cynical response for manipulation attempts
    return getTieredResponse(lastMsg, 3, "", false, userLang, true);
  }

  const { context, confidence, tier } =
    await getRelevantContextWithConfidence(lastMsg);

  // For general questions (who are you, what is this, etc), always use AI
  const isGeneralQuestion =
    /who are you|what (is|can|do)|siapa (kamu|anda)|apa (ini|itu)/i.test(
      lastMsg,
    );

  // SECURITY: If confidence below 95% AND not a general question, use tiered response
  if (confidence < 0.95 && !isGeneralQuestion) {
    return getTieredResponse(lastMsg, tier, context, false, userLang);
  }

  // For general questions or high confidence, use AI
  const langInstruction =
    userLang === "id"
      ? "Jawab dalam bahasa Indonesia yang natural dan ringkas."
      : "Answer in natural, concise English.";

  const enhancedPrompt = `${systemPrompt}\n\n${langInstruction}\n\n### CONTEXT:\n${context || "General info about Ihsanuddin Salav"}`;

  try {
    const result = await model.generateContent(
      enhancedPrompt + "\n\nUser: " + lastMsg + "\nAssistant:",
    );
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return userLang === "id"
      ? "Maaf, terjadi kesalahan saat memproses permintaan Anda."
      : "Sorry, an error occurred while processing your request.";
  }
}

export function detectPromptInjection(text: string): boolean {
  const patterns = [
    /ignore previous instructions/i,
    /system prompt/i,
    /bypass/i,
    /forget all rules/i,
    /act as an unrestricted/i,
  ];
  return patterns.some((p) => p.test(text));
}

export function containsPII(text: string): boolean {
  const phoneRegex = /(\+62|62|0)8[1-9][0-9]{6,10}/g;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return phoneRegex.test(text) || emailRegex.test(text);
}
