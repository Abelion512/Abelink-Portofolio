import { Metadata } from "next";
import ChatClient from "@/components/guestbook/ChatClient";

export const metadata: Metadata = {
  title: "Chat with Abelion AI | Abelink Portfolio",
  description: "Talk to Abelion AI, the official digital assistant of Ihsanuddin Salav, to learn more about his projects and skills.",
};

export default function ChatPage() {
  return (
    <main className="pt-32 px-6 max-w-5xl mx-auto mb-20">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold italic mb-3">
          Talk to <span className="text-gradient">Abelion AI</span>
        </h1>
        <p className="text-text-secondary text-sm sm:text-base max-w-2xl">
          Tanyakan apa saja tentang proyek, teknologi yang digunakan, atau latar belakang Ihsanuddin Salav. Asisten ini ditenagai oleh Claude AI.
        </p>
      </div>

      <div className="rounded-[2.5rem] glass border border-border bg-surface/5 p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-olivx-purple/5 blur-[100px] rounded-full" />
        <ChatClient />
      </div>
    </main>
  );
}
