/**
 * ComplianceAccordion Component
 * Expandable sections for municipal standards and regulatory citations
 */

'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface Regulation {
  id: string;
  title: string;
  agency: string;
  description: string;
  fullText: string;
  tier: 'strict' | 'standard' | 'advisory';
  externalLink?: string;
}

interface ComplianceAccordionProps {
  regulations: Regulation[];
  expandedByDefault?: string;
}

const tierConfig = {
  strict: {
    bg: 'bg-error-container',
    text: 'text-on-error-container',
    badge: 'Strict Enforcement Tier',
  },
  standard: {
    bg: 'bg-secondary-container',
    text: 'text-on-secondary-container',
    badge: 'Standard Compliance',
  },
  advisory: {
    bg: 'bg-surface-container-high',
    text: 'text-on-surface-variant',
    badge: 'Advisory Guidelines',
  },
};

export default function ComplianceAccordion({
  regulations,
  expandedByDefault,
}: ComplianceAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(expandedByDefault || null);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col gap-space-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Compliance Framework
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Municipal Code & Inspection Standards
          </h3>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
          {regulations.length} Applicable Regulations
        </span>
      </div>

      {/* Accordion Items */}
      <div className="flex flex-col gap-space-sm">
        {regulations.map((reg) => {
          const isExpanded = expandedId === reg.id;
          const config = tierConfig[reg.tier];

          return (
            <div key={reg.id} className="rounded-lg bg-surface-container-low transition-all duration-200">
              {/* Accordion Button */}
              <button
                aria-expanded={isExpanded}
                className="w-full px-space-md py-3 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-secondary rounded-lg"
                onClick={() => toggleAccordion(reg.id)}
                type="button"
              >
                <div className="flex items-center gap-space-sm">
                  <Icon name="gavel" size="lg" className="text-primary" />
                  <span className="font-body-md-bold text-body-md-bold text-on-surface">{reg.title}</span>
                </div>
                <Icon
                  name="expand_more"
                  size="lg"
                  className={`text-on-surface-variant transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-space-md pb-space-md flex flex-col gap-2">
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {reg.description}
                  </p>

                  <blockquote className="pl-2.5 py-1 text-on-surface-variant font-body-sm text-[13px] italic bg-surface-container-lowest/60 rounded-md">
                    "{reg.fullText}"
                  </blockquote>

                  <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-col text-on-surface-variant font-label-sm text-[11px]">
                      <span className="text-on-surface-variant">Issuing Authority</span>
                      <span className="text-on-surface font-body-md-bold">{reg.agency}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {reg.externalLink && (
                        <a
                          className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
                          href={reg.externalLink}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span>View Full Standard</span>
                          <Icon name="open_in_new" size="md" />
                        </a>
                      )}

                      <span className={`px-2 py-0.5 rounded-full ${config.bg} ${config.text} font-label-sm text-[11px] font-semibold`}>
                        {config.badge}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
