"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { achievements, AchievementType } from "@/constants/achievements";
import { ExternalLink, X, Plus } from "lucide-react";

export default function AchievementsPage() {
  const [filter, setFilter] = useState<AchievementType | "all">("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredData = achievements.filter((item) =>
    filter === "all" ? true : item.type === filter
  );

  return (
    <main className="pt-32 px-6 max-w-6xl mx-auto mb-24 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold italic mb-4">
            Curated <span className="text-gradient">Achievements</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-xl">
            A continuous journey of learning, certifications, and participations that shape my technical foundation.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {(["all", "certificate", "participation"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full border text-sm transition-all duration-300 capitalize ${
                filter === f
                  ? "bg-primary text-base font-medium border-primary shadow-[0_0_15px_rgba(206,176,112,0.3)]"
                  : "bg-surface/50 border-border text-text-secondary hover:bg-surface hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        layout
      >
        <AnimatePresence>
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="break-inside-avoid relative group rounded-3xl overflow-hidden glass border border-border bg-surface/30 hover:border-olivx-purple/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)]"
            >
              <div 
                className="relative w-full aspect-[4/3] cursor-pointer overflow-hidden bg-surface"
                onClick={() => setSelectedImage(item.image)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Hover overlay with plus icon */}
                <div className="absolute inset-0 bg-base/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30 text-primary">
                    <Plus className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border backdrop-blur-md ${
                    item.type === "certificate" 
                      ? "bg-surface/80 border-primary/30 text-primary" 
                      : "bg-surface/80 border-ai-teal/30 text-ai-teal"
                  }`}>
                    {item.type}
                  </span>
                  {item.featured && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border border-olivx-purple/30 bg-surface/80 text-olivx-purple backdrop-blur-md">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-display group-hover:text-gradient transition-all leading-tight">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-text-secondary text-sm mb-4">
                  Issued by <span className="text-primary font-medium">{item.issuer}</span> • {item.year}
                </p>

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-ai-teal hover:text-ai-teal/80 transition-colors py-1 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-base/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[1.414/1] bg-surface rounded-xl overflow-hidden shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Achievement full view"
                fill
                className="object-contain"
                quality={100}
                priority
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-base/50 hover:bg-base text-primary backdrop-blur-md transition-colors border border-border"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
