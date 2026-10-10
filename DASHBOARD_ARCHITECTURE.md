# CivicLens Dashboard Architecture

## 🏗️ Component Hierarchy

```
DashboardPage (Main Container)
│
├─ Navbar (Navigation Bar)
│
├─ Sidebar (Navigation Menu)
│  ├─ Dashboard
│  ├─ Incidents
│  ├─ Map
│  └─ Settings
│
└─ Main Content Area
   │
   ├─ Header
   │  ├─ Title: "Incident Triage & Dispatch Console"
   │  └─ Description
   │
   ├─ [CONDITIONAL] TelemetryAlert
   │  ├─ Error message
   │  ├─ Retry button
   │  └─ Close button
   │
   ├─ [CONDITIONAL] LoadingSkeleton (Dev Mode)
   │  ├─ KPI skeleton
   │  ├─ Live sync skeleton
   │  ├─ Filters skeleton
   │  ├─ Dispatch stream skeleton
   │  └─ Table skeleton
   │
   ├─ [CONDITIONAL] EmptyState (Dev Mode)
   │  ├─ "All Clear" message
   │  ├─ Info text
   │  ├─ Polling status
   │  ├─ Reset Filters button
   │  └─ Refresh button
   │
   ├─ [NORMAL] Dashboard Content
   │  │
   │  ├─ Live Sync Status Bar
   │  │  ├─ Online indicator
   │  │  ├─ Export CSV button
   │  │  └─ Manual Entry button
   │  │
   │  ├─ KPICards
   │  │  ├─ Total Reports (1,248)
   │  │  ├─ Open/In Queue (84)
   │  │  ├─ Critical Hazards (12)
   │  │  └─ Resolved Today (47)
   │  │
   │  ├─ Summary Stats Grid
   │  │  ├─ All Reports: 1,248
   │  │  ├─ Open Dispatches: 84
   │  │  ├─ In Review: 32
   │  │  └─ Resolved: 1,132
   │  │
   │  ├─ Filters & Controls Section
   │  │  └─ DashboardFilters
   │  │     ├─ Search input
   │  │     ├─ View toggle (Grid/Table)
   │  │     ├─ Severity dropdown
   │  │     ├─ Category dropdown
   │  │     └─ Sort dropdown
   │  │
   │  ├─ Priority Dispatch Stream
   │  │  └─ PriorityDispatchStream
   │  │     ├─ [Incident Card 1]
   │  │     │  ├─ Severity badge
   │  │     │  ├─ Status badge
   │  │     │  ├─ Type & time
   │  │     │  ├─ Location
   │  │     │  ├─ Triage score
   │  │     │  ├─ GPS coordinates
   │  │     │  ├─ Duplicate alert
   │  │     │  ├─ SLA breach warning
   │  │     │  ├─ Crew assignment
   │  │     │  ├─ Compliance citations (expandable)
   │  │     │  │  └─ Citation 1
   │  │     │  │  └─ Citation 2
   │  │     │  └─ Action buttons
   │  │     ├─ [Incident Card 2]
   │  │     └─ [Incident Card 3]
   │  │
   │  ├─ Operational Queue Section
   │  │  ├─ Title
   │  │  ├─ Column/Print buttons
   │  │  │
   │  │  ├─ OperationalQueueTable
   │  │  │  ├─ Header row
   │  │  │  │  ├─ Checkbox (select all)
   │  │  │  │  ├─ Report ID & Issue
   │  │  │  │  ├─ Severity
   │  │  │  │  ├─ Priority Score
   │  │  │  │  ├─ Geolocation
   │  │  │  │  ├─ Time Logged
   │  │  │  │  ├─ Status
   │  │  │  │  ├─ Citations
   │  │  │  │  ├─ Duplicate Flag
   │  │  │  │  └─ Actions
   │  │  │  │
   │  │  │  ├─ Data rows (1-5 of 84)
   │  │  │  │  ├─ [Row 1] CV-2024-9182 - Pothole
   │  │  │  │  ├─ [Row 2] CV-2024-9190 - Storm Drain
   │  │  │  │  ├─ [Row 3] CV-2024-9165 - Streetlight
   │  │  │  │  ├─ [Row 4] CV-2024-9154 - Traffic Signal
   │  │  │  │  └─ [Row 5] CV-2024-9140 - Waste Container
   │  │  │  │
   │  │  │  └─ Footer (showing 1-5 of 84)
   │  │  │
   │  │  └─ Pagination
   │  │     ├─ ◀ (previous)
   │  │     ├─ 1 (active)
   │  │     ├─ 2
   │  │     ├─ 3
   │  │     ├─ ...
   │  │     ├─ 17
   │  │     └─ ▶ (next)
   │  │
   │  └─ Developer Mode Section
   │     ├─ Loading Skeleton Demo
   │     │  └─ Show/Hide button
   │     └─ Empty State Demo
   │        └─ Show/Hide button
   │
   └─ [MODAL - Conditional] ComplianceAuditModal
      ├─ Header
      ├─ Citation Details
      ├─ Metadata Grid
      ├─ Action Buttons
      └─ Close Button
```

---

## 🔄 State Management

```
DashboardPage State
│
├─ viewMode: 'card' | 'table'
│  └─ Used by: DashboardFilters, Dashboard rendering
│
├─ statusFilter: string
│  └─ Used by: DashboardFilters, filtering logic
│
├─ severityFilter: string
│  └─ Used by: DashboardFilters, filtering logic
│
├─ categoryFilter: string
│  └─ Used by: DashboardFilters, filtering logic
│
├─ sortBy: string
│  └─ Used by: DashboardFilters, sorting logic
│
├─ sidebarOpen: boolean
│  └─ Used by: Sidebar, hamburger menu
│
├─ isOnline: boolean
│  └─ Used by: TelemetryAlert visibility
│
├─ isLoading: boolean
│  └─ Used by: LoadingSkeleton visibility (dev mode)
│
├─ showEmptyState: boolean
│  └─ Used by: EmptyState visibility (dev mode)
│
├─ showComplianceModal: boolean
│  └─ Used by: ComplianceAuditModal visibility
│
└─ selectedCompliance: Citation | null
   └─ Used by: ComplianceAuditModal content
```

---

## 📊 Data Flow

```
Mock Incident Data
│
├─ priorityIncidents: DispatchIncident[]
│  ├─ Flow → PriorityDispatchStream
│  ├─ Filter by severity
│  ├─ Click → Opens ComplianceAuditModal
│  └─ Actions → (Future: API calls)
│
├─ operationalQueue: OperationalQueueIncident[]
│  ├─ Flow → OperationalQueueTable
│  ├─ Filter by status/severity
│  ├─ Sort by priority/date
│  ├─ Search by ID
│  └─ Checkbox selection
│
├─ kpis: KPICard[]
│  ├─ Flow → KPICards
│  └─ Display metrics
│
└─ Summary Stats (derived)
   ├─ Flow → Summary Grid
   └─ Display aggregate data
```

---

## 🎨 Component Dependencies

```
DashboardPage (Parent)
│
├── imports: Navbar
│
├── imports: TelemetryAlert
│   └─ Props: onRetry callback
│
├── imports: KPICards
│   └─ Props: kpis array
│
├── imports: DashboardFilters
│   └─ Props: all filter states + setters
│   └─ Props: viewMode + setter
│
├── imports: PriorityDispatchStream
│   └─ Props: incidents array
│   └─ Props: onComplianceClick callback
│   └─ Internal: Uses ComplianceAuditModal
│
├── imports: OperationalQueueTable
│   └─ Props: incidents array
│   └─ Internal: Manages selection state
│
├── imports: LoadingSkeleton
│   └─ Props: none (standalone)
│
├── imports: EmptyState
│   └─ Props: onResetFilters, onRefresh callbacks
│
└── imports: ComplianceAuditModal
    └─ Props: compliance data
    └─ Props: onClose callback
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 640px)
├─ Sidebar: Collapsed (hamburger icon)
├─ KPI Cards: 1 column
├─ Dispatch Stream: 1 column
├─ Filters: Stack vertically
├─ Table: Horizontal scroll
└─ Font sizes: Reduced for small screens

Tablet (640px - 1024px)
├─ Sidebar: Visible
├─ KPI Cards: 2 columns
├─ Dispatch Stream: 2 columns
├─ Filters: Wrap as needed
└─ Table: Visible with scroll

Desktop (> 1024px)
├─ Sidebar: Full width
├─ KPI Cards: 4 columns
├─ Dispatch Stream: 3 columns
├─ Filters: All on one line
└─ Table: Full width visible
```

---

## 🔗 Props Interface

```typescript
// TelemetryAlert Props
{
  onRetry?: () => void
}

// KPICards Props
{
  kpis: KPICard[]
}

// DashboardFilters Props
{
  statusFilter: string
  severityFilter: string
  categoryFilter: string
  sortBy: string
  viewMode: 'table' | 'card'
  onStatusChange: (status: string) => void
  onSeverityChange: (severity: string) => void
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
  onViewModeChange: (mode: 'table' | 'card') => void
}

// PriorityDispatchStream Props
{
  incidents: DispatchIncident[]
  onComplianceClick?: (compliance: Citation) => void
}

// OperationalQueueTable Props
{
  incidents: OperationalQueueIncident[]
}

// ComplianceAuditModal Props
{
  compliance: Citation
  onClose: () => void
}

// EmptyState Props
{
  onResetFilters?: () => void
  onRefresh?: () => void
}
```

---

## 🎯 Event Handlers

```
User Interactions
│
├─ Search Input
│  └─ onChange → Search incident by ID
│
├─ Filter Dropdowns
│  └─ onChange → Update filter state
│
├─ View Toggle
│  ├─ "Card Grid" click → setViewMode('card')
│  └─ "Data Table" click → setViewMode('table')
│
├─ Incident Card Click
│  └─ Expand/collapse details
│
├─ Citation Click
│  ├─ setShowComplianceModal(true)
│  └─ setSelectedCompliance(citation)
│
├─ Modal Close Button
│  ├─ setShowComplianceModal(false)
│  └─ setSelectedCompliance(null)
│
├─ Checkbox Select
│  └─ Toggle incident selection
│
├─ Retry Button
│  └─ setIsOnline(true)
│
├─ Sidebar Toggle
│  └─ setSidebarOpen(!sidebarOpen)
│
├─ Developer Buttons
│  ├─ "Show Loading State" → setIsLoading(!isLoading)
│  └─ "Show Empty State" → setShowEmptyState(!showEmptyState)
│
└─ Reset Filters
   └─ Reset all filter states to defaults
```

---

## 📈 Rendering Logic

```
render() {
  if (isLoading) {
    return <LoadingSkeleton />
  }
  
  if (showEmptyState) {
    return <EmptyState />
  }
  
  return (
    <>
      {!isOnline && <TelemetryAlert />}
      
      <KPICards kpis={kpis} />
      
      <DashboardFilters ... />
      
      <PriorityDispatchStream 
        incidents={priorityIncidents}
        onComplianceClick={handleCitation}
      />
      
      <OperationalQueueTable 
        incidents={operationalQueue}
      />
      
      <DeveloperMode ... />
      
      {showComplianceModal && (
        <ComplianceAuditModal 
          compliance={selectedCompliance}
          onClose={...}
        />
      )}
    </>
  )
}
```

---

## 🔄 Data Flow Diagram

```
┌────────────────────────────────────────────────┐
│  Dashboard Data (Mock)                         │
├────────────────────────────────────────────────┤
│  priorityIncidents: [3 items]                  │
│  operationalQueue: [5+ items]                  │
│  kpis: [4 metrics]                             │
└────────────────────────────────────────────────┘
         │        │        │
         ▼        ▼        ▼
    ┌────────────────────────────┐
    │  Dashboard Components      │
    ├────────────────────────────┤
    │  KPICards                  │
    │  DashboardFilters          │
    │  PriorityDispatchStream    │
    │  OperationalQueueTable     │
    └────────────────────────────┘
         │        │        │        │
         ▼        ▼        ▼        ▼
    ┌───────────────────────────────────┐
    │  Rendered UI Elements             │
    ├───────────────────────────────────┤
    │  Cards with severity colors       │
    │  Filtered/sorted tables           │
    │  Modal dialogs                    │
    │  Loading/empty states             │
    └───────────────────────────────────┘
         │
         ▼
    ┌────────────────────────────┐
    │  Browser Display (3 layouts)
    ├────────────────────────────┤
    │  Mobile (< 640px)          │
    │  Tablet (640-1024px)       │
    │  Desktop (> 1024px)        │
    └────────────────────────────┘
```

---

## 📊 State Machine

```
States:
  - NORMAL: Displaying data
  - LOADING: Show skeleton
  - EMPTY: Show empty state
  - OFFLINE: Show telemetry alert
  - MODAL: Show compliance details

Transitions:
  NORMAL → LOADING (dev button)
  LOADING → NORMAL (dev button)
  NORMAL → EMPTY (dev button)
  EMPTY → NORMAL (dev button)
  * → OFFLINE (network error)
  OFFLINE → NORMAL (retry)
  * → MODAL (click citation)
  MODAL → * (close modal)
```

---

## ✨ Summary

The Dashboard uses a **hierarchical component structure** with:
- **Single parent state** in DashboardPage
- **Conditional rendering** for different states
- **Props-driven** child components
- **Callback-based** communication
- **Responsive** at multiple breakpoints
- **Mock data** ready for API integration

All components are **self-contained**, **reusable**, and **type-safe** with TypeScript.

---
