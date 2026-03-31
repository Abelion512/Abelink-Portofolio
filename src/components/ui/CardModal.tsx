"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import PureCard from "./PureCard";

export default function CardModal({
  isOpen,
  onCloseAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseAction}
            className="absolute inset-0 bg-base/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-transparent rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onCloseAction}
                className="w-9 h-9 rounded-full bg-base/50 backdrop-blur-md flex items-center justify-center text-text-muted hover:text-text-primary transition-colors border border-border/50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <PureCard />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
