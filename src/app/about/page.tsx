"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLangStore } from "@/store/languageStore";
import CardModal from "@/components/ui/CardModal";
import MediaPopup from "@/components/ui/MediaPopup";
import FloatingTitle from "@/components/ui/FloatingTitle";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function AboutPage() {
  const { t } = useLangStore();
  const [isReady, setIsReady] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{
    src: string;
    alt: string;
    isVideo: boolean;
  } | null>(null);

  const vtuberCollabs = [
    {
      name: "Neon Chronicles",
      agency: "Echo X Luna",
      image: "/logos/vtuber/neon-chronicles.png",
      isVideo: false,
    },
    {
      name: "Synapse Agency",
      agency: "Neural Arts",
      image: "/logos/vtuber/synapse-agency.png",
      isVideo: false,
    },
    {
      name: "Ah Yu-jin",
      agency: "IVE",
      image: "/Addictions/Ah_Yu-jin.mp4",
      isVideo: true,
    },
  ];

  return (
    <>
      <FloatingTitle
        title={t("about.title")}
        subtitle={t("about.missions_sub")}
        onAnimationComplete={() => setIsReady(true)}
      />

      <main className="relative z-10 pt-36 md:pt-32 px-4 sm:px-6 max-w-7xl mx-auto mb-16 sm:mb-24 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Main Content Section */}
          <section className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-text-primary leading-relaxed font-light">
                  {t("about.p1")}
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {t("about.p2")}
                </p>
              </div>

              {/* Tech Core Highlight */}
              <SpotlightCard className="p-8 group" color="rgba(var(--color-primary-rgb), 0.15)">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.4em]">
                      {t("about.techcore")}
                    </h3>
                    <p className="text-xl font-display font-bold text-text-primary mt-2">
                      Mastering the Digital Architecture
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {["Next.js 16", "TypeScript", "n8n", "Supabase", "Docker", "Linux"].map((item) => (
                      <span key={item} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-text-muted hover:border-primary/30 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </div>

            <div className="lg:col-span-4 self-stretch">
               {/* Decorative card or additional info placeholder */}
               <div className="h-full rounded-[3rem] bg-linear-to-b from-primary/5 to-transparent border border-primary/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                  <div className="p-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-display font-bold text-text-primary mb-4">Driving innovation through AI & Code</h4>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted font-mono leading-relaxed italic">
                        "Constant learning is the only way to navigate the evolving digital horizon."
                      </p>
                    </div>
                  </div>
               </div>
            </div>
          </section>

          {/* VTuber Collaboration Section */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">{t("about.missions_sub")}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
                  {t("about.missions")}{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">
                    {t("about.missions_v")}
                  </span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {vtuberCollabs.map((collab, i) => (
                <motion.div
                  key={collab.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  className="group relative cursor-pointer"
                  onClick={() =>
                    setSelectedMedia({
                      src: collab.image,
                      alt: collab.name,
                      isVideo: collab.isVideo,
                    })
                  }
                >
                  <div className="aspect-square relative rounded-[2.5rem] overflow-hidden bg-surface/40 border border-white/5 p-2 transition-all duration-700 group-hover:border-primary/40 group-hover:shadow-[0_20px_50px_rgba(var(--color-primary-rgb),0.15)] group-hover:-translate-y-2">
                    <div className="absolute inset-0 bg-linear-to-t from-base via-transparent to-transparent opacity-80 z-10 pointer-events-none group-hover:opacity-40 transition-opacity" />
                    
                    {collab.isVideo ? (
                      <video
                        src={collab.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    ) : (
                      <Image
                        src={collab.image}
                        alt={collab.name}
                        width={800}
                        height={800}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        unoptimized
                      />
                    )}

                    <div className="absolute bottom-10 left-10 right-10 z-20">
                      <h4 className="font-display font-bold text-2xl text-white tracking-tight group-hover:text-primary transition-colors">
                        {collab.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-4 h-px bg-primary/50" />
                        <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">
                          {collab.agency}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </main>

      <MediaPopup
        isOpen={!!selectedMedia}
        onCloseAction={() => setSelectedMedia(null)}
        src={selectedMedia?.src || ""}
        alt={selectedMedia?.alt || ""}
        isVideo={selectedMedia?.isVideo || false}
      />
    </>
  );
}
