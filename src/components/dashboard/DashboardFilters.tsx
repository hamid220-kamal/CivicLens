'use client';

interface DashboardFiltersProps {
  statusFilter: string;
  severityFilter: string;
  categoryFilter: string;
  sortBy: string;
  viewMode: 'table' | 'card';
  onStatusChange: (status: string) => void;
  onSeverityChange: (severity: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onViewModeChange: (mode: 'table' | 'card') => void;
}

export default function DashboardFilters({
  statusFilter,
  severityFilter,
  categoryFilter,
  sortBy,
  viewMode,
  onStatusChange,
  onSeverityChange,
  onCategoryChange,
  onSortChange,
  onViewModeChange,
}: DashboardFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search and View Toggle */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="🔍 Search by ID or street name, e.g., '#CV-2024-9182', '5th Ave'"
            className="w-full px-4 py-2 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-sm"
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-surface-alt p-1 rounded-lg">
          <button
            onClick={() => onViewModeChange('card')}
            className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors flex items-center gap-1 ${
              viewMode === 'card'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            📊 Card Grid
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors flex items-center gap-1 ${
              viewMode === 'table'
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            📋 Data Table
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start sm:items-center">
        {/* Severity Filter */}
        <div className="min-w-[180px]">
          <select
            value={severityFilter}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-text-primary text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">Severity: All Tiers</option>
            <option value="critical">Critical (Tier 1)</option>
            <option value="high">High (Tier 2)</option>
            <option value="medium">Medium (Tier 3)</option>
            <option value="low">Low / Informational</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="min-w-[200px]">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-text-primary text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="all">Category: Potholes & Roadways</option>
            <option value="roadways">Category: Potholes & Roadways</option>
            <option value="stormwater">Category: Stormwater & Sewers</option>
            <option value="lighting">Category: Lighting & Signals</option>
            <option value="structural">Category: Structural & Bridges</option>
            <option value="sanitation">Category: Sanitation & Debris</option>
          </select>
        </div>

        {/* Sort */}
        <div className="min-w-[200px]">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-text-primary text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="priority">Sort: Priority Score (High)</option>
            <option value="newest">Sort: Newest Logged</option>
            <option value="sla">Sort: SLA Time Remaining</option>
            <option value="proximity">Sort: Proximity to Depot</option>
          </select>
        </div>
      </div>
    </div>
  );
}
