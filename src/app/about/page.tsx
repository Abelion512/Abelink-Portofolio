"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLangStore } from "@/store/languageStore";
import CardModal from "@/components/ui/CardModal";
import MediaPopup from "@/components/ui/MediaPopup";

export default function AboutPage() {
  const { t } = useLangStore();
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{
    src: string;
    alt: string;
    isVideo: boolean;
  } | null>(null);

  return (
    <main className="pt-16 px-4 sm:px-6 max-w-5xl mx-auto mb-16 sm:mb-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Centered Header with Scroll Animation */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono text-text-muted uppercase tracking-[0.2em] mb-4"
          >
            {t("about.missions_sub")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-6"
          >
            {t("about.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg max-w-2xl mx-auto"
          >
            {t("about.p1")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8 space-y-8">
            {/* Tech Stack Card - Compact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-3xl glass border border-[--color-border]/50 bg-surface/30"
            >
              <h3 className="text-xs font-display font-bold mb-3 text-[--color-text-primary] uppercase tracking-widest">
                {t("about.tech")}
              </h3>
              <p className="text-sm font-mono text-[--color-accent] leading-relaxed">
                Next.js 16, TypeScript, n8n, Supabase, Docker, Linux
                Architecture, & AI Automation.
              </p>
            </motion.div>

            {/* VTuber Collaboration Flexing Section */}
            <section className="space-y-6 pt-8 border-t border-border/10">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tighter italic">
                  {t("about.missions")}{" "}
                  <span className="text-gradient">{t("about.missions_v")}</span>
                </h2>
                <p className="text-xs font-mono text-text-muted uppercase tracking-[0.2em]">
                  {t("about.missions_sub")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
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
                ].map((collab, i) => (
                  <motion.div
                    key={collab.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="group relative cursor-pointer"
                    onClick={() =>
                      setSelectedMedia({
                        src: collab.image,
                        alt: collab.name,
                        isVideo: collab.isVideo,
                      })
                    }
                  >
                    <div className="aspect-video rounded-[3rem] overflow-hidden bg-surface/40 border border-white/5 p-2 flex items-center justify-center transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/5">
                      {/* Gradient Overlay for Better Text Contrast */}
                      <div className="absolute inset-0 bg-linear-to-t from-base/80 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {collab.isVideo ? (
                        <video
                          src={collab.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                        />
                      ) : (
                        <Image
                          src={collab.image}
                          alt={collab.name}
                          width={1920}
                          height={1080}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="mt-6 flex justify-between items-start px-2 relative z-20">
                      <div>
                        <h4 className="font-display font-bold text-xl text-white drop-shadow-lg group-hover:text-primary transition-colors">
                          {collab.name}
                        </h4>
                        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mt-1 drop-shadow">
                          {collab.agency}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>

      <CardModal
        isOpen={isCardOpen}
        onCloseAction={() => setIsCardOpen(false)}
      />
      <MediaPopup
        isOpen={!!selectedMedia}
        onCloseAction={() => setSelectedMedia(null)}
        src={selectedMedia?.src || ""}
        alt={selectedMedia?.alt || ""}
        isVideo={selectedMedia?.isVideo || false}
      />
    </main>
  );
}
