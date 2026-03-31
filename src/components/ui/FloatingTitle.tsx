"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface FloatingTitleProps {
  title: string;
  subtitle?: string;
  onAnimationComplete?: () => void;
}

export default function FloatingTitle({
  title,
  subtitle,
  onAnimationComplete,
}: FloatingTitleProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    const handleScroll = () => {
      // Mark as animated once user scrolls
      if (window.scrollY > 50 && !isAnimated) {
        setIsAnimated(true);
        onAnimationComplete?.();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAnimated, onAnimationComplete]);

  // No animation on mobile - just show at position
  if (isMobile) {
    return (
      <div className="pt-20 px-4 text-center mb-8">
        {subtitle && (
          <p className="text-xs font-mono text-text-muted uppercase tracking-[0.3em] mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl font-display font-bold text-text-primary">
          {title}
        </h1>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 2, y: 0 }}
      animate={{
        opacity: 1,
        scale: isAnimated ? 1 : 2,
        y: isAnimated ? -600 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2,
      }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div className="text-center">
        {subtitle && (
          <p className="text-sm md:text-base font-mono text-text-muted uppercase tracking-[0.3em] mb-4">
            {subtitle}
          </p>
        )}

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-text-primary">
          {title}
        </h1>
      </div>
    </motion.div>
  );
}
