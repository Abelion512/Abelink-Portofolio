import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import { GitCommit, GitPullRequest, Bug, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Changelog | Abelink Portofolio",
  description: "Release history and updates for Abelink Portofolio.",
};

export const revalidate = 60;

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
    bg: "bg-primary/5",
  },
  minor: {
    icon: GitCommit,
    label: "Minor",
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/5",
  },
  patch: {
    icon: GitPullRequest,
    label: "Patch",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/5",
  },
  fix: {
    icon: Bug,
    label: "Fix",
    color: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
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

async function getChangelog(): Promise<ChangelogEntry[]> {
  try {
    const { data, error } = await supabase
      .from("changelog_entries")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    const entries = (data as ChangelogEntry[]) || [];
    // Sort by semver descending (not date)
    entries.sort((a, b) => semverSort(a.version, b.version));
    return entries;
  } catch (err) {
    console.error("Failed to fetch changelog:", err);
    return [];
  }
}

export default async function ChangelogPage() {
  const entries = await getChangelog();

  return (
    <main className="pt-32 px-6 max-w-4xl mx-auto mb-24 min-h-screen">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/50 bg-surface/30 text-[10px] font-mono tracking-widest uppercase text-primary mb-4">
          <GitCommit size={14} />
          Release History
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
          <span className="text-gradient">Changelog</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Setiap pembaruan, peningkatan, dan perbaikan pada portofolio ini.
        </p>
      </div>

      {/* Timeline */}
      {entries.length === 0 ? (
        <div className="text-center py-32 text-text-secondary/40">
          <GitCommit size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-mono text-xs uppercase tracking-[0.3em]">
            Belum ada catatan
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />

          <div className="space-y-12">
            {entries.map((entry) => {
              const cfg = typeConfig[entry.type] || typeConfig.minor;
              const Icon = cfg.icon;

              return (
                <div key={entry.id} className="relative pl-16 md:pl-20">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full border-2 ${cfg.border} ${cfg.bg} ring-4 ring-[--color-base] flex items-center justify-center`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${cfg.color} bg-current`} />
                  </div>

                  {/* Card */}
                  <div className="glass border border-white/5 rounded-[2rem] p-6 md:p-8 hover:border-white/10 transition-all">
                    {/* Top Row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <Icon size={16} className={cfg.color} />
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                      <span className="text-[10px] font-mono text-text-secondary/40 tracking-widest">
                        {entry.version}
                      </span>
                      <span className="text-[10px] font-mono text-text-secondary/30 ml-auto">
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

                    {/* Content — rendered as markdown */}
                    {entry.content && (
                      <div className="text-text-secondary text-sm leading-relaxed font-body prose prose-invert max-w-none">
                        <ReactMarkdown>{entry.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
