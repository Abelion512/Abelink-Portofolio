"use client";

interface SkeletonProps {
  className?: string;
}

/** Single shimmer block */
export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />;
}

/** Text line placeholder */
export function SkeletonText({ lines = 3, className = "" }: SkeletonProps & { lines?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}

/** Card skeleton matching SpotlightCard shape */
export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`rounded-4xl bg-surface/10 border border-white/5 overflow-hidden ${className}`}>
      {/* Image area */}
      <Skeleton className="aspect-[16/10] !rounded-none" />
      {/* Content area */}
      <div className="p-8 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
        <Skeleton className="h-7 w-3/4" />
        <SkeletonText lines={2} className="!space-y-2" />
      </div>
    </div>
  );
}

/** Grid of skeleton cards (for projects/achievements) */
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/** Full-page skeleton — use as loading fallback */
export function PageSkeleton() {
  return (
    <div className="pt-32 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen space-y-10">
      {/* Title */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-72" />
      </div>
      <SkeletonGrid count={6} />
    </div>
  );
}
