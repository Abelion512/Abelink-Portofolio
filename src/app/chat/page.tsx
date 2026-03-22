"use client";

import ChatClient from "@/components/guestbook/ChatClient";
import { useLangStore } from "@/store/languageStore";

export default function ChatPage() {
  const { t } = useLangStore();

  return (
    <main className="pt-32 px-6 max-w-5xl mx-auto mb-20">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold italic mb-3">
          {t('chat.title')}
        </h1>
        <p className="text-[--color-text-secondary] text-sm sm:text-base max-w-2xl">
          {t('chat.subtitle')}
        </p>
      </div>

      <div className="rounded-[2.5rem] glass border border-[--color-border] bg-surface/5 p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[--color-primary]/5 blur-[100px] rounded-full" />
        <ChatClient />
      </div>
    </main>
  );
}
