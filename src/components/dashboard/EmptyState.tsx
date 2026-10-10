'use client';

interface EmptyStateProps {
  onResetFilters?: () => void;
  onRefresh?: () => void;
}

export default function EmptyState({ onResetFilters, onRefresh }: EmptyStateProps) {
  return (
    <div className="bg-surface rounded-lg border border-border p-12 text-center">
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="text-6xl mb-4">✅</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-text-primary mb-2">All Clear</h2>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          No reports in this filter queue
        </p>

        <p className="text-xs text-text-tertiary mb-6 leading-relaxed">
          All citizen submissions in Ward 4 have been triaged and assigned to maintenance crews. New reports will appear here automatically via live dispatch sync.
        </p>

        {/* Info Box */}
        <div className="bg-surface-alt rounded-lg p-4 mb-6 border border-border">
          <p className="text-xs text-text-secondary">
            <span className="font-bold">Automatic heartbeat polling:</span> active every 15s
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col sm:flex-row justify-center">
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors text-sm"
          >
            Reset Filters
          </button>
          <button
            onClick={onRefresh}
            className="px-6 py-2.5 bg-surface-alt hover:bg-background text-text-primary rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2"
          >
            🔄 Refresh Telemetry Stream
          </button>
        </div>
      </div>
    </div>
  );
}
