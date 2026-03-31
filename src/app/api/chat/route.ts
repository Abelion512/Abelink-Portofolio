import { NextResponse } from "next/server";
import {
  generateChatResponse,
  detectPromptInjection,
  containsPII,
} from "@/lib/gemini";

const SYSTEM_PROMPT = `
You are Ihsanuddin's AI assistant.

YOUR IDENTITY:
- You help visitors learn about Ihsanuddin Salav
- You know about: his projects, tech stack, achievements, background
- You CAN answer: general questions about Ihsanuddin, his work, his skills

RESPONSE STYLE:
- Direct and concise
- Use bullet points for lists
- NO greetings unless user greets first
- NO "Apakah ada yang bisa dibantu?" endings
- NO excessive emojis
- Natural Indonesian or English (match user's language)

WHAT YOU CAN ANSWER:
- Questions about Ihsanuddin's projects
- Questions about his tech stack
- Questions about his background/education
- Questions about his skills
- General intro: "I'm Ihsanuddin's AI assistant. I can tell you about his projects, tech stack, and background."

WHAT YOU CANNOT ANSWER:
- Personal info (email, phone, address) - unless 98% confidence
- Database credentials, API keys, secrets
- Questions unrelated to Ihsanuddin

If you don't know: "Tidak ada informasi ini di dokumen saya."
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    if (detectPromptInjection(lastUserMessage)) {
      return NextResponse.json({
        role: "assistant",
        content:
          "Maaf, permintaan tersebut melanggar kebijakan sistem keamanan saya.",
      });
    }

    if (containsPII(lastUserMessage)) {
      return NextResponse.json({
        role: "assistant",
        content:
          "Tolong jangan sertakan informasi pribadi sensitif (seperti nomor telepon atau alamat) di obrolan ini demi keamanan bersama.",
      });
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        { error: "Google AI API Key is not configured." },
        { status: 500 },
      );
    }

    const responseText = await generateChatResponse(messages, SYSTEM_PROMPT);

    return NextResponse.json({
      role: "assistant",
      content: responseText,
    });
  } catch (error) {
    console.error("Gemini AI Chat Error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan pada server AI.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
