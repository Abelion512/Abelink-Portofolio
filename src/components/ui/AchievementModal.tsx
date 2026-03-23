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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
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
        className="relative z-[110] w-full max-w-5xl bg-base border border-border rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        style={{ backgroundColor: 'var(--color-base)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Mobile */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[120] md:hidden p-2 bg-black/50 backdrop-blur-md rounded-full text-white"
        >
          <CloseIcon size={24} />
        </button>

        {/* Left: Image Section */}
        <div className="relative w-full md:w-[60%] bg-neutral-900 flex items-center justify-center p-4 md:p-8 min-h-[300px] md:min-h-[500px]">
          <motion.img
            layoutId={`image-${achievement.id}`}
            src={achievement.image_path}
            alt={achievement.title}
            className="max-w-full max-h-[70vh] object-contain shadow-2xl"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          
          {/* Transparent Overlay (Security) */}
          <div 
            className="absolute inset-0 z-[115] cursor-default" 
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Secure Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/5 text-[10px] font-mono font-bold uppercase tracking-wider text-green-400">
            <ShieldCheck size={12} /> {t('common.secure_preview')}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col border-t md:border-t-0 md:border-l border-white/10">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
              <Award size={24} />
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
              <p className="text-primary font-medium">{achievement.issuer}</p>
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
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{t('common.type')}</p>
                <p className="text-sm text-text-secondary capitalize">{achievement.type}</p>
              </div>
            </div>

            <p className="text-sm text-text-secondary/70 leading-relaxed font-body">
              This certification validates professional expertise and dedication to continuous learning in web technology and AI development.
            </p>
          </div>

          {achievement.url && (
            <div className="mt-8">
              <a
                href={achievement.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
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
