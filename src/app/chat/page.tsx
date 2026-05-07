import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat with Abelink AI | OlivX",
  description: "Talk to Abelink AI, the official assistant of OlivX, to learn more about our projects and services.",
};

export default function ChatPage() {
  return (
    <main className="pt-32 px-6 max-w-4xl mx-auto h-[90vh] flex flex-col">
      <div className="mb-8">
        <h1 className="text-5xl font-display font-bold italic">Talk to <span className="text-gradient">Abelink AI</span></h1>
        <p className="text-text-secondary mt-2">Ask anything about OlivX, Abelion, or our latest projects.</p>
      </div>

      <div className="flex-1 rounded-3xl glass border border-border bg-surface/10 p-6 mb-8 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-olivx-purple/20 flex items-center justify-center text-olivx-purple mb-4 animate-pulse">
          ⚡
        </div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Abelink AI is warming up</h2>
        <p className="text-text-secondary max-w-sm">
          Integrasi Anthropic API akan diimplementasikan pada Phase 3. 
          Siapkan API Key Anda untuk mulai bercakap-cakap!
        </p>
      </div>

      <div className="flex gap-4 p-2 pl-6 rounded-2xl glass border border-border bg-surface/40 items-center">
        <input 
          disabled
          placeholder="Tanya tentang OlivX (Coming Soon)..." 
          className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-secondary/50 py-3"
        />
        <button disabled className="px-6 py-3 bg-olivx-purple/50 text-white rounded-xl font-bold cursor-not-allowed">
          Send
        </button>
      </div>
    </main>
  );
}
