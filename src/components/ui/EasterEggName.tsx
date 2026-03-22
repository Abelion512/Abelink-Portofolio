"use client";

import { useState } from 'react';

export default function EasterEggName() {
  const [hovered, setHovered] = useState(false);
  
  return (
    <span 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      className="cursor-default select-none transition-all duration-200 underline decoration-primary/20 underline-offset-8"
      title={hovered ? 'also known as Abelion' : undefined}
    >
      {hovered ? 'Abelion' : 'Ihsanuddin Salav'}
    </span>
  );
}
