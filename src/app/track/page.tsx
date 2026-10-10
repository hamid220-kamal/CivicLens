'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CivicReport } from '@/lib/types/api';

function TrackContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  const [searchId, setSearchId] = useState('');
  const [report, setReport] = useState<CivicReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch report by ID
  const fetchReport = async (idToFetch: string) => {
    if (!idToFetch.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/reports?id=${encodeURIComponent(idToFetch.trim())}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.reports) && data.reports.length > 0) {
        setReport(data.reports[0]);
      } else {
        // Fallback: check session storage if matching ID
        if (typeof window !== 'undefined') {
          const cached = sessionStorage.getItem('civiclens_last_report');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.id === idToFetch || idToFetch.length <= 13) {
              setReport(parsed);
              return;
            }
          }
        }
        setError(`No civic report found for ID: ${idToFetch}`);
        setReport(null);
      }
    } catch {
      setError('Network error while looking up report. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryId) {
      setSearchId(queryId);
      fetchReport(queryId);
    } else if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem('civiclens_last_report');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setReport(parsed);
          setSearchId(parsed.id || '');
        } catch {}
      }
    }
  }, [queryId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      fetchReport(searchId.trim());
    }
  };

  // Status mapping
  const currentStatus: string = report?.status || 'pending_review';
  const severity: string = report?.severity || 'medium';
  const issueType = report?.issue_type
    ? report.issue_type.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Civic Issue';
  const department = report?.department_recommendation?.name || 'GHMC Engineering Wing';
  const slaHours = report?.department_recommendation?.sla_hours || 48;
  const priorityScore =
    severity === 'critical' ? 9.5 : severity === 'high' ? 7.8 : severity === 'medium' ? 5.2 : 3.0;

  const severityColorMap: Record<string, string> = {
    low: 'bg-green-100 text-severity-low',
    medium: 'bg-amber-100 text-severity-medium',
    high: 'bg-orange-100 text-severity-high',
    critical: 'bg-red-100 text-severity-critical',
    uncertain: 'bg-slate-100 text-slate-700',
  };
  const severityColor = severityColorMap[severity] || 'bg-amber-100 text-severity-medium';

  const isResolved = currentStatus === 'resolved';
  const isInProgress = currentStatus === 'in_progress';
  const isRejected = currentStatus === 'rejected';
  const isPending = currentStatus === 'pending_review';

  const statusLabel =
    isResolved ? 'Resolved' : isInProgress ? 'In Progress' : isRejected ? 'Rejected' : 'Under Review';

  const statusBgColor =
    isResolved
      ? 'bg-green-100 text-status-resolved'
      : isInProgress
      ? 'bg-amber-100 text-amber-800'
      : isRejected
      ? 'bg-red-100 text-red-700'
      : 'bg-purple-100 text-status-review';

  const timeline = [
    {
      step: 'Submitted',
      completed: true,
      current: false,
      time: report?.created_at
        ? new Date(report.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'Verified',
    },
    {
      step: 'AI Triage & Review',
      completed: isInProgress || isResolved,
      current: isPending,
      time: isPending ? 'Now' : 'Completed',
    },
    {
      step: 'Municipal Action',
      completed: isResolved,
      current: isInProgress,
      time: isInProgress ? 'In Progress' : isResolved ? 'Completed' : 'Pending',
    },
    {
      step: 'Resolved',
      completed: isResolved,
      current: false,
      time: isResolved ? 'Closed' : 'Estimated via SLA',
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Track Lookup Card */}
        <div className="bg-surface rounded-lg border border-border p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-text-primary mb-2">Track A Civic Report</h2>
          <p className="text-sm text-text-secondary mb-4">
            Enter your persistent Report ID to query the real-time status recorded in the municipal database.
          </p>
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. 83f863cc-a424-40fc-8845-7e155f5a5d19"
              className="flex-1 px-4 py-2.5 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Searching...' : 'Track Status'}
            </button>
          </form>
          {error && <p className="text-sm text-error mt-3">{error}</p>}
        </div>

        {report ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <div>
                  <p className="text-xs font-semibold text-text-tertiary uppercase">Report ID</p>
                  <p className="text-lg sm:text-2xl font-bold font-mono text-text-primary break-all">
                    {report.id}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColor}`}>
                  {severity.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBgColor}`}>
                  {statusLabel}
                </span>
              </div>
              <p className="text-text-secondary">
                {issueType} • {report.location?.latitude ? `${report.location.latitude.toFixed(4)}°N, ${report.location.longitude?.toFixed(4)}°E` : 'Hyderabad, Telangana'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Status Timeline */}
                <div className="bg-surface rounded-lg border border-border p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-text-primary mb-6">Status Timeline</h2>

                  <div className="space-y-6">
                    {timeline.map((item, idx) => (
                      <div key={item.step} className="flex gap-6">
                        {/* Timeline Marker */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                              item.completed
                                ? 'bg-success border-success'
                                : item.current
                                ? 'bg-primary border-primary ring-4 ring-primary-bg'
                                : 'bg-surface-alt border-border'
                            }`}
                          >
                            {item.completed ? (
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : item.current ? (
                              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                            ) : null}
                          </div>
                          {idx < timeline.length - 1 && (
                            <div className={`w-1 h-16 my-2 ${item.completed ? 'bg-success' : 'bg-border'}`} />
                          )}
                        </div>

                        {/* Timeline Content */}
                        <div className="pt-1.5">
                          <h3
                            className={`font-semibold ${
                              item.completed || item.current ? 'text-text-primary' : 'text-text-secondary'
                            }`}
                          >
                            {item.step}
                          </h3>
                          <p className="text-sm text-text-tertiary mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo Card */}
                <div className="bg-surface rounded-lg border border-border p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-text-primary mb-4">Issue Evidence Photo</h2>
                  {report.image_url ? (
                    <img
                      src={report.image_url}
                      alt="Civic issue photo"
                      className="w-full h-80 object-cover rounded-lg border border-border"
                    />
                  ) : (
                    <div className="bg-background rounded-lg border border-border h-48 flex items-center justify-center text-text-tertiary text-sm">
                      No photo attached to this report.
                    </div>
                  )}
                </div>

                {/* Cited Municipal Sources */}
                {report.evidence && report.evidence.length > 0 && (
                  <div className="bg-surface rounded-lg border border-border p-6 sm:p-8">
                    <h2 className="text-lg font-bold text-text-primary mb-4">Official Service Standards</h2>
                    <div className="space-y-3">
                      {report.evidence.map((src, idx) => (
                        <div key={idx} className="border border-border rounded-lg p-4 bg-background">
                          <h3 className="font-semibold text-text-primary text-sm">{src.source_title}</h3>
                          <p className="text-xs text-text-tertiary mb-2">{src.publisher}</p>
                          <p className="text-xs text-text-secondary italic border-l-2 border-primary pl-3">
                            "{src.excerpt}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Details */}
              <div className="space-y-6">
                <div className="bg-surface rounded-lg border border-border p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-4">Report Details</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-text-tertiary uppercase mb-1">Recommended Department</p>
                      <p className="text-text-primary font-semibold">{department}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-text-tertiary uppercase mb-2">Priority Score</p>
                      <div className="flex items-end gap-1 h-12">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-t ${i < Math.ceil(priorityScore) ? 'bg-primary h-full' : 'bg-border h-1'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-bold text-text-primary mt-1">{priorityScore}/10</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-text-tertiary uppercase mb-1">Service SLA</p>
                      <p className="text-lg font-bold text-primary">{slaHours} hours</p>
                      <p className="text-xs text-text-secondary">Official municipal resolution timeframe</p>
                    </div>

                    {report.severity_reason && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs font-semibold text-text-tertiary uppercase mb-1">AI Triage Reason</p>
                        <p className="text-xs text-text-secondary leading-relaxed">{report.severity_reason}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Duplicates notice if present */}
                {report.possible_duplicates && report.possible_duplicates.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-warning text-sm mb-1">Nearby Duplicate Reports</h4>
                    <p className="text-xs text-amber-800 mb-2">
                      {report.possible_duplicates.length} other report(s) were found near this location within 500m.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-surface rounded-lg border border-border p-12 text-center text-text-secondary">
            <svg className="w-16 h-16 mx-auto text-text-tertiary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-bold text-text-primary mb-2">No Active Report Selected</h3>
            <p className="text-sm max-w-md mx-auto mb-6">
              To track a civic issue, please paste your report ID into the search box above or submit a new grievance.
            </p>
            <Link
              href="/report"
              className="inline-flex px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Submit A Civic Issue →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading tracking details...</div>}>
      <TrackContent />
    </Suspense>
  );
}
