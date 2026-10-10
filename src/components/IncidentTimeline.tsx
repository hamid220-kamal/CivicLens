/**
 * IncidentTimeline Component
 * Vertical audit trail showing incident lifecycle from submission to resolution
 */

import Icon from '@/components/ui/Icon';

interface TimelineEvent {
  id: number;
  status: 'completed' | 'active' | 'pending';
  title: string;
  timestamp: string;
  description: string;
  details?: string;
  metadata?: Array<{ label: string; value: string }>;
}

interface IncidentTimelineProps {
  events: TimelineEvent[];
}

export default function IncidentTimeline({ events }: IncidentTimelineProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col gap-space-lg">
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Audit Trail
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Incident Lifecycle & Dispatch Progress
          </h2>
        </div>
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full">
          <Icon name="verified" size="md" />
          <span>Cryptographic Audit Log</span>
        </div>
      </div>

      {/* Vertical Timeline */}
      <ol aria-label="Incident timeline stages" className="relative flex flex-col gap-space-md ml-3">
        {events.map((event, index) => {
          const isCompleted = event.status === 'completed';
          const isActive = event.status === 'active';
          const isPending = event.status === 'pending';
          const isLastEvent = index === events.length - 1;

          return (
            <li key={event.id} className="relative flex items-start gap-space-md">
              {/* Connector Line */}
              {!isLastEvent && (
                <div
                  className={`absolute left-4 top-8 -bottom-6 w-0.5 ${
                    isCompleted || isActive ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                ></div>
              )}

              {/* Timeline Dot */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm ${
                  isCompleted
                    ? 'bg-primary text-on-primary'
                    : isActive
                      ? 'bg-primary-container text-on-primary ring-4 ring-primary-fixed'
                      : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {isCompleted ? (
                  <Icon name="check" size="sm" />
                ) : isActive ? (
                  <Icon name="sync" size="sm" className="animate-spin" />
                ) : (
                  <Icon name="task_alt" size="sm" />
                )}
              </div>

              {/* Event Content */}
              <div className={`flex flex-col gap-1 w-full pt-0.5 ${isActive ? 'bg-surface-container-low p-space-md rounded-xl' : ''}`}>
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-body-md-bold text-body-md-bold text-on-surface">{event.title}</span>
                  <time className="font-label-sm text-label-sm text-on-surface-variant">{event.timestamp}</time>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant">{event.description}</p>

                {event.details && (
                  <div className="rounded-lg bg-surface-container-lowest p-3 flex items-start gap-space-sm shadow-sm mt-2">
                    <Icon name="construction" size="lg" className="text-secondary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                        Field Dispatch Status Note
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface italic">{event.details}</span>
                    </div>
                  </div>
                )}

                {event.metadata && event.metadata.length > 0 && (
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {event.metadata.map((meta, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]"
                      >
                        <Icon name="fingerprint" size="sm" />
                        {meta.label}: {meta.value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
