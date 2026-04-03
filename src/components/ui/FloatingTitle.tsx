"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

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
  const [mounted, setMounted] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const triggerAnimation = useCallback(() => {
    if (!isMini) {
      setIsMini(true);
      onAnimationComplete?.();
    }
  }, [isMini, onAnimationComplete]);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMini(true);
        onAnimationComplete?.();
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      if (window.scrollY > 40 && !isMini) {
        triggerAnimation();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMini, triggerAnimation, onAnimationComplete]);

  if (!mounted) return null;

  // Animation Variants
  const containerVariants = {
    hero: {
      position: "fixed" as const,
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
      backgroundColor: "rgba(0,0,0,0)",
      pointerEvents: "auto" as const,
    },
    mini: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      height: "70px",
      backgroundColor: "rgba(10, 10, 10, 0.98)",
      backdropFilter: "blur(24px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
      pointerEvents: "none" as const,
    }
  };

  const textVariants = {
    hero: {
      scale: isMobile ? 1 : 2.5,
      y: 0,
      opacity: 1,
    },
    mini: {
      scale: 0.5,
      y: 0,
      opacity: 1,
    }
  };

  const subtitleVariants = {
    hero: { opacity: 1, y: 0, scale: 1 },
    mini: { opacity: 0, y: -20, scale: 0.5 }
  };

  // Skip splash on mobile
  const activeVariant = (isMobile || isMini) ? "mini" : "hero";

  return (
    <motion.div
      initial={isMobile ? "mini" : "hero"}
      animate={activeVariant}
      variants={containerVariants}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={triggerAnimation}
      className={`cursor-pointer group`}
    >
      <div className="text-center relative">
        <AnimatePresence>
          {activeVariant === "hero" && subtitle && (
            <motion.p
              variants={subtitleVariants}
              initial="hero"
              animate="hero"
              exit="mini"
              className="text-xs md:text-sm font-mono text-text-muted uppercase tracking-[0.4em] mb-12"
            >
              {subtitle}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.h1
          variants={textVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary tracking-tighter"
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {title}
          {activeVariant === "hero" && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="block text-[10px] font-mono mt-4 uppercase tracking-[0.2em] text-text-muted animate-pulse"
            >
              Scroll or Click to Explore
            </motion.span>
          )}
        </motion.h1>
      </div>
    </motion.div>
  );
}
