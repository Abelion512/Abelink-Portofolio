"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  /** Enable 3D tilt on hover (default: true) */
  tilt?: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  color = "var(--color-primary)",
  tilt = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 250 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 250 });

  const rotateX = useSpring(useTransform(smoothY, [0, 1], [4, -4]), {
    damping: 25,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(smoothX, [0, 1], [-4, 4]), {
    damping: 25,
    stiffness: 200,
  });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={`relative overflow-hidden rounded-4xl bg-surface/10 border border-white/5 transition-colors duration-700 hover:border-white/20 hover:bg-surface/20 ${className}`}
    >
      {/* Background glow spot */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-14"
        animate={{ opacity: isHovered ? 0.14 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]: number[]) =>
              `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, ${color}, transparent 70%)`
          ),
        }}
      />

      {/* Border highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-4xl z-10"
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]: number[]) =>
              `radial-gradient(250px circle at ${x * 100}% ${y * 100}%, ${color}, transparent 80%)`
          ),
          maskImage: useTransform(
            [smoothX, smoothY],
            ([x, y]: number[]) =>
              `radial-gradient(250px circle at ${x * 100}% ${y * 100}%, black, transparent)`
          ),
          WebkitMaskImage: useTransform(
            [smoothX, smoothY],
            ([x, y]: number[]) =>
              `radial-gradient(250px circle at ${x * 100}% ${y * 100}%, black, transparent)`
          ),
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 h-full w-full"
        animate={tilt ? { y: isHovered ? -4 : 0 } : undefined}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default SpotlightCard;
