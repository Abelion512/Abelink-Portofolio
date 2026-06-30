"use client";

import { motion } from "motion/react";
import { X as CloseIcon, ExternalLink, Calendar, Award, ShieldCheck } from "lucide-react";
import { Achievement } from "@/components/sections/AchievementsGrid";
import { useLangStore } from "@/store/languageStore";

interface AchievementModalProps {
  achievement: Achievement;
  onClose: () => void;
}

export default function AchievementModal({ achievement, onClose }: AchievementModalProps) {
  const { t } = useLangStore();

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        layoutId={`card-${achievement.id}`}
        className="relative z-[2100] w-full max-w-5xl bg-surface/80 backdrop-blur-3xl border border-border/50 rounded-4xl overflow-hidden flex flex-col md:flex-row shadow-[0_64px_128px_-16px_rgba(0,0,0,0.8)] my-auto h-fit max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Mobile */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[120] md:hidden p-2 bg-black/50 backdrop-blur-md rounded-full text-white"
        >
          <CloseIcon size={24} />
        </button>

        {/* Left: Image Section (Full Bleed Focus) */}
        <div className="relative w-full md:w-[65%] bg-black flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
          <motion.img
            layoutId={`image-${achievement.id}`}
            src={achievement.image_path?.replace(/^\/?public\//, '/')}
            alt={achievement.title}
            className="w-full h-full object-contain p-4 md:p-6"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[110]" />

          {/* Secure Badge */}
          <div className="absolute top-6 left-6 z-[120] flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/5 text-[10px] font-mono font-bold uppercase tracking-wider text-green-400">
            <ShieldCheck size={12} /> {t('common.secure_preview')}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col border-t md:border-t-0 md:border-l border-white/10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col gap-1">
              <div className="p-3 w-fit rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-2">
                <Award size={24} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary/80">
                {achievement.category || "Professional Certification"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="hidden md:flex p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white transition-colors"
            >
              <CloseIcon size={24} />
            </button>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 tracking-tight">
                {achievement.title}
              </h2>
              <p className="text-text-secondary font-medium">{achievement.issuer}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-border/10">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{t('common.year')}</p>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar size={14} className="text-text-muted" />
                  {achievement.year}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">ID / REF</p>
                <p className="text-xs text-text-secondary font-mono truncate" title={achievement.credential_id}>
                  {achievement.credential_id || "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Description</p>
              <p className="text-sm text-text-secondary/70 leading-relaxed font-body">
                {t('achievements.description')}
              </p>
            </div>
          </div>

          {achievement.url && (
            <div className="mt-8">
              <a
                href={achievement.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 active:scale-[0.98]"
              >
                {t('achievements.verify')} <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
