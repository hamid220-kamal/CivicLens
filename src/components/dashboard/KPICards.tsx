'use client';

interface KPICard {
  label: string;
  value: string;
  trend?: string;
  trendPeriod?: string;
  subtext?: string;
  icon: string;
}

interface KPICardsProps {
  kpis: KPICard[];
}

export default function KPICards({ kpis }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-start justify-between mb-3">
            <p className="text-text-secondary text-sm font-semibold">{kpi.label}</p>
            <span className="text-2xl">{kpi.icon}</span>
          </div>
          
          <div className="mb-3">
            <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
            {kpi.trend && (
              <p className="text-xs text-status-resolved font-semibold mt-1">
                {kpi.trend} {kpi.trendPeriod}
              </p>
            )}
          </div>

          {kpi.subtext && (
            <p className="text-xs text-text-tertiary">{kpi.subtext}</p>
          )}
        </div>
      ))}
    </div>
  );
}
