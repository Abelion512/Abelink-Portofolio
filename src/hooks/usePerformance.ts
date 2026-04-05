"use client";

import { useState, useEffect } from "react";

export type PerformanceTier = "low" | "mid" | "high";

interface PerformanceState {
  tier: PerformanceTier;
  isSlowNetwork: boolean;
  prefersReducedMotion: boolean;
  mounted: boolean;
}

export function usePerformance() {
  const [state, setState] = useState<PerformanceState>({
    tier: "mid",
    isSlowNetwork: false,
    prefersReducedMotion: false,
    mounted: false
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as any).connection as NavigatorNetworkInformation | undefined;

    const updateAllInfo = () => {
      const isSlow = conn ? (conn.effectiveType === "2g" || conn.effectiveType === "3g" || conn.saveData) : false;
      const motion = mediaQuery.matches;
      
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      let newTier: PerformanceTier = "mid";

      if (cores <= 2 || memory <= 2) newTier = "low";
      else if (cores >= 8 && memory >= 8) newTier = "high";

      setState({
        mounted: true,
        isSlowNetwork: isSlow,
        prefersReducedMotion: motion,
        tier: newTier
      });
    };

    updateAllInfo();
    mediaQuery.addEventListener("change", updateAllInfo);
    if (conn) conn.addEventListener("change", updateAllInfo);

    return () => {
      mediaQuery.removeEventListener("change", updateAllInfo as any);
      if (conn) conn.removeEventListener("change", updateAllInfo);
    };
  }, []);

  const lowPowerMode = state.mounted && (state.isSlowNetwork || state.tier === "low");

  return {
    ...state,
    lowPowerMode
  };
}
