/**
 * ProcessCard Component
 * Single step card for the 4-step process flow
 */

import Icon from '@/components/ui/Icon';

interface ProcessCardProps {
  id: number;
  icon: string;
  title: string;
  description: string;
  cta: string;
  iconBg: string;
  iconColor: string;
}

export default function ProcessCard({
  id,
  icon,
  title,
  description,
  cta,
  iconBg,
  iconColor,
}: ProcessCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform`}>
            <Icon name={icon} size="lg" />
          </div>
          <span className="font-headline-md text-headline-md font-bold text-surface-container-highest select-none">
            {String(id).padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-space-md mt-space-sm flex items-center gap-space-xs text-primary font-label-sm text-label-sm font-semibold">
        <span>{cta}</span>
        <Icon name="chevron_right" size="md" />
      </div>
    </div>
  );
}
