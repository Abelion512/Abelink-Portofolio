"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Send,
  User,
  Clock,
  Loader2,
  Lock,
  Github,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLangStore } from "@/store/languageStore";
import { type Session } from "@supabase/supabase-js";

interface GuestbookEntry {
  id: string;
  user_name: string;
  message: string;
  created_at: string;
  user_id?: string;
}

export default function GuestbookForm({
  initialEntries,
}: {
  initialEntries: GuestbookEntry[];
}) {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const { t, lang } = useLangStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const blurPII = (text: string) => {
    // Email masking - simple pattern with no catastrophic backtracking
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    let result = text.replace(emailRegex, "[email hidden]");

    // Phone masking - simplified regex to prevent ReDoS
    // Matches common phone number formats without complex optional groups
    // Indonesian: +62 812-3456-7890, 081234567890
    // International: +1-555-123-4567, (555) 123-4567, +44 20 7946 0958
    const phoneRegex =
      /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,4}[-.\s]?\d{2,4}/g;
    result = result.replace(phoneRegex, "[contact hidden]");

    // Additional catch-all for long digit sequences (likely phone numbers)
    const digitSequenceRegex = /\b\d{10,15}\b/g;
    result = result.replace(digitSequenceRegex, "[contact hidden]");

    return result;
  };

  const stripHtml = (html: string) => {
    // Use a DOMParser-based approach which is safer than regex
    // This strips all HTML tags while preserving text content
    if (typeof window === "undefined") {
      // SSR fallback: basic regex strip (shouldn't normally be reached)
      return html.replace(/<[^>]*>/g, "");
    }

    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      // Recursively extract text content from all nodes
      const extractText = (node: Node): string => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent || "";
        }
        return Array.from(node.childNodes).map(extractText).join("");
      };
      return extractText(doc.body);
    } catch {
      // If parsing fails, fall back to regex strip
      return html.replace(/<[^>]*>/g, "");
    }
  };

  const handleLogin = async (provider: "github" | "google") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + "/guestbook" },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !message.trim() || isSubmitting || cooldown > 0) return;

    setIsSubmitting(true);
    try {
      const sanitizedMessage = blurPII(stripHtml(message.trim()));

      const { data, error } = await supabase
        .from("guestbook")
        .insert([
          {
            user_name:
              session.user.user_metadata.full_name ||
              session.user.email?.split("@")[0],
            message: sanitizedMessage,
            user_id: session.user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setEntries([data, ...entries]);
        setMessage("");
        setCooldown(6); // 6s cooldown
      }
    } catch (error) {
      console.error("Error submitting guestbook:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      lang === "id" ? "id-ID" : "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  };

  return (
    <div className="space-y-12">
      {/* Auth & Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass border border-border bg-surface/10 rounded-[2.5rem] p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-2xl font-display font-bold">
              {t("guestbook.title")}
            </h2>
          </div>
          {session && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <ShieldCheck size={14} className="text-primary" />
              <span className="text-[10px] font-mono text-text-primary uppercase tracking-tighter">
                Authenticated
              </span>
            </div>
          )}
        </div>

        {!session ? (
          <div className="flex flex-col items-center gap-6 py-8 text-center">
            <div className="bg-surface/50 p-4 rounded-full border border-border">
              <Lock size={32} className="text-text-muted" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                Sign in to leave a message
              </h3>
              <p className="text-sm text-text-secondary max-w-sm">
                To prevent spam and ensure the quality of the guestbook, please
                authenticate using GitHub or Google.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleLogin("github")}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-all text-sm"
              >
                <Github size={18} /> Continue with GitHub
              </button>
              <button
                onClick={() => handleLogin("google")}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold hover:scale-105 transition-all text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <textarea
                  placeholder={t("guestbook.messagePlaceholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-base/40 border border-border rounded-2xl px-6 py-4 outline-none focus:border-primary/50 transition-all text-sm min-h-30 resize-none"
                  required
                />
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono uppercase tracking-widest">
                    <User size={10} />
                    Signed in as{" "}
                    <span className="text-text-primary font-bold">
                      {session.user.user_metadata.full_name ||
                        session.user.email}
                    </span>
                  </div>
                  {cooldown > 0 && (
                    <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] animate-pulse">
                      <Clock size={10} /> Cooldown: {cooldown}s
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || cooldown > 0}
                className="px-10 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                )}
                {t("guestbook.send")}
              </button>
            </div>
          </form>
        )}
      </motion.div>

      {/* List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence initial={false}>
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass border border-border/50 bg-surface/5 p-8 rounded-4xl relative overflow-hidden group hover:border-primary/30 transition-all"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <MessageSquare size={100} />
              </div>

              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary shadow-inner">
                    <User size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-base tracking-tight">
                      {entry.user_name}
                    </span>
                    <div className="flex items-center gap-1.5 text-text-secondary/40 text-[9px] uppercase tracking-[0.2em] font-mono">
                      <Clock size={10} />
                      {formatDate(entry.created_at)}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed relative z-10 font-body">
                {entry.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {entries.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-20 text-text-secondary/30 italic">
          <AlertCircle size={40} />
          {t("guestbook.empty")}
        </div>
      )}
    </div>
  );
}
