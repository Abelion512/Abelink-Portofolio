"use client";

import { useState } from 'react';
import VerifiedBadge from './VerifiedBadge';

export default function EasterEggName() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="inline-flex items-center cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="inline-grid [grid-template-areas:'stack'] font-syne text-2xl md:text-3xl font-bold tracking-tight">
        <span 
          className="[grid-area:stack] transition-opacity duration-500"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          Ihsanuddin Salav
        </span>
        <span 
          className="[grid-area:stack] transition-opacity duration-500 pointer-events-none text-blue-400"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          Abelion
        </span>
        {/* Invisible reference to reserve space based on the longest name */}
        <span className="invisible [grid-area:stack] pointer-events-none px-1">
          Ihsanuddin Salav
        </span>
      </div>
      <VerifiedBadge />
    </div>
  );
}
