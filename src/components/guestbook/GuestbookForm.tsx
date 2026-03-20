"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, User, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function GuestbookForm({ initialEntries }: { initialEntries: GuestbookEntry[] }) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .insert([{ name, message }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setEntries([data, ...entries]);
        setMessage("");
      }
    } catch (error) {
      console.error("Error submitting guestbook:", error);
      alert("Gagal mengirimkan pesan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-12">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-border bg-surface/10 rounded-[2.5rem] p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-olivx-purple/20 flex items-center justify-center text-olivx-purple">
            <MessageSquare size={20} />
          </div>
          <h2 className="text-2xl font-display font-bold">Leave a message</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="md:col-span-1 bg-base/40 border border-border rounded-xl px-4 py-3 outline-none focus:border-olivx-purple/50 transition-all text-sm"
              required
            />
            <div className="md:col-span-3 flex gap-2">
              <input
                type="text"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-base/40 border border-border rounded-xl px-4 py-3 outline-none focus:border-olivx-purple/50 transition-all text-sm"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-olivx-purple text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence initial={false}>
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass border border-border bg-surface/5 p-6 rounded-3xl relative overflow-hidden group hover:border-olivx-purple/30 transition-all"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquare size={60} />
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <User size={14} />
                  </div>
                  <span className="font-bold text-text-primary text-sm">{entry.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-secondary/40 text-[10px] uppercase tracking-wider font-mono">
                  <Clock size={10} />
                  {formatDate(entry.created_at)}
                </div>
              </div>
              
              <p className="text-text-secondary text-sm leading-relaxed relative z-10">
                {entry.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {entries.length === 0 && (
        <div className="text-center py-20 text-text-secondary/30 italic">
          Belum ada pesan. Jadilah yang pertama meninggalkan jejak!
        </div>
      )}
    </div>
  );
}
