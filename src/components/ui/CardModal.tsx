"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
// Actually, let's just make a dedicated CardModal content.

export default function CardModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-base/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-surface/40 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="absolute top-6 right-6 z-10">
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-base/50 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="h-[75vh] overflow-y-auto no-scrollbar pt-12">
              <div className="px-8 pb-12 flex flex-col items-center">
                <div className="w-16 h-1 bg-border/40 rounded-full mb-12" />
                
                {/* Re-using Digital Card visual style here directly instead of importing the whole page to avoid layout issues */}
                <div className="w-full">
                    <iframe 
                        src="/card" 
                        className="w-full aspect-[1/1.5] rounded-[2rem] border-none shadow-2xl"
                        title="Digital Card"
                    />
                </div>

                <div className="mt-8 flex gap-4">
                    <a 
                        href="/card" 
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm"
                    >
                        <ExternalLink size={16} /> Open Full View
                    </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
