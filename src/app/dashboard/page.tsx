'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TelemetryAlert from '@/components/dashboard/TelemetryAlert';
import PriorityDispatchStream from '@/components/dashboard/PriorityDispatchStream';
import OperationalQueueTable from '@/components/dashboard/OperationalQueueTable';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import KPICards from '@/components/dashboard/KPICards';
import LoadingSkeleton from '@/components/dashboard/LoadingSkeleton';
import EmptyState from '@/components/dashboard/EmptyState';
import ComplianceAuditModal from '@/components/dashboard/ComplianceAuditModal';

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [selectedCompliance, setSelectedCompliance] = useState<any>(null);

  // Baseline incidents from Syed's mockup
  const defaultPriorityIncidents = [
    {
      id: 'CV-2024-9182',
      type: 'Deep Roadway Pothole (Grade 3)',
      severity: 'critical',
      priority: 8.4,
      location: '5th Ave & Elm St',
      ward: 'Ward 4 Transit Corridor',
      time: '18 mins ago',
      timestamp: '14:28 EST',
      status: 'in_progress',
      photos: 1,
      gps: '17.4399°N, 78.4983°E',
      duplicateId: 'CV-2024-9179',
      duplicateDistance: 18,
      assignedCrew: 'DPW Ward 4 Crew Bravo',
      assignedLead: 'M. Vance',
      citations: [
        {
          title: 'FHWA Pothole Severity Index § 4.2',
          code: 'Code P-2',
          excerpt:
            'Depressions exceeding 2 inches in depth located directly within vehicular wheel paths mandate priority dispatch code P-2 within 48 hours.',
        },
        {
          title: 'GHMC Citizen Charter — Road Maintenance & Potholes',
          code: 'Transit Route',
          excerpt:
            'Potholes and road surface damage must be inspected and scheduled for rectification under municipal road maintenance standards.',
        },
      ],
    },
    {
      id: 'CV-2024-9190',
      type: 'Storm Drain Backflow & Flooding',
      severity: 'critical',
      priority: 9.2,
      location: 'Cloverly Blvd & 12th Way',
      ward: 'Ward 4 Underpass',
      time: '42 mins ago',
      timestamp: '14:04 EST',
      status: 'open',
      photos: 0,
      gps: 'Sensor ID: ST-W4-09',
      slaBreachIn: '1h 18m',
      slaTier: 'Drainage Tier 1',
      citations: [
        {
          title: 'Clean Water Act Municipal Sec. 402(p)',
          excerpt:
            'Runoff discharge obstructions in grade separation subways necessitate rapid mitigation to avert toxic vehicular contamination runoff.',
        },
      ],
    },
    {
      id: 'CV-2024-9165',
      type: 'Streetlight Luminaire Circuit Outage',
      severity: 'medium',
      priority: 6.1,
      location: 'Park Ave & 9th St Crosswalk',
      ward: 'Ward 4 Crosswalk',
      time: '2 hours ago',
      timestamp: '12:45 EST',
      status: 'in_review',
      photos: 1,
      notes:
        'Automatic photocell sensor failure suspected across 3 adjacent mast arms. Crosswalk safety beacon remains operational.',
      assignedDivision: 'Division of Street Lighting',
      assignedInspector: 'Inspector Assigned',
      citations: [
        {
          title: 'Municipal Code: § 22-108',
          code: 'Pedestrian Visibility Zone',
          excerpt:
            'Pedestrian visibility zones require proper illumination and signaling to ensure public safety at crosswalks.',
        },
      ],
    },
  ];

  const defaultOperationalQueue = [
    {
      id: 'CV-2024-9182',
      type: 'Deep Roadway Pothole (Grade 3)',
      severity: 'critical',
      priority: 8.4,
      location: '5th Ave & Elm St',
      ward: 'Ward 4 (Transit Corridor)',
      time: '18m ago',
      status: 'in_progress',
      citations: 2,
      duplicateFlag: 'CV-9179',
    },
    {
      id: 'CV-2024-9190',
      type: 'Storm Drain Backflow & Flooding',
      severity: 'critical',
      priority: 9.2,
      location: 'Cloverly Blvd & 12th Way',
      ward: 'Ward 4 Underpass',
      time: '42m ago',
      status: 'open',
      citations: 1,
      duplicateFlag: null,
    },
    {
      id: 'CV-2024-9165',
      type: 'Streetlight Luminaire Circuit Outage',
      severity: 'medium',
      priority: 6.1,
      location: 'Park Ave & 9th St',
      ward: 'Ward 4 Crosswalk',
      time: '2h ago',
      status: 'in_review',
      citations: 1,
      duplicateFlag: null,
    },
    {
      id: 'CV-2024-9154',
      type: 'Traffic Signal Timing Desynchronization',
      severity: 'high',
      priority: 7.5,
      location: 'Grand Ave & Central Expressway',
      ward: 'Ward 4 Interchange',
      time: '3h 10m ago',
      status: 'in_review',
      citations: 1,
      duplicateFlag: null,
    },
    {
      id: 'CV-2024-9140',
      type: 'Commercial Waste Container Spillage',
      severity: 'low',
      priority: 3.8,
      location: 'Market Alley & 3rd St',
      ward: 'Ward 4 Commercial',
      time: '4h 35m ago',
      status: 'dispatched',
      citations: 1,
      duplicateFlag: null,
    },
  ];

  const [priorityIncidents, setPriorityIncidents] = useState(defaultPriorityIncidents);
  const [operationalQueue, setOperationalQueue] = useState(defaultOperationalQueue);
  const [liveReportCount, setLiveReportCount] = useState<number>(0);

  // Fetch live reports from Supabase backend
  useEffect(() => {
    async function loadLiveReports() {
      try {
        const url = statusFilter === 'all' ? '/api/reports' : `/api/reports?status=${statusFilter}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.reports) && data.reports.length > 0) {
          setLiveReportCount(data.reports.length);

          // Map live database reports into Syed's PriorityDispatchStream format
          const liveDispatchItems = data.reports.map((r: any) => ({
            id: r.id ? r.id.slice(0, 13).toUpperCase() : 'CV-LIVE',
            type: r.issue_type
              ? r.issue_type.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
              : 'Reported Issue',
            severity: r.severity || 'medium',
            priority:
              r.severity === 'critical' ? 9.5 : r.severity === 'high' ? 7.8 : r.severity === 'medium' ? 5.2 : 3.0,
            location: r.location?.latitude
              ? `${r.location.latitude.toFixed(4)}°N, ${r.location.longitude.toFixed(4)}°E`
              : 'Hyderabad Municipal Area',
            ward: `Zone: ${r.department_recommendation?.name || 'GHMC Central'}`,
            time: 'Recently logged',
            timestamp: r.created_at ? new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Verified',
            status: r.status || 'open',
            photos: r.image_url ? 1 : 0,
            gps: r.location?.latitude ? `${r.location.latitude.toFixed(4)}°N, ${r.location.longitude?.toFixed(4)}°E` : undefined,
            duplicateId: r.possible_duplicates && r.possible_duplicates.length > 0 ? r.possible_duplicates[0].report_id.slice(0, 8) : undefined,
            duplicateDistance: r.possible_duplicates && r.possible_duplicates.length > 0 ? r.possible_duplicates[0].distance_meters : undefined,
            assignedDivision: r.department_recommendation?.name || 'Municipal Review',
            citations: Array.isArray(r.evidence)
              ? r.evidence.map((e: any) => ({
                  title: e.source_title || 'Service Delivery Standard',
                  excerpt: e.excerpt || '',
                }))
              : [],
          }));

          // Map live database reports into Syed's OperationalQueueTable format
          const liveQueueItems = data.reports.map((r: any) => ({
            id: r.id ? r.id.slice(0, 13).toUpperCase() : 'CV-LIVE',
            type: r.issue_type
              ? r.issue_type.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
              : 'Reported Issue',
            severity: r.severity || 'medium',
            priority:
              r.severity === 'critical' ? 9.5 : r.severity === 'high' ? 7.8 : r.severity === 'medium' ? 5.2 : 3.0,
            location: r.location?.latitude
              ? `${r.location.latitude.toFixed(4)}°N, ${r.location.longitude.toFixed(4)}°E`
              : 'Hyderabad Central',
            ward: r.department_recommendation?.name || 'GHMC Central',
            time: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Today',
            status: r.status || 'open',
            citations: Array.isArray(r.evidence) ? r.evidence.length : 0,
            duplicateFlag: r.possible_duplicates && r.possible_duplicates.length > 0 ? r.possible_duplicates[0].report_id.slice(0, 8) : null,
          }));

          // Prepend live items so new user reports are immediately prominent
          setPriorityIncidents([...liveDispatchItems, ...defaultPriorityIncidents]);
          setOperationalQueue([...liveQueueItems, ...defaultOperationalQueue]);
        }
      } catch (err) {
        console.warn('Dashboard live reports fetch notice:', err);
      }
    }

    loadLiveReports();
  }, [statusFilter]);

  const kpis = [
    { label: 'Total Reports', value: `${1248 + liveReportCount}`, trend: '+14%', trendPeriod: 'vs last week', icon: 'inbox' },
    { label: 'Open / In Queue', value: `${84 + liveReportCount}`, subtext: `${38 + liveReportCount} awaiting inspection, 46 dispatched`, icon: 'pending_actions' },
    { label: 'Critical Hazards', value: '12', subtext: '3 within 2h of SLA deadline', icon: 'priority_high' },
    { label: 'Resolved Today', value: '47', subtext: '↑ +9 above daily quota, 98.2% photo verified', icon: 'task_alt' },
  ];

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Honest Demo Mode Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[10px]">
            Demo Mode
          </span>
          <span>
            <strong>Authority Portal (Evaluation Preview):</strong> Public demo access is enabled. In production, this console is protected by Supabase Auth staff roles. Live citizen reports appear dynamically in the queue below.
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
            {[
              { label: 'Dashboard', icon: '📊' },
              { label: 'Incidents', icon: '📋' },
              { label: 'Map', icon: '🗺️' },
              { label: 'Settings', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full text-left px-4 py-2.5 rounded-lg font-semibold text-text-secondary hover:text-primary hover:bg-surface-alt transition-colors flex items-center gap-3"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Incident Triage & Dispatch Console</h1>
                <p className="text-text-secondary mt-1">
                  Live telemetric queue for Public Works & Infrastructure Dispatch. Integrated with multimodal AI and statutory municipal compliance standards.
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

            {/* Telemetry Alert */}
            {!isOnline && <TelemetryAlert onRetry={() => setIsOnline(true)} />}

            {/* Show Loading Skeleton */}
            {isLoading && <LoadingSkeleton />}

            {/* Show Empty State */}
            {showEmptyState && !isLoading && (
              <EmptyState
                onResetFilters={() => {
                  setStatusFilter('all');
                  setSeverityFilter('all');
                  setCategoryFilter('all');
                  setSortBy('priority');
                  setShowEmptyState(false);
                }}
                onRefresh={() => setShowEmptyState(false)}
              />
            )}

            {/* Normal Content */}
            {!isLoading && !showEmptyState && (
              <>
                {/* Live Sync Status */}
                <div className="bg-surface-alt rounded-lg border border-border p-4 mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-status-resolved rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-text-secondary">
                      Live Sync ({liveReportCount > 0 ? `${liveReportCount} live DB reports connected` : 'Active'})
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                      📥 Export CSV / GIS
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors flex items-center gap-2">
                      ⊕ + Manual Incident Entry
                    </button>
                  </div>
                </div>

                {/* KPI Cards */}
                <KPICards kpis={kpis} />

                {/* View and Filter Controls */}
                <div className="bg-surface rounded-lg border border-border p-4 sm:p-6 mb-8">
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <h2 className="text-lg font-bold text-text-primary">Priority Dispatch Stream</h2>
                      <button className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors">
                        {priorityIncidents.length} Highlighted Orders
                      </button>
                    </div>
                    <p className="text-sm text-text-secondary">Real-time telemetric updates active</p>
                  </div>

                  {/* Filters */}
                  <DashboardFilters
                    statusFilter={statusFilter}
                    severityFilter={severityFilter}
                    categoryFilter={categoryFilter}
                    sortBy={sortBy}
                    onStatusChange={setStatusFilter}
                    onSeverityChange={setSeverityFilter}
                    onCategoryChange={setCategoryFilter}
                    onSortChange={setSortBy}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                  />
                </div>

                {/* Priority Dispatch Stream */}
                <PriorityDispatchStream
                  incidents={priorityIncidents}
                  onComplianceClick={(compliance) => {
                    setSelectedCompliance(compliance);
                    setShowComplianceModal(true);
                  }}
                />

                {/* Operational Queue Section */}
                <div className="bg-surface rounded-lg border border-border p-6 mt-8">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <h2 className="text-lg font-bold text-text-primary">Operational Queue Table</h2>
                    <div className="flex gap-2 flex-wrap">
                      <button className="px-3 py-1 text-xs font-semibold text-text-secondary hover:text-primary transition-colors">
                        📋 Columns
                      </button>
                      <button className="px-3 py-1 text-xs font-semibold text-text-secondary hover:text-primary transition-colors">
                        🖨️ Print Manifest
                      </button>
                    </div>
                  </div>

                  {/* Table View */}
                  <OperationalQueueTable incidents={operationalQueue} />
                </div>

                {/* Developer Mode Section */}
                <details className="bg-surface rounded-lg border border-border p-6 mt-8">
                  <summary className="text-lg font-bold text-text-primary cursor-pointer">
                    👨‍💻 Municipal Edge State Demonstrations
                  </summary>
                  <div className="mt-4 space-y-4">
                    <details className="bg-surface-alt rounded p-4">
                      <summary className="font-semibold text-text-primary cursor-pointer">
                        ⏳ Loading Skeleton State (Low-Bandwidth Telemetry)
                      </summary>
                      <p className="text-sm text-text-secondary mt-2">
                        Pulsing geometry states matching UI components during offline buffering or dispatch network latency.
                      </p>
                      <button
                        onClick={() => setIsLoading(!isLoading)}
                        className="mt-3 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-semibold transition-colors"
                      >
                        {isLoading ? '❌ Hide' : '▶️ Show'} Loading State
                      </button>
                    </details>
                    <details className="bg-surface-alt rounded p-4">
                      <summary className="font-semibold text-text-primary cursor-pointer">
                        📦 Queue Cleared / Empty Filter State
                      </summary>
                      <p className="text-sm text-text-secondary mt-2">
                        Demonstrates the interface when all incidents have been resolved or filtered.
                      </p>
                      <button
                        onClick={() => setShowEmptyState(!showEmptyState)}
                        className="mt-3 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-semibold transition-colors"
                      >
                        {showEmptyState ? '❌ Hide' : '▶️ Show'} Empty State
                      </button>
                    </details>
                  </div>
                </details>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Compliance Audit Modal */}
      {showComplianceModal && selectedCompliance && (
        <ComplianceAuditModal
          compliance={selectedCompliance}
          onClose={() => setShowComplianceModal(false)}
        />
      )}
    </div>
  );
}
