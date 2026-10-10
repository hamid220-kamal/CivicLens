'use client';

import { useState } from 'react';
import ComplianceAuditModal from './ComplianceAuditModal';

interface Citation {
  title: string;
  code?: string;
  excerpt: string;
}

interface DispatchIncident {
  id: string;
  type: string;
  severity: string;
  priority: number;
  location: string;
  ward: string;
  time: string;
  timestamp: string;
  status: string;
  photos?: number;
  gps?: string;
  duplicateId?: string;
  duplicateDistance?: number;
  slaBreachIn?: string;
  slaTier?: string;
  notes?: string;
  assignedCrew?: string;
  assignedLead?: string;
  assignedDivision?: string;
  assignedInspector?: string;
  citations: Citation[];
}

interface PriorityDispatchStreamProps {
  incidents: DispatchIncident[];
  onComplianceClick?: (compliance: Citation) => void;
}

export default function PriorityDispatchStream({
  incidents,
  onComplianceClick,
}: PriorityDispatchStreamProps) {
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [selectedCompliance, setSelectedCompliance] = useState<Citation | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'high':
        return 'bg-orange-50 border-orange-200';
      case 'medium':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-severity-critical';
      case 'high':
        return 'bg-orange-100 text-severity-high';
      case 'medium':
        return 'bg-amber-100 text-severity-medium';
      default:
        return 'bg-green-100 text-severity-low';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-status-open';
      case 'open':
        return 'bg-red-100 text-severity-critical';
      case 'in_review':
        return 'bg-purple-100 text-status-review';
      default:
        return 'bg-green-100 text-status-resolved';
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`rounded-lg border-2 p-6 transition-all cursor-pointer ${getSeverityColor(
              incident.severity
            )} hover:shadow-lg`}
            onClick={() =>
              setExpandedIncident(
                expandedIncident === incident.id ? null : incident.id
              )
            }
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex gap-2 items-center mb-2 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getSeverityBadgeColor(
                    incident.severity
                  )}`}>
                    {incident.severity === 'critical' && '⚠️'} {incident.severity.toUpperCase()}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(
                      incident.status
                    )}`}
                  >
                    {incident.status === 'in_progress' && '▶️'}
                    {incident.status === 'open' && '🔴'}
                    {incident.status === 'in_review' && '🔵'}
                    {incident.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-text-primary text-lg mb-1">
                  {incident.type}
                </h3>
                <p className="text-xs text-text-tertiary">
                  {incident.time} • Logged {incident.timestamp}
                </p>
              </div>
              {incident.photos !== undefined && (
                <div className="text-right">
                  <p className="text-xs font-bold text-text-secondary">
                    📷 {incident.photos} {incident.photos === 1 ? 'MP' : 'EXIF'}
                  </p>
                </div>
              )}
            </div>

            {/* Core Details */}
            <div className="space-y-3 mb-4 pb-4 border-b border-current border-opacity-20">
              <div className="flex gap-3 text-sm">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-semibold text-text-primary">
                    {incident.location}
                  </p>
                  <p className="text-xs text-text-secondary">{incident.ward}</p>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <span className="text-lg">📊</span>
                <div>
                  <p className="font-bold text-primary text-lg">
                    {incident.priority.toFixed(1)}
                  </p>
                  <p className="text-xs text-text-secondary">Triage Score</p>
                </div>
              </div>

              {incident.gps && (
                <div className="flex gap-3 text-sm">
                  <span className="text-lg">🗺️</span>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">
                      GPS: {incident.gps}
                    </p>
                  </div>
                </div>
              )}

              {incident.duplicateId && (
                <div className="bg-amber-100 rounded px-3 py-2 flex gap-2 items-start">
                  <span className="text-lg">🔗</span>
                  <div className="text-xs">
                    <p className="font-bold text-warning">
                      Possible Duplicate Detected
                    </p>
                    <p className="text-text-secondary">
                      {incident.duplicateDistance}m spatial offset to existing incident #{incident.duplicateId}
                    </p>
                  </div>
                </div>
              )}

              {incident.slaBreachIn && (
                <div className="bg-red-100 rounded px-3 py-2 flex gap-2 items-start">
                  <span className="text-lg">⏰</span>
                  <div className="text-xs">
                    <p className="font-bold text-severity-critical">
                      SLA Breach in {incident.slaBreachIn}
                    </p>
                    <p className="text-text-secondary">{incident.slaTier}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Assignment */}
            {(incident.assignedCrew || incident.assignedDivision) && (
              <div className="mb-4 p-3 bg-white bg-opacity-50 rounded">
                <p className="text-xs font-bold text-text-primary mb-1">
                  👷 {incident.assignedCrew || incident.assignedDivision}
                </p>
                {incident.assignedLead && (
                  <p className="text-xs text-text-secondary">Lead {incident.assignedLead}</p>
                )}
                {incident.assignedInspector && (
                  <p className="text-xs text-text-secondary">{incident.assignedInspector}</p>
                )}
              </div>
            )}

            {/* Citations */}
            <details className="border-t border-current border-opacity-20 pt-3">
              <summary className="text-xs font-bold text-text-primary cursor-pointer hover:text-primary transition-colors">
                ⚖️ Cited Regulatory Sources ({incident.citations.length})
              </summary>
              <div className="mt-3 space-y-2">
                {incident.citations.map((citation, idx) => (
                  <div
                    key={idx}
                    className="bg-white bg-opacity-50 rounded p-2 text-xs cursor-pointer hover:bg-opacity-75 transition-colors"
                    onClick={() => {
                      setSelectedCompliance(citation);
                      setShowComplianceModal(true);
                      onComplianceClick?.(citation);
                    }}
                  >
                    <p className="font-bold text-text-primary">{citation.title}</p>
                    {citation.code && (
                      <p className="text-xs text-text-secondary">{citation.code}</p>
                    )}
                    <p className="text-text-tertiary italic mt-1">
                      "{citation.excerpt.substring(0, 100)}..."
                    </p>
                  </div>
                ))}
              </div>
            </details>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2 flex-wrap">
              {incident.status === 'open' && (
                <>
                  <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition-colors">
                    🚨 Immediate Dispatch
                  </button>
                  <button className="px-3 py-1.5 bg-warning hover:bg-amber-600 text-white rounded text-xs font-bold transition-colors">
                    🚩 Flag Emergency
                  </button>
                </>
              )}
              <button className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded text-xs font-bold transition-colors">
                📞 Call Merge
              </button>
              <button className="px-3 py-1.5 bg-surface-alt text-text-primary rounded text-xs font-bold hover:bg-background transition-colors">
                👤 Assign Crew
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Audit Modal */}
      {showComplianceModal && selectedCompliance && (
        <ComplianceAuditModal
          compliance={selectedCompliance}
          onClose={() => {
            setShowComplianceModal(false);
            setSelectedCompliance(null);
          }}
        />
      )}
    </>
  );
}
