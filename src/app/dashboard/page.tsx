'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const kpis = [
    { label: 'Total Reports', value: '1,247', icon: 'report' },
    { label: 'Open', value: '89', icon: 'open', color: 'status-open' },
    { label: 'Critical', value: '12', icon: 'alert', color: 'severity-critical' },
    { label: 'Resolved Today', value: '24', icon: 'check', color: 'status-resolved' },
  ];

  const defaultIncidents = [
    {
      id: 'CV-2024-001234',
      type: 'Pothole',
      severity: 'high',
      priority: 7.8,
      location: 'Main Street & 5th Ave',
      time: '2 hours ago',
      status: 'in_review',
      duplicates: 1,
      image_url: '',
    },
    {
      id: 'CV-2024-001233',
      type: 'Garbage Dump',
      severity: 'medium',
      priority: 5.2,
      location: 'Park Lane',
      time: '4 hours ago',
      status: 'open',
      duplicates: 0,
      image_url: '',
    },
    {
      id: 'CV-2024-001232',
      type: 'Sewer Overflow',
      severity: 'critical',
      priority: 9.1,
      location: 'Elm Street',
      time: '6 hours ago',
      status: 'resolved',
      duplicates: 2,
      image_url: '',
    },
  ];

  const [incidents, setIncidents] = useState(defaultIncidents);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch(`/api/reports?status=${statusFilter}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.reports) && data.reports.length > 0) {
          const mapped = data.reports.map((r: any) => ({
            id: r.id ? r.id.slice(0, 13).toUpperCase() : 'CV-NEW',
            type: r.issue_type
              ? r.issue_type.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
              : 'Civic Issue',
            severity: r.severity || 'medium',
            priority:
              r.severity === 'critical' ? 9.5 : r.severity === 'high' ? 7.8 : r.severity === 'medium' ? 5.2 : 3.0,
            location: r.location?.latitude
              ? `${r.location.latitude.toFixed(4)}, ${r.location.longitude.toFixed(4)}`
              : 'Hyderabad, Telangana',
            time: 'Recently logged',
            status: r.status === 'pending_review' ? 'in_review' : r.status || 'open',
            duplicates: Array.isArray(r.possible_duplicates) ? r.possible_duplicates.length : 0,
            image_url: r.image_url || '',
          }));
          setIncidents(mapped);
        } else if (statusFilter === 'all') {
          setIncidents(defaultIncidents);
        }
      } catch {
        // Keep default sample items on error
      }
    }
    fetchReports();
  }, [statusFilter]);

  const severityColor = (severity: string) => ({
    low: 'bg-green-100 text-severity-low',
    medium: 'bg-amber-100 text-severity-medium',
    high: 'bg-orange-100 text-severity-high',
    critical: 'bg-red-100 text-severity-critical',
  })[severity] || '';

  const statusColor = (status: string) => ({
    open: 'bg-blue-100 text-status-open',
    in_review: 'bg-purple-100 text-status-review',
    resolved: 'bg-green-100 text-status-resolved',
  })[status] || '';

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-16 left-0 z-40 w-64 bg-surface border-r border-border transform transition-transform md:relative md:translate-x-0 md:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
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
          <main className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary mt-1">Manage civic reports and track resolution progress</p>
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

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="bg-surface rounded-lg border border-border p-6">
                  <p className="text-text-secondary text-sm font-semibold mb-2">{kpi.label}</p>
                  <p className="text-3xl font-bold text-text-primary">{kpi.value}</p>
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

                {/* Severity Dropdown */}
                <select className="px-4 py-2 border border-border rounded-lg text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <option>All Severity</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>

                {/* Search */}
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />

                {/* View Toggle */}
                <div className="flex gap-2 ml-auto">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'card' ? 'bg-primary text-white' : 'bg-surface-alt text-text-secondary'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-primary text-white' : 'bg-surface-alt text-text-secondary'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Card View */}
            {viewMode === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {incidents.map((incident) => (
                  <div key={incident.id} className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Thumbnail */}
                    <div className="w-full h-40 bg-background border-b border-border flex items-center justify-center overflow-hidden">
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
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-text-primary">{incident.type}</h3>
                          <p className="text-xs text-text-tertiary">{incident.id}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${severityColor(incident.severity)}`}>
                          {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                        </span>
                      </div>

                      <p className="text-sm text-text-secondary mb-3">{incident.location}</p>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-text-tertiary">{incident.time}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(incident.status)}`}>
                          {incident.status.replace('_', ' ')}
                        </span>
                      </div>

                      {incident.duplicates > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1 mb-3">
                          <p className="text-xs text-warning font-semibold">
                            ⚠ {incident.duplicates} Possible Duplicate{incident.duplicates > 1 ? 's' : ''}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-3 border-t border-border">
                        <button className="flex-1 px-3 py-2 bg-primary text-white rounded text-sm font-semibold hover:bg-primary-dark transition-colors">
                          View
                        </button>
                        <button className="flex-1 px-3 py-2 bg-surface-alt text-text-primary rounded text-sm font-semibold hover:bg-background transition-colors">
                          Assign
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="bg-surface rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-alt border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text-primary">Report</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text-primary">Severity</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text-primary">Priority</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-text-primary">Status</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-text-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {incidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-surface-alt transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-text-primary">{incident.type}</p>
                            <p className="text-xs text-text-tertiary">{incident.id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${severityColor(incident.severity)}`}>
                            {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-end gap-1 w-12">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`flex-1 rounded-t h-4 ${i < Math.ceil(incident.priority) ? 'bg-primary' : 'bg-border'}`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(incident.status)}`}>
                            {incident.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary hover:text-primary-dark font-semibold text-sm">
                            ⋮
                          </button>
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
