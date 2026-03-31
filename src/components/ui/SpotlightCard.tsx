"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // Dynamic spotlight color
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  color = "var(--color-primary)", // Default to primary
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth movement
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-[2.5rem] bg-surface/20 border border-border/40 transition-colors duration-500 hover:border-border/60 ${className}`}
    >
      {/* Dynamic Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            600px circle at ${smoothX}px ${smoothY}px,
            ${color}15,
            transparent 40%
          )`,
        }}
      />
      
      {/* Subtle border highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] z-10"
        style={{
          background: `radial-gradient(
            300px circle at ${smoothX}px ${smoothY}px,
            ${color}33,
            transparent 60%
          )`,
          maskImage: `radial-gradient(
            300px circle at ${smoothX}px ${smoothY}px,
            black,
            transparent
          )`,
          WebkitMaskImage: `radial-gradient(
            300px circle at ${smoothX}px ${smoothY}px,
            black,
            transparent
          )`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
