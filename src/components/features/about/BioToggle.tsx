"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const content = {
  en: {
    p1: "Born in Surabaya, Indonesia. Building with a vision that bridges local innovation with global technology standards. Currently deeply involved in building the next generation of AI-native infrastructure through OlivX.",
    p2: "My journey is driven by the desire to empower communities through automation and decentralized intelligence. From self-hosted AI operating systems to autonomous finance agents, every project is a step towards a more efficient future.",
    tech: "Technical Core",
    photo: "Ihsanuddin Salav (Abelion)"
  },
  id: {
    p1: "Lahir di Surabaya, Indonesia. Membangun dengan visi yang menjembatani inovasi lokal dan standar teknologi global. Saat ini berfokus dalam mengembangkan infrastruktur AI-native generasi berikutnya melalui OlivX.",
    p2: "Perjalanan saya didorong oleh keinginan untuk memberdayakan komunitas melalui otomasi dan kecerdasan terdesentralisasi. Dari OS AI self-hosted hingga agen finansial otonom, setiap proyek adalah langkah menuju masa depan yang lebih efisien.",
    tech: "Inti Teknis",
    photo: "Ihsanuddin Salav (Abelion)"
  }
};

export default function BioToggle() {
  const [lang, setLang] = useState<"en" | "id">("en");

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="space-y-6">
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${lang === "en" ? "bg-olivx-purple text-white shadow-[0_0_15px_rgba(108,99,255,0.3)]" : "bg-surface/50 text-text-secondary hover:text-text-primary border border-border/50"}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang("id")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${lang === "id" ? "bg-olivx-purple text-white shadow-[0_0_15px_rgba(108,99,255,0.3)]" : "bg-surface/50 text-text-secondary hover:text-text-primary border border-border/50"}`}
          >
            ID
          </button>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 text-text-secondary leading-relaxed"
          >
            <p className="text-lg">{content[lang].p1}</p>
            <p className="text-lg">{content[lang].p2}</p>
            
            <div className="p-6 rounded-2xl glass border border-border bg-surface/30 hover:border-olivx-purple/30 transition-colors duration-500">
              <h3 className="text-text-primary font-bold mb-2">{content[lang].tech}</h3>
              <p className="text-sm font-mono text-ai-teal/80">Next.js 16, TypeScript, n8n, Supabase, Docker, Linux Architecture.</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass border border-border bg-surface/50 flex items-center justify-center group hover:border-olivx-purple/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(108,99,255,0.1)]">
        <span className="text-text-secondary italic text-lg font-display group-hover:scale-105 transition-transform duration-700">{content[lang].photo}</span>
        {/* Decorative elements */}
        <div className="absolute top-6 right-6 text-xs font-mono text-ai-teal/40 tracking-widest">SHANGHAI ASPIRATIONS</div>
        <div className="absolute bottom-6 left-6 text-xs font-mono text-olivx-purple/40 tracking-widest">EST. SURABAYA</div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
