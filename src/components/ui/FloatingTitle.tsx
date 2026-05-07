"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";


interface FloatingTitleProps {
  title: string;
  subtitle?: string;
}

export default function FloatingTitle({ title, subtitle }: FloatingTitleProps) {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      // Floating Title hanya muncul jika Navbar Page Indicator BELUM terpicu (scroll < 50)
      // ATAU jika di desktop title ini adalah 'Hero Title' yang mengecil.
      // Untuk kepatuhan HIG, kita ingin menghindari dual-title.
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100 && scrollY < 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className="fixed top-24 left-1/2 z-[1100] pointer-events-none"
        >
          <div className="bg-surface/30 backdrop-blur-2xl px-6 py-2 rounded-full border border-white/10 shadow-2xl flex flex-col items-center">
            <span className="text-[10px] font-mono tracking-[0.2em] text-primary uppercase mb-0.5">
              {subtitle || "Current Section"}
            </span>
            <h2 className="text-sm font-bold tracking-tight text-text-primary uppercase font-display">
              {title}
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
