'use client';

import { useState } from 'react';

interface TelemetryAlertProps {
  onRetry?: () => void;
}

export default function TelemetryAlert({ onRetry }: TelemetryAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start justify-between gap-4">
      <div className="flex gap-3 flex-1">
        <div className="text-2xl">⚠️</div>
        <div className="flex-1">
          <h3 className="font-bold text-red-900 mb-1">Telemetry Synchronization Alert</h3>
          <p className="text-sm text-red-800">
            Gateway 503 - Network telemetry synchronization delayed: DPW Central Dispatch Gateway experienced intermittent 503 response. Buffered 2 citizen submissions locally.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onRetry?.()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          🔄 Retry Synchronization
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="p-2 hover:bg-red-100 rounded transition-colors text-red-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
