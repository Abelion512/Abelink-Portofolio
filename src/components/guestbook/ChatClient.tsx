"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Sparkles, Trash2, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { useLangStore } from "@/store/languageStore";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatClient() {
  const { t } = useLangStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t('chat.greeting'),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error(t('common.error'));

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t('common.error') },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: t('chat.greeting'),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 mb-6 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  m.role === "user" ? "bg-[--color-primary]/20 text-[--color-primary]" : "bg-[--color-primary]/20 text-[--color-primary]"
                }`}>
                  {m.role === "user" ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                <div className={`p-4 rounded-2xl glass border ${
                  m.role === "user" 
                  ? "bg-[--color-primary]/5 border-[--color-primary]/20 text-[--color-text-primary] rounded-tr-none" 
                  : "bg-surface/30 border-[--color-border]/50 text-[--color-text-secondary] rounded-tl-none"
                }`}>
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-base/50">
                    <ReactMarkdown>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex justify-start items-center gap-3 text-[--color-text-secondary]/50 text-sm italic"
          >
            <div className="w-8 h-8 rounded-lg bg-[--color-primary]/10 flex items-center justify-center">
              <Loader2 size={16} className="animate-spin text-[--color-primary]/50" />
            </div>
            <span>{t('chat.typing')}</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[--color-primary]/30 to-[--color-accent]/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
        <div className="relative flex gap-2 p-2 rounded-2xl glass border border-[--color-border] bg-base/80 focus-within:border-[--color-primary]/50 transition-all items-center">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
            placeholder={t('chat.placeholder')} 
            className="flex-1 bg-transparent border-none outline-none text-[--color-text-primary] placeholder:text-[--color-text-muted] py-3 px-4 text-sm sm:text-base"
          />
          <button 
            type="button"
            onClick={clearChat}
            className="p-3 text-[--color-text-secondary] hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            title={t('chat.clear')}
          >
            <Trash2 size={20} />
          </button>
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl font-bold transition-all ${
              !input.trim() || isLoading 
              ? "bg-surface text-[--color-text-secondary]/30 cursor-not-allowed" 
              : "bg-[--color-primary] text-white shadow-[0_0_15px_rgba(108,99,255,0.3)] hover:scale-105 active:scale-95"
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
