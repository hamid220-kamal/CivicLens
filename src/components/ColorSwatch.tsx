/**
 * ColorSwatch Component
 * Displays a single color token with accessibility info
 */

interface ColorSwatchProps {
  colorName: string;
  hexCode: string;
  tokenName: string;
  bgClass: string;
  textClass?: string;
  contrastRatio?: string;
  icon?: string;
}

export default function ColorSwatch({
  colorName,
  hexCode,
  tokenName,
  bgClass,
  textClass = 'text-on-surface',
  contrastRatio,
  icon,
}: ColorSwatchProps) {
  return (
    <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col gap-space-xs">
      <div className={`h-14 w-full rounded-lg ${bgClass} flex items-end p-2 justify-between`}>
        {contrastRatio && (
          <span className="font-label-sm text-[10px] text-black/30 bg-black/30 px-1.5 py-0.5 rounded">
            {contrastRatio}
          </span>
        )}
        {icon && (
          <span className={`material-symbols-outlined text-[16px] ${textClass}`}>
            {icon}
          </span>
        )}
      </div>

      <div>
        <div className="font-body-md-bold text-body-md-bold text-on-surface">{colorName}</div>
        <div className="font-body-sm text-body-sm text-on-surface-variant font-mono">{hexCode}</div>
        <div className="font-label-sm text-[11px] text-primary mt-0.5">{tokenName}</div>
      </div>
    </div>
  );
}
