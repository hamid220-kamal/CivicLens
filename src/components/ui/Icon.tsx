/**
 * Icon Component - Material Symbols Outlined
 * Reusable icon wrapper using Material Symbols font
 */

interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  filled?: boolean;
  weight?: number;
  grade?: number;
}

const sizeMap = {
  sm: 'text-[16px]',
  md: 'text-[20px]',
  lg: 'text-[24px]',
  xl: 'text-[28px]',
};

export default function Icon({
  name,
  className = '',
  size = 'md',
  filled = false,
  weight = 400,
  grade = 0,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${sizeMap[size]} ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}`,
      }}
    >
      {name}
    </span>
  );
}
