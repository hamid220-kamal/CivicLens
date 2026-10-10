'use client';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-surface rounded-lg border border-border p-6 animate-pulse"
          >
            <div className="h-4 bg-surface-alt rounded mb-3 w-2/3" />
            <div className="h-8 bg-surface-alt rounded w-1/2 mb-2" />
            <div className="h-3 bg-surface-alt rounded w-1/3" />
          </div>
        ))}
      </div>

      {/* Live Sync Status Skeleton */}
      <div className="bg-surface-alt rounded-lg border border-border p-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-2 h-2 bg-surface-alt rounded-full" />
            <div className="h-4 bg-surface-alt rounded w-40" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 bg-surface-alt rounded w-32" />
            <div className="h-8 bg-surface-alt rounded w-40" />
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-surface rounded-lg border border-border p-6 space-y-4 animate-pulse">
        <div className="h-4 bg-surface-alt rounded w-1/4 mb-4" />
        <div className="flex gap-4 flex-wrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-surface-alt rounded w-40" />
          ))}
        </div>
      </div>

      {/* Dispatch Stream Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-surface rounded-lg border border-border p-6 animate-pulse space-y-4"
          >
            <div className="h-6 bg-surface-alt rounded w-3/4" />
            <div className="space-y-3">
              <div className="h-4 bg-surface-alt rounded" />
              <div className="h-4 bg-surface-alt rounded w-5/6" />
              <div className="h-4 bg-surface-alt rounded w-4/5" />
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex gap-2">
                <div className="h-8 bg-surface-alt rounded flex-1" />
                <div className="h-8 bg-surface-alt rounded flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden animate-pulse">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="w-4 h-4 bg-surface-alt rounded" />
              <div className="h-4 bg-surface-alt rounded flex-1" />
              <div className="h-4 bg-surface-alt rounded w-1/6" />
              <div className="h-4 bg-surface-alt rounded w-1/6" />
            </div>
          ))}
        </div>
      </div>

      {/* Pulse animation note */}
      <p className="text-xs text-text-tertiary text-center">
        Pulsing geometry states matching UI components during offline buffering or dispatch network latency.
      </p>
    </div>
  );
}
