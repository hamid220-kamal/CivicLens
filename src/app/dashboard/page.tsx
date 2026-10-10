'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface IncidentItem {
  id: string;
  rawId: string;
  type: string;
  severity: string;
  priority: number;
  location: string;
  time: string;
  status: string;
  duplicates: number;
  department: string;
  image_url: string;
  isDemo: boolean;
}

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const defaultIncidents: IncidentItem[] = [
    {
      id: 'CV-2024-001234',
      rawId: 'demo-1',
      type: 'Pothole',
      severity: 'high',
      priority: 7.8,
      location: 'Main Street & 5th Ave',
      time: '2 hours ago',
      status: 'in_review',
      duplicates: 1,
      department: 'GHMC Engineering (Roads)',
      image_url: '',
      isDemo: true,
    },
    {
      id: 'CV-2024-001233',
      rawId: 'demo-2',
      type: 'Garbage Dump',
      severity: 'medium',
      priority: 5.2,
      location: 'Park Lane',
      time: '4 hours ago',
      status: 'open',
      duplicates: 0,
      department: 'GHMC Sanitation',
      image_url: '',
      isDemo: true,
    },
    {
      id: 'CV-2024-001232',
      rawId: 'demo-3',
      type: 'Sewer Overflow',
      severity: 'critical',
      priority: 9.1,
      location: 'Elm Street',
      time: '6 hours ago',
      status: 'resolved',
      duplicates: 2,
      department: 'HMWSSB Drainage',
      image_url: '',
      isDemo: true,
    },
  ];

  const [incidents, setIncidents] = useState<IncidentItem[]>(defaultIncidents);

  // Fetch reports from database
  const fetchReports = async () => {
    try {
      const url = statusFilter === 'all' ? '/api/reports' : `/api/reports?status=${statusFilter}`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && Array.isArray(data.reports) && data.reports.length > 0) {
        const mapped: IncidentItem[] = data.reports.map((r: any) => ({
          id: r.id ? r.id.slice(0, 13).toUpperCase() : 'CV-NEW',
          rawId: r.id || '',
          type: r.issue_type
            ? r.issue_type.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
            : 'Civic Issue',
          severity: r.severity || 'medium',
          priority:
            r.severity === 'critical' ? 9.5 : r.severity === 'high' ? 7.8 : r.severity === 'medium' ? 5.2 : 3.0,
          location: r.location?.latitude
            ? `${r.location.latitude.toFixed(4)}°N, ${r.location.longitude.toFixed(4)}°E`
            : 'Hyderabad, Telangana',
          time: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recently logged',
          status: r.status === 'pending_review' ? 'in_review' : r.status || 'open',
          duplicates: Array.isArray(r.possible_duplicates) ? r.possible_duplicates.length : 0,
          department: r.department_recommendation?.name || 'General Municipal Review',
          image_url: r.image_url || '',
          isDemo: false,
        }));
        setIncidents(mapped);
      } else if (statusFilter === 'all') {
        setIncidents(defaultIncidents);
      } else {
        setIncidents([]);
      }
    } catch {
      // Keep default sample items on error
    }
  };

  useEffect(() => {
    fetchReports();
  }, [statusFilter]);

  // Persist status change to Supabase database
  const handleUpdateStatus = async (rawId: string, newStatus: string) => {
    if (!rawId || rawId.startsWith('demo-')) {
      // Local state update for demo samples
      setIncidents((prev) =>
        prev.map((inc) => (inc.rawId === rawId ? { ...inc, status: newStatus } : inc))
      );
      return;
    }

    setUpdatingId(rawId);
    try {
      const res = await fetch('/api/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: rawId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setIncidents((prev) =>
          prev.map((inc) => (inc.rawId === rawId ? { ...inc, status: newStatus } : inc))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Live calculated KPIs
  const kpis = [
    { label: 'Total Reports', value: incidents.length.toString(), color: 'text-text-primary' },
    {
      label: 'Open / In Review',
      value: incidents.filter((i) => i.status === 'open' || i.status === 'in_review').length.toString(),
      color: 'text-status-open',
    },
    {
      label: 'Critical Severity',
      value: incidents.filter((i) => i.severity === 'critical').length.toString(),
      color: 'text-severity-critical',
    },
    {
      label: 'Resolved',
      value: incidents.filter((i) => i.status === 'resolved').length.toString(),
      color: 'text-status-resolved',
    },
  ];

  const severityColor = (sev: string) =>
    ({
      low: 'bg-green-100 text-severity-low',
      medium: 'bg-amber-100 text-severity-medium',
      high: 'bg-orange-100 text-severity-high',
      critical: 'bg-red-100 text-severity-critical',
    }[sev] || 'bg-amber-100 text-severity-medium');

  const statusColor = (st: string) =>
    ({
      open: 'bg-blue-100 text-status-open',
      in_review: 'bg-purple-100 text-status-review',
      assigned: 'bg-indigo-100 text-indigo-700',
      in_progress: 'bg-amber-100 text-amber-800',
      resolved: 'bg-green-100 text-status-resolved',
    }[st] || 'bg-slate-100 text-slate-700');

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Honest Demo Mode Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
          <span className="font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[10px]">
            Demo Mode
          </span>
          <span>
            <strong>Authority Portal (Evaluation Preview):</strong> Public demo access is enabled. In production, this view is protected by Supabase Auth dispatcher roles. Status updates persist directly to Supabase.
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-16 left-0 z-40 w-64 bg-surface border-r border-border transform transition-transform md:relative md:translate-x-0 md:inset-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="p-6 space-y-2">
            {['Overview', 'Incidents', 'Map', 'Settings'].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-2.5 rounded-lg font-semibold text-text-secondary hover:text-primary hover:bg-surface-alt transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Authority Dashboard</h1>
                <p className="text-text-secondary mt-1">
                  Municipal triage queue with grounded AI recommendations & live duplicate detection
                </p>
              </div>

              {/* Toggle Sidebar Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-surface-alt rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Live KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="bg-surface rounded-lg border border-border p-6 shadow-sm">
                  <p className="text-text-secondary text-sm font-semibold mb-2">{kpi.label}</p>
                  <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-surface rounded-lg border border-border p-4 sm:p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Status Tabs */}
                <div className="flex gap-2 flex-wrap">
                  {['all', 'open', 'in_review', 'resolved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        statusFilter === status
                          ? 'bg-primary text-white'
                          : 'bg-surface-alt text-text-secondary hover:text-primary'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {/* View Toggle */}
                <div className="flex gap-2 ml-auto">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'card' ? 'bg-primary text-white' : 'bg-surface-alt text-text-secondary'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'table' ? 'bg-primary text-white' : 'bg-surface-alt text-text-secondary'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {incidents.length === 0 ? (
              <div className="bg-surface rounded-lg border border-border p-12 text-center text-text-secondary">
                <p className="text-base font-semibold mb-1">No reports matching filter: "{statusFilter}"</p>
                <p className="text-sm text-text-tertiary">All complaints under this category have been handled.</p>
              </div>
            ) : viewMode === 'card' ? (
              /* Card View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {incidents.map((incident) => (
                  <div
                    key={incident.rawId || incident.id}
                    className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail */}
                      <div className="w-full h-44 bg-background border-b border-border flex items-center justify-center overflow-hidden relative">
                        {incident.image_url ? (
                          <img
                            src={incident.image_url}
                            alt={incident.type}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-12 h-12 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        <span
                          className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                            incident.isDemo ? 'bg-slate-700 text-white' : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {incident.isDemo ? 'Demo Sample' : 'Live Supabase Record'}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-text-primary text-base">{incident.type}</h3>
                            <p className="text-xs font-mono text-text-tertiary">{incident.id}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${severityColor(incident.severity)}`}>
                            {incident.severity.toUpperCase()}
                          </span>
                        </div>

                        <p className="text-xs text-text-secondary mb-1">
                          <strong>Dept:</strong> {incident.department}
                        </p>
                        <p className="text-xs text-text-tertiary mb-3">{incident.location}</p>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-text-tertiary">{incident.time}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(incident.status)}`}>
                            {incident.status.replace('_', ' ')}
                          </span>
                        </div>

                        {incident.duplicates > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded px-2.5 py-1 mb-3">
                            <p className="text-xs text-amber-900 font-semibold">
                              ⚠ {incident.duplicates} nearby duplicate report{incident.duplicates > 1 ? 's' : ''} detected
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions & Status Dropdown */}
                    <div className="p-4 pt-0 border-t border-border mt-2 pt-3 bg-surface">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={`/track?id=${incident.rawId}`}
                          className="px-3 py-1.5 bg-surface-alt hover:bg-background border border-border text-text-primary rounded text-xs font-semibold text-center"
                        >
                          View Details
                        </Link>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-text-secondary font-medium">Status:</span>
                          <select
                            value={incident.status}
                            disabled={updatingId === incident.rawId}
                            onChange={(e) => handleUpdateStatus(incident.rawId, e.target.value)}
                            className="text-xs px-2 py-1 border border-border rounded bg-surface font-semibold text-text-primary focus:ring-1 focus:ring-primary"
                          >
                            <option value="pending_review">Under Review</option>
                            <option value="assigned">Assigned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Table View */
              <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-surface-alt border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-text-primary uppercase">Report / ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-text-primary uppercase">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-text-primary uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-text-primary uppercase">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-text-primary uppercase">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {incidents.map((incident) => (
                      <tr key={incident.rawId || incident.id} className="hover:bg-surface-alt transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-text-primary text-sm">{incident.type}</p>
                            <p className="text-xs font-mono text-text-tertiary">{incident.id}</p>
                            <span className="text-[10px] text-primary">{incident.isDemo ? '[Demo Sample]' : '[Live]'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${severityColor(incident.severity)}`}>
                            {incident.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-text-secondary">
                          {incident.department}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor(incident.status)}`}>
                            {incident.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            value={incident.status}
                            disabled={updatingId === incident.rawId}
                            onChange={(e) => handleUpdateStatus(incident.rawId, e.target.value)}
                            className="text-xs px-2 py-1 border border-border rounded bg-surface font-semibold text-text-primary focus:ring-1 focus:ring-primary"
                          >
                            <option value="pending_review">Under Review</option>
                            <option value="assigned">Assigned</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
