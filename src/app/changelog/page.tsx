"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";
import { GitCommit, GitPullRequest, Bug, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  content: string | null;
  date: string;
  type: "major" | "minor" | "patch" | "fix";
}

const typeConfig = {
  major: {
    icon: Sparkles,
    label: "Major",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
  },
  minor: {
    icon: GitCommit,
    label: "Minor",
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/10",
  },
  patch: {
    icon: GitPullRequest,
    label: "Patch",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/10",
  },
  fix: {
    icon: Bug,
    label: "Fix",
    color: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/10",
  },
};

function semverSort(a: string, b: string): number {
  const pa = a.replace(/^v/, "").split(".").map(Number);
  const pb = b.replace(/^v/, "").split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pb[i] || 0) - (pa[i] || 0);
  }
  return 0;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ChangelogPage() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data, error } = await supabase
          .from("changelog_entries")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;
        const list = (data as ChangelogEntry[]) || [];
        // Sort by semver descending — changelog follows version progression
        list.sort((a, b) => semverSort(a.version, b.version));
        setEntries(list);
      } catch (err) {
        console.error("Failed to fetch changelog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return (
    <main className="pt-32 px-6 max-w-4xl mx-auto mb-24 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/50 bg-surface/30 text-[10px] font-mono tracking-widest uppercase text-primary mb-4">
          <Sparkles size={14} />
          Release History
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
          <span className="text-gradient">Changelog</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Setiap pembaruan, peningkatan, dan perbaikan pada portofolio ini.
        </p>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && entries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface/40 border border-white/5 flex items-center justify-center">
            <GitCommit size={32} className="text-text-muted" />
          </div>
          <h3 className="text-xl font-display font-bold text-text-primary mb-2">
            No entries yet
          </h3>
          <p className="text-sm text-text-muted font-mono uppercase tracking-wider">
            Changelog will populate as updates are released
          </p>
        </motion.div>
      )}

      {/* Timeline */}
      {!loading && entries.length > 0 && (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-4 bottom-4 w-px bg-linear-to-b from-primary/30 via-primary/5 to-transparent" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
          >
            {entries.map((entry) => {
              const cfg = typeConfig[entry.type] || typeConfig.minor;
              const Icon = cfg.icon;

              return (
                <motion.div
                  key={entry.id}
                  variants={itemAnim}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-3 md:left-5 top-6 w-6 h-6 rounded-full border-2 ${cfg.border} ${cfg.bg} ring-4 ring-[--color-base] flex items-center justify-center`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${cfg.color.replace("text", "bg")} bg-current`}
                    />
                  </div>

                  {/* Card */}
                  <SpotlightCard
                    color={
                      entry.type === "major"
                        ? "rgba(108,99,255,0.15)"
                        : entry.type === "fix"
                          ? "rgba(251,191,36,0.15)"
                          : "rgba(0,212,170,0.15)"
                    }
                    className="p-6 md:p-8"
                    tilt={false}
                  >
                    {/* Top row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Icon size={16} className={cfg.color} />
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                      <span className="text-[10px] font-mono tracking-wider text-text-secondary/60">
                        v{entry.version.replace(/^v/, "")}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted ml-auto">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-3">
                      {entry.title}
                    </h2>

                    {/* Content — replace literal \n with real newlines */}
                    {entry.content && (
                      <div className="text-text-secondary text-sm leading-relaxed font-body prose prose-invert max-w-none prose-p:leading-relaxed">
                        <ReactMarkdown>{entry.content.replace(/\\n/g, '\n')}</ReactMarkdown>
                      </div>
                    )}
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </main>
  );
}
