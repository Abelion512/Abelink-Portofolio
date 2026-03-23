"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CreditCard } from "lucide-react";
import { useLangStore } from "@/store/languageStore";
import CardModal from "@/components/ui/CardModal";

export default function AboutPage() {
  const { t } = useLangStore();
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <main className="pt-32 px-6 max-w-5xl mx-auto mb-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl md:text-8xl font-display font-bold mb-12 italic tracking-tight">
          {t('about.title')}
        </h1>
        
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8 space-y-8">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-body leading-relaxed text-[--color-text-primary]"
            >
              {t('about.p1')}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl font-body leading-relaxed text-[--color-text-secondary]"
            >
              {t('about.p2')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-[2.5rem] glass border border-[--color-border]/50 bg-surface/30"
            >
              <h3 className="text-xl font-display font-bold mb-4 text-[--color-text-primary] uppercase tracking-widest text-xs">
                {t('about.tech')}
              </h3>
              <p className="text-lg font-mono text-[--color-accent] leading-relaxed">
                Next.js 16, TypeScript, n8n, Supabase, Docker, Linux Architecture, & AI Automation.
              </p>
            </motion.div>

            {/* VTuber Collaboration Flexing Section */}
            <section className="space-y-8 pt-12 border-t border-border/10">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-display font-bold text-text-primary tracking-tighter italic">
                  {t('about.missions')} <span className="text-gradient">{t('about.missions_v')}</span>
                </h2>
                <p className="text-sm font-mono text-text-muted uppercase tracking-[0.2em]">{t('about.missions_sub')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { name: 'Neon Chronicles', agency: 'Echo X Luna', image: '/logos/vtuber/neon-chronicles.png' },
                  { name: 'Synapse Agency', agency: 'Neural Arts', image: '/logos/vtuber/synapse-agency.png' }
                ].map((collab, i) => (
                  <motion.div
                    key={collab.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="group relative"
                  >
                    <div className="aspect-square rounded-[3rem] overflow-hidden bg-surface/40 border border-white/5 p-2 flex items-center justify-center transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/5">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Image 
                        src={collab.image} 
                        alt={collab.name} 
                        width={400}
                        height={400}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                      />
                    </div>
                    <div className="mt-6 flex justify-between items-start px-2">
                      <div>
                        <h4 className="font-display font-bold text-xl text-text-primary group-hover:text-primary transition-colors">{collab.name}</h4>
                        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mt-1">{collab.agency}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="md:col-span-4 sticky top-32">
            <div className="flex flex-col gap-6">
              <div 
                onClick={() => setIsCardOpen(true)}
                className="aspect-[3/4] rounded-[3rem] overflow-hidden glass border border-[--color-border]/50 bg-surface/50 flex items-center justify-center relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 backdrop-blur-sm">
                   <div className="px-6 py-3 bg-white text-black rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                     <CreditCard size={16} /> {t('about.view_card')}
                   </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsCardOpen(true)}
                className="w-full py-6 rounded-[2rem] border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all flex items-center justify-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <CreditCard size={20} />
                </div>
                <span className="font-bold text-text-primary">{t('about.biz_profile')}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <CardModal isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
    </main>
  );
}
