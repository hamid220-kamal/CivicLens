/**
 * TrustBadge Component
 * Municipal compliance/trust badge for footer strip
 */

interface TrustBadgeProps {
  emoji: string;
  label: string;
  description: string;
}

export default function TrustBadge({ emoji, label, description }: TrustBadgeProps) {
  return (
    <div className="inline-flex items-center gap-space-xs px-3.5 py-2 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm shadow-sm hover:bg-surface-container transition-colors">
      <span>{emoji}</span>
      <span className="font-semibold">{label}</span>
      <span className="text-on-surface-variant">{description}</span>
    </div>
  );
}
