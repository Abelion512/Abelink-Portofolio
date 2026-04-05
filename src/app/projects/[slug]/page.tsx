"use client";

import { useProjectBySlug } from "@/hooks/useData";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { 
  Calendar, 
  Briefcase, 
  Wrench, 
  ExternalLink, 
  Github, 
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import FloatingActions from "@/components/ui/FloatingActions";
import Link from "next/link";
import { useLangStore } from "@/store/languageStore";

export default function ProjectDetailPage() {
  const { t } = useLangStore();
  const params = useParams();
  const slug = params.slug as string;
  const { project, loading, error } = useProjectBySlug(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-text-secondary font-mono text-xs animate-pulse">
            {t("projects.loading_case_study")}
          </p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ArrowLeft className="text-red-500" size={32} />
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary mb-4">
            {t("projects.not_found_title")}
          </h1>
          <p className="text-text-secondary mb-8">
            {t("projects.not_found_desc")}
          </p>
          <Link 
            href="/projects"
            className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg shadow-primary/20"
          >
            {t("projects.back_to_projects")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base pb-32">

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden pt-32 flex items-center justify-center">
        {/* Dynamic Glow Background */}
        <div 
          className="absolute inset-0 opacity-20 blur-[120px]"
          style={{ 
            background: `radial-gradient(circle at center, ${project.dominantColor || '#6C63FF'}, transparent 70%)` 
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
                {t("projects.featuredCaseStudy")}
              </span>
              <div className="h-px w-12 bg-border" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary mb-6 leading-tight">
              {project.name}
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-base to-transparent" />
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image & Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Main Cover Image */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-2xl group flex items-center justify-center"
            >
              {(project.coverImage && project.coverImage !== "/placeholder-project.jpg") ? (
                <Image
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              ) : (
                <div 
                  className="absolute inset-0 bg-linear-to-br from-surface to-base flex flex-col items-center justify-center"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${project.dominantColor}1A 0%, rgba(0,0,0,0.4) 100%)` 
                  }}
                >
                  <div className="relative z-10 flex flex-col items-center gap-4 opacity-40">
                    <Briefcase size={64} className="text-primary" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em]">{t("projects.visual_pending")}</span>
                  </div>
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-10" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-base/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Markdown Case Study Content */}
            <motion.article
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5"
            >
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h2 className="text-3xl font-display font-bold text-text-primary mb-8 mt-12 flex items-center gap-4">
                      <span className="w-2 h-8 bg-primary rounded-full" /> {children}
                    </h2>,
                    h2: ({ children }) => <h3 className="text-2xl font-display font-semibold text-text-primary mb-6 mt-10">
                      {children}
                    </h3>,
                    p: ({ children }) => <p className="text-text-secondary leading-loose mb-6 text-lg">
                      {children}
                    </p>,
                    ul: ({ children }) => <ul className="space-y-4 mb-8 list-none pl-0">
                      {children}
                    </ul>,
                    li: ({ children }) => <li className="flex items-start gap-3 text-text-secondary text-lg">
                      <ChevronRight className="text-primary mt-1 shrink-0" size={20} />
                      {children}
                    </li>,
                    strong: ({ children }) => <strong className="text-text-primary font-bold">
                      {children}
                    </strong>,
                    code: ({ children }) => <code className="bg-surface-2 px-2 py-0.5 rounded border border-border text-primary font-mono text-sm leading-none inline-block">
                      {children}
                    </code>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary/40 bg-primary/5 p-6 rounded-r-2xl my-8 italic text-text-secondary">
                      {children}
                    </blockquote>
                  }}
                >
                  {project.content || t("projects.content_pending")}
                </ReactMarkdown>
              </div>
            </motion.article>
          </div>

          {/* Right Column: Metadata Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="glass p-8 rounded-[2rem] border-white/5 sticky top-32"
            >
              <h3 className="text-xl font-display font-bold text-text-primary mb-8 flex items-center gap-2">
                <Briefcase size={20} className="text-primary" />
                {t("projects.projectDetails")}
              </h3>

              <div className="space-y-8">
                {/* Role */}
                <div>
                  <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Briefcase size={12} /> {t("projects.role")}
                  </p>
                  <p className="text-text-primary font-semibold text-lg">
                    {project.role || "Lead Developer"}
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar size={12} /> {t("projects.timeline")}
                  </p>
                  <p className="text-text-primary font-semibold text-lg">
                    {project.timeline || "In Development"}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <p className="text-text-muted text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Wrench size={12} /> {t("projects.technologies")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tool) => (
                      <span 
                        key={tool} 
                        className="px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-text-secondary text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50 space-y-4">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-primary-light transition-all shadow-xl shadow-primary/20"
                    >
                      <ExternalLink size={18} />
                      {t("projects.liveDemo")}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 glass border-white/10 text-text-primary rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-surface/50 transition-all font-mono text-sm"
                    >
                      <Github size={18} />
                      {t("projects.viewSource")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </aside>

        </div>
      </main>

      <FloatingActions 
        githubUrl={project.githubUrl} 
        liveUrl={project.liveUrl} 
      />
    </div>
  );
}
