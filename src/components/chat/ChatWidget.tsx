"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  User, 
  Sparkles, 
  Trash2, 
  Loader2, 
  X, 
  MessageCircle,
  Minimize2
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLangStore } from "@/store/languageStore";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const { t } = useLangStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t('chat.greeting') || "Hello! I'm Abelink AI. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen]);

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

      if (!response.ok) throw new Error("Error");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble connecting right now. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: t('chat.greeting') || "Hello again!",
      },
    ]);
  };

  return (
    <div className="fixed bottom-24 right-6 z-[999] lg:bottom-10 lg:right-10 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-[90vw] max-w-[400px] h-[600px] max-h-[70vh] glass border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="p-6 border-b border-border/20 flex items-center justify-between bg-surface/30 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-tight">AI Assistant</h3>
                  <p className="text-[10px] font-mono text-primary animate-pulse uppercase tracking-widest">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={clearChat} className="p-2 text-text-muted hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-text-muted hover:text-text-primary transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[10px] ${
                      m.role === "user" ? "bg-primary text-white" : "bg-surface border border-border/50 text-primary"
                    }`}>
                      {m.role === "user" ? <User size={14} /> : <Sparkles size={14} />}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl text-sm ${
                      m.role === "user" 
                      ? "bg-primary/10 border border-primary/20 text-text-primary rounded-tr-none" 
                      : "bg-surface/50 border border-border/40 text-text-secondary rounded-tl-none"
                    }`}>
                      <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed">
                        <ReactMarkdown>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface border border-border/40 flex items-center justify-center">
                    <Loader2 size={14} className="animate-spin text-primary" />
                  </div>
                  <div className="flex gap-1 items-center px-4 py-3 bg-surface/50 rounded-2xl border border-border/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chat.placeholder') || "Ask me anything..."}
                  className="flex-1 bg-surface/50 border border-border/40 rounded-xl px-5 py-3.5 outline-none focus:border-primary/50 text-sm transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isLoading}
                  className="p-3.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all font-bold"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-[1.5rem] bg-primary text-white shadow-2xl flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <Minimize2 size={24} /> : <MessageCircle size={24} />}
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-base animate-pulse" 
          />
        )}
      </motion.button>
    </div>
  );
}
