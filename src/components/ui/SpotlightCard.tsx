"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // Dynamic spotlight color
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  color = "var(--color-primary)",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth movement
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-[2rem] bg-surface/10 border border-white/5 transition-all duration-700 hover:border-white/20 hover:bg-surface/20 ${className}`}
    >
      {/* Premium Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            500px circle at ${smoothX}px ${smoothY}px,
            ${color}12,
            transparent 70%
          )`,
        }}
      />
      
      {/* Refined border highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(
            250px circle at ${smoothX}px ${smoothY}px,
            ${color}22,
            transparent 80%
          )`,
          maskImage: `radial-gradient(
            250px circle at ${smoothX}px ${smoothY}px,
            black,
            transparent
          )`,
          WebkitMaskImage: `radial-gradient(
            250px circle at ${smoothX}px ${smoothY}px,
            black,
            transparent
          )`,
        }}
      />

      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
