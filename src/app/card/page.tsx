"use client";

import PureCard from "@/components/ui/PureCard";

export default function DigitalCard() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 sm:p-12 relative bg-[--color-base] select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Anti-copy overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none" />
      <div className="relative z-10 w-full max-w-sm">
        <PureCard />
      </div>
    </div>
  );
}
