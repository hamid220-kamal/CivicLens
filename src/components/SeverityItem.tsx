/**
 * SeverityItem Component
 * Single severity tier row with icon, label, and description
 */

interface SeverityItemProps {
  severity: 'low' | 'medium' | 'high' | 'critical';
  icon: string;
  description: string;
}

const severityConfig = {
  low: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-900',
    iconColor: 'text-emerald-700',
    badgeBg: 'text-emerald-800',
  },
  medium: {
    bg: 'bg-amber-50',
    text: 'text-amber-950',
    iconColor: 'text-amber-600',
    badgeBg: 'text-amber-900',
  },
  high: {
    bg: 'bg-orange-50',
    text: 'text-orange-950',
    iconColor: 'text-orange-700',
    badgeBg: 'text-orange-900',
  },
  critical: {
    bg: 'bg-red-50',
    text: 'text-red-950',
    iconColor: 'text-red-700',
    badgeBg: 'text-red-900',
  },
};

export default function SeverityItem({ severity, icon, description }: SeverityItemProps) {
  const config = severityConfig[severity];
  const label = severity.charAt(0).toUpperCase() + severity.slice(1);

  return (
    <div className={`flex items-center justify-between p-2.5 rounded-lg ${config.bg} ${config.text}`}>
      <div className="flex items-center gap-2">
        <span className={`material-symbols-outlined text-[18px] ${config.iconColor}`}>
          {icon}
        </span>
        <span className="font-body-md-bold text-body-md">{label}</span>
      </div>
      <span className={`font-label-sm text-[12px] ${config.badgeBg}`}>{description}</span>
    </div>
  );
}
