"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Sparkles, Trash2, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! Saya Abelion AI. Ada yang bisa saya bantu terkait portofolio, proyek, atau keahlian Ihsanuddin Salav?",
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

      if (!response.ok) throw new Error("Gagal mendapatkan respon dari AI");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, terjadi kesalahan teknis. Silakan coba lagi nanti." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat dibersihkan. Halo lagi! Apa yang ingin Anda tanyakan?",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 mb-6 scrollbar-thin scrollbar-thumb-border">
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
                  m.role === "user" ? "bg-primary/20 text-primary" : "bg-olivx-purple/20 text-olivx-purple"
                }`}>
                  {m.role === "user" ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                <div className={`p-4 rounded-2xl glass border ${
                  m.role === "user" 
                  ? "bg-primary/5 border-primary/20 text-text-primary rounded-tr-none" 
                  : "bg-surface/30 border-border/50 text-text-secondary rounded-tl-none"
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
            className="flex justify-start items-center gap-3 text-text-secondary/50 text-sm italic"
          >
            <div className="w-8 h-8 rounded-lg bg-olivx-purple/10 flex items-center justify-center">
              <Loader2 size={16} className="animate-spin text-olivx-purple/50" />
            </div>
            <span>Abelion AI sedang mengetik...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-olivx-purple/30 to-ai-teal/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
        <div className="relative flex gap-2 p-2 rounded-2xl glass border border-border bg-base/80 focus-within:border-olivx-purple/50 transition-all items-center">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
            placeholder="Tanyakan sesuatu tentang Abelion..." 
            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-secondary/30 py-3 px-4 text-sm sm:text-base"
          />
          <button 
            type="button"
            onClick={clearChat}
            className="p-3 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            title="Clear chat"
          >
            <Trash2 size={20} />
          </button>
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl font-bold transition-all ${
              !input.trim() || isLoading 
              ? "bg-surface text-text-secondary/30 cursor-not-allowed" 
              : "bg-olivx-purple text-white shadow-[0_0_15px_rgba(108,99,255,0.3)] hover:scale-105 active:scale-95"
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
