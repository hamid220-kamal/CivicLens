/**
 * IncidentCard Component
 * Incident showcase card with image, status badge, and details
 */

import Icon from '@/components/ui/Icon';

interface IncidentCardProps {
  id: string;
  status: 'resolved' | 'inprogress' | 'dispatched';
  statusLabel: string;
  location: string;
  title: string;
  description: string;
  timestamp: string;
  footer: string;
  footerColor: string;
  imageUrl: string;
  imageAlt: string;
}

const statusConfig = {
  resolved: {
    bg: 'bg-surface-container-lowest/90',
    text: 'text-on-surface',
    icon: 'check_circle',
    iconColor: 'text-secondary',
  },
  inprogress: {
    bg: 'bg-secondary-container',
    text: 'text-on-secondary-container',
    icon: 'sync',
    iconColor: 'text-on-secondary-container',
  },
  dispatched: {
    bg: 'bg-surface-container-highest',
    text: 'text-primary',
    icon: 'send',
    iconColor: 'text-primary',
  },
};

export default function IncidentCard({
  id,
  status,
  statusLabel,
  location,
  title,
  description,
  timestamp,
  footer,
  footerColor,
  imageUrl,
  imageAlt,
}: IncidentCardProps) {
  const config = statusConfig[status];

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* Image Section */}
      <div>
        <div className="relative h-48 w-full bg-surface-container-high overflow-hidden">
          <img
            alt={imageAlt}
            className="w-full h-full object-cover"
            src={imageUrl}
          />

          {/* Status Badge */}
          <div className={`absolute top-3 left-3 ${config.bg} backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm ${config.text} font-semibold flex items-center gap-1 shadow`}>
            <Icon name={config.icon} size="sm" className={config.iconColor} />
            <span>{statusLabel}</span>
          </div>

          {/* Case ID */}
          <div className="absolute top-3 right-3 bg-inverse-surface/80 text-surface px-2 py-0.5 rounded-full font-label-sm text-label-sm">
            Case #{id}
          </div>
        </div>

        {/* Content */}
        <div className="p-space-lg flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <Icon name="pin_drop" size="md" />
            <span>{location}</span>
          </div>

          <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>

          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-space-lg pb-space-lg pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
        <span className="inline-flex items-center gap-1">
          <Icon name="schedule" size="md" />
          {timestamp}
        </span>
        <span className={`font-semibold ${footerColor}`}>{footer}</span>
      </div>
    </div>
  );
}
