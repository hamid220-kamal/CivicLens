/**
 * TypographySpecimen Component
 * Single typography scale row with label, specs, and specimen
 */

interface TypographySpecimenProps {
  label: string;
  size: string;
  weight: string;
  specimen: string;
  className: string;
}

export default function TypographySpecimen({
  label,
  size,
  weight,
  specimen,
  className,
}: TypographySpecimenProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center text-on-surface-variant">
        <span className="font-label-sm text-[11px] uppercase tracking-wider">{label}</span>
        <span className="font-label-sm text-[11px] font-mono">
          {size} · {weight}
        </span>
      </div>
      <div className={className}>{specimen}</div>
    </div>
  );
}
