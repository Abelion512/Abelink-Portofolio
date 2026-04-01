"use client";

import { motion } from "motion/react";
import { useLangStore } from "@/store/languageStore";
import FloatingTitle from "@/components/ui/FloatingTitle";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useState } from "react";

export default function StackPage() {
  const { t } = useLangStore();
  const [isReady, setIsReady] = useState(false);

  const stackCategories = [
    {
      title: "Frontend Architecture",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
      color: "rgba(59, 130, 246, 0.15)" // Blue accent
    },
    {
      title: "Backend & Systems",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-7-4h.01M11 16h.01" />
        </svg>
      ),
      items: ["Node.js", "Supabase", "PostgreSQL", "REST & GraphQL", "Edge Functions"],
      color: "rgba(16, 185, 129, 0.15)" // Green accent
    },
    {
      title: "Intelligence & Automation",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      items: ["AI Integration", "n8n Workflows", "Vector Databases", "Prompt Engineering", "Custom LLM Agents"],
      color: "rgba(139, 92, 246, 0.15)" // Purple accent
    },
    {
      title: "Infrastructure",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      items: ["Linux Architecture", "Docker", "GitOps", "Nginx", "Cloudflare"],
      color: "rgba(245, 158, 11, 0.15)" // Amber accent
    }
  ];

  return (
    <>
      <FloatingTitle
        title={t("stack.title")}
        subtitle={t("stack.subtitle")}
        onAnimationComplete={() => setIsReady(true)}
      />

      <main className="relative z-10 pt-36 md:pt-32 px-4 sm:px-6 max-w-7xl mx-auto mb-16 sm:mb-24 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {stackCategories.map((category, idx) => (
            <SpotlightCard 
              key={category.title} 
              className="p-10 group" 
              color={category.color}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-primary group-hover:text-primary group-hover:border-primary/30 transition-all duration-500">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text-primary tracking-tight">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {category.items.map((item) => (
                    <span 
                      key={item} 
                      className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-text-secondary hover:border-primary/40 hover:text-primary transition-all duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </main>
    </>
  );
}
