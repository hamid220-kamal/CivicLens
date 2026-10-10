'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TelemetryAlert from '@/components/dashboard/TelemetryAlert';
import PriorityDispatchStream from '@/components/dashboard/PriorityDispatchStream';
import OperationalQueueTable from '@/components/dashboard/OperationalQueueTable';
import DashboardFilters from '@/components/dashboard/DashboardFilters';
import KPICards from '@/components/dashboard/KPICards';

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [selectedCompliance, setSelectedCompliance] = useState<any>(null);

  const kpis = [
    { label: 'Total Reports', value: '1,248', trend: '+14%', trendPeriod: 'vs last week', icon: 'inbox' },
    { label: 'Open / In Queue', value: '84', subtext: '38 awaiting inspection, 46 dispatched', icon: 'pending_actions' },
    { label: 'Critical Hazards', value: '12', subtext: '3 within 2h of SLA deadline', icon: 'priority_high' },
    { label: 'Resolved Today', value: '47', subtext: '↑ +9 above daily quota, 98.2% photo verified', icon: 'task_alt' },
  ];

  // Priority dispatch stream incidents
  const priorityIncidents = [
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
      gps: '41.8781°N, 87.6298°W',
      duplicateId: 'CV-2024-9179',
      duplicateDistance: 18,
      assignedCrew: 'DPW Ward 4 Crew Bravo',
      assignedLead: 'M. Vance',
      citations: [
        {
          title: 'FHWA Pothole Severity Index § 4.2',
          code: 'Code P-2',
          excerpt: 'Depressions exceeding 2 inches in depth located directly within vehicular wheel paths mandate priority dispatch code P-2 within 48 hours.',
        },
        {
          title: 'Municipal Infrastructure Code § 14-802',
          code: 'Transit Route',
          excerpt: 'Cavities occurring on designated transit corridors receive accelerated priority weighting.',
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
          excerpt: 'Runoff discharge obstructions in grade separation subways necessitate rapid mitigation to avert toxic vehicular contamination runoff.',
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
      notes: 'Automatic photocell sensor failure suspected across 3 adjacent mast arms. Crosswalk safety beacon remains operational.',
      assignedDivision: 'Division of Street Lighting',
      assignedInspector: 'Inspector Assigned',
      citations: [
        {
          title: 'Municipal Code: § 22-108',
          code: 'Pedestrian Visibility Zone',
        },
      ],
    },
  ];

  const operationalQueue = [
    {
      id: 'CV-2024-9182',
      type: 'Deep Roadway Pothole (Grade 3)',
      severity: 'critical',
      priority: 8.4,
      location: '5th Ave & Elm St',
      ward: 'Ward 4 (Transit Corridor)',
      time: '18m ago (14:28 EST)',
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
      time: '42m ago (14:04 EST)',
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
      time: '2h ago (12:45 EST)',
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

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-16 left-0 z-40 w-64 bg-surface border-r border-border transform transition-transform md:relative md:translate-x-0 md:inset-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
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
          <main className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Incident Triage & Dispatch Console</h1>
                <p className="text-text-secondary mt-1">Live telemetric queue for Ward 4 Public Works & Infrastructure Dispatch. 28 active work orders in flight across municipal thoroughfares.</p>
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

            {/* Live Sync Status */}
            <div className="bg-surface-alt rounded-lg border border-border p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-status-resolved rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-text-secondary">Live Sync (Online, 4s ago)</span>
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

            {/* Summary Stats */}
            <div className="bg-surface rounded-lg border border-border p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'All Reports', value: '1,248' },
                  { label: 'Open Dispatches', value: '84' },
                  { label: 'In Review / Engineering', value: '32' },
                  { label: 'Resolved', value: '1,132' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* View and Filter Controls */}
            <div className="bg-surface rounded-lg border border-border p-4 sm:p-6 mb-8">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h2 className="text-lg font-bold text-text-primary">Priority Dispatch Stream</h2>
                  <button className="text-xs font-semibold text-text-secondary hover:text-primary transition-colors">
                    3 Highlighted Orders
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

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-center gap-2">
                <button className="px-2 py-1 text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
                  ◀
                </button>
                {[1, 2, 3, '...', 17].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 text-sm font-semibold rounded transition-colors ${
                      page === 1 ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-2 py-1 text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
                  ▶
                </button>
              </div>
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
                </details>
                <details className="bg-surface-alt rounded p-4">
                  <summary className="font-semibold text-text-primary cursor-pointer">
                    📦 Queue Cleared / Empty Filter State
                  </summary>
                  <div className="mt-2 text-center py-8">
                    <p className="text-xl font-bold text-text-primary">All Clear</p>
                    <p className="text-sm text-text-secondary mt-2">
                      No reports in this filter queue
                    </p>
                    <p className="text-xs text-text-tertiary mt-2">
                      All citizen submissions in Ward 4 have been triaged and assigned to maintenance crews. New reports will appear here automatically via live dispatch sync.
                    </p>
                    <button className="mt-4 px-4 py-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                      Reset Filters
                    </button>
                    <button className="ml-2 px-4 py-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                      🔄 Refresh Telemetry Stream
                    </button>
                  </div>
                  <p className="text-xs text-text-tertiary mt-4">
                    Automatic heartbeat polling: active every 15s
                  </p>
                </details>
              </div>
            </details>
          </main>
        </div>
      </div>
    </div>
  );
}
