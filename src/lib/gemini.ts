import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { getRelevantContext } from "./rag";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function generateChatResponse(messages: ChatMessage[], systemPrompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const lastMsg = messages[messages.length - 1].content;
  const context = await getRelevantContext(lastMsg);
  const enhancedPrompt = `${systemPrompt}\n\n### ADDITIONAL RAG CONTEXT:\n${context}`;

  const history: Content[] = messages.slice(0, -1).map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  const chat = model.startChat({
    history,
    systemInstruction: {
      role: 'system',
      parts: [{ text: enhancedPrompt }]
    }
  });

  const result = await chat.sendMessage([{ text: lastMsg }]);
  return result.response.text();
}

export function detectPromptInjection(text: string): boolean {
  const patterns = [
    /ignore previous instructions/i, 
    /system prompt/i, 
    /bypass/i,
    /forget all rules/i,
    /act as an unrestricted/i
  ];
  return patterns.some(p => p.test(text));
}

export function containsPII(text: string): boolean {
  const phoneRegex = /(\+62|62|0)8[1-9][0-9]{6,10}/g;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return phoneRegex.test(text) || emailRegex.test(text);
}
