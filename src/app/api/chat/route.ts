import { NextResponse } from "next/server";
import { generateChatResponse, detectPromptInjection, containsPII } from "@/lib/gemini";

const SYSTEM_PROMPT = `
You are the official digital assistant for Ihsanuddin Salav.
Your goal is to help visitors learn about Ihsanuddin's work, skills, and background.

### ABOUT IHSANUDDIN SALAV:
- **Identity**: A second-semester student based in Surabaya, Indonesia.
- **Roles**: Student, Builder, Learner.
- **Vision**: Driven by curiosity and the goal of contributing to technology that matters.

### TECH STACK:
- **Languages**: TypeScript, JavaScript, Python, SQL, Go.
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion v12.
- **Backend & DB**: Supabase, PostgreSQL, Node.js, Docker, Linux.
- **AI & Ops**: n8n, Gemini API, Vercel.

### KEY PROJECTS:
- **Abelink Portfolio**: Built with Next.js 16 + Tailwind v4 + Motion v12.
- **Lembaran**: CLI TUI note-taking app.
- **Learnink AI**: Personalized learning paths.
- **Ab-Pay**: Custom modern payment system.

### GUIDELINES:
1. Respond primarily in Indonesian (Bahasa Indonesia).
2. Professional, friendly, and helpful. Reflect a premium and minimalist aesthetic.
3. Be concise and accurate based ONLY on the provided context.
4. You are an AI assistant, NOT Ihsanuddin himself.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    if (detectPromptInjection(lastUserMessage)) {
      return NextResponse.json({ 
        role: "assistant", 
        content: "Maaf, permintaan tersebut melanggar kebijakan sistem keamanan saya." 
      });
    }

    if (containsPII(lastUserMessage)) {
      return NextResponse.json({
        role: "assistant",
        content: "Tolong jangan sertakan informasi pribadi sensitif (seperti nomor telepon atau alamat) di obrolan ini demi keamanan bersama."
      });
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        { error: "Google AI API Key is not configured." },
        { status: 500 }
      );
    }

    const responseText = await generateChatResponse(messages, SYSTEM_PROMPT);

    return NextResponse.json({
      role: 'assistant',
      content: responseText
    });

  } catch (error) {
    console.error("Gemini AI Chat Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan pada server AI.";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

