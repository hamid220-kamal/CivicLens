'use client';

import { useState } from 'react';

interface OperationalQueueIncident {
  id: string;
  type: string;
  severity: string;
  priority: number;
  location: string;
  ward: string;
  time: string;
  status: string;
  citations: number;
  duplicateFlag: string | null;
}

interface OperationalQueueTableProps {
  incidents: OperationalQueueIncident[];
}

export default function OperationalQueueTable({
  incidents,
}: OperationalQueueTableProps) {
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>([]);

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

  const toggleIncident = (id: string) => {
    setSelectedIncidents((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-surface-alt border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                checked={selectedIncidents.length === incidents.length && incidents.length > 0}
                onChange={(e) =>
                  setSelectedIncidents(e.target.checked ? incidents.map((i) => i.id) : [])
                }
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-text-primary">
              Report ID & Issue
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-text-primary">
              Severity
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-text-primary">
              Priority Score
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-text-primary">
              Geolocation / Ward
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-text-primary">
              Time Logged
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-text-primary">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-text-primary">
              Citations
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-text-primary">
              Duplicate Flag
            </th>
            <th className="px-4 py-3 text-right text-sm font-bold text-text-primary">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className={`hover:bg-surface-alt transition-colors ${
                selectedIncidents.includes(incident.id) ? 'bg-surface-alt' : ''
              }`}
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  checked={selectedIncidents.includes(incident.id)}
                  onChange={() => toggleIncident(incident.id)}
                />
              </td>
              <td className="px-4 py-3">
                <div>
                  <p className="font-semibold text-text-primary text-sm">
                    {incident.type}
                  </p>
                  <p className="text-xs text-text-tertiary">#{incident.id}</p>
                </div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold inline-block ${getSeverityBadgeColor(
                    incident.severity
                  )}`}
                >
                  {incident.severity === 'critical' && '⚠️'}
                  {incident.severity === 'high' && '🔴'}
                  {incident.severity === 'medium' && '🟡'}
                  {incident.severity === 'low' && '🟢'}
                  {incident.severity.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 h-5">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm ${
                          i < Math.ceil(incident.priority)
                            ? 'bg-primary'
                            : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-text-primary">
                    {incident.priority.toFixed(1)}/10
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {incident.location}
                  </p>
                  <p className="text-xs text-text-secondary">{incident.ward}</p>
                </div>
              </td>
              <td className="px-4 py-3">
                <p className="text-sm text-text-secondary">{incident.time}</p>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold inline-block ${getStatusBadgeColor(
                    incident.status
                  )}`}
                >
                  {incident.status === 'in_progress' && '▶️'}
                  {incident.status === 'open' && '🔴'}
                  {incident.status === 'in_review' && '🔵'}
                  {incident.status === 'dispatched' && '✅'}
                  {incident.status.replace(/_/g, ' ').toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3">
                <button className="text-primary hover:text-primary-dark font-bold text-sm">
                  ⚖️ {incident.citations} Code
                  {incident.citations > 1 ? 's' : ''}
                </button>
              </td>
              <td className="px-4 py-3">
                {incident.duplicateFlag ? (
                  <span className="px-2 py-1 bg-amber-100 text-warning rounded text-xs font-bold">
                    ⚠️ #{incident.duplicateFlag}
                  </span>
                ) : (
                  <span className="text-xs text-text-tertiary">— None</span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-primary hover:text-primary-dark font-bold text-lg">
                  ⋮
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-text-secondary px-4 py-2 border-t border-border">
        Showing 1 to {incidents.length} of 84 items in queue
      </div>
    </div>
  );
}
