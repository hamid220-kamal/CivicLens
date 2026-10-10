'use client';

import Navbar from '@/components/Navbar';

export default function TrackPage() {
  const reportId = 'CV-2024-001234';
  const issueType = 'Pothole';
  const severity = 'high';
  const status = 'in_review';
  const statusLabel = 'In Review';

  const timeline = [
    { step: 'Submitted', completed: true, current: false, time: '2 hours ago' },
    { step: 'Under Review', completed: false, current: true, time: 'Now' },
    { step: 'Assigned', completed: false, current: false, time: '—' },
    { step: 'In Progress', completed: false, current: false, time: '—' },
    { step: 'Resolved', completed: false, current: false, time: '—' },
  ];

  const severityColor = {
    low: 'bg-green-100 text-severity-low',
    medium: 'bg-amber-100 text-severity-medium',
    high: 'bg-orange-100 text-severity-high',
    critical: 'bg-red-100 text-severity-critical',
  }[severity];

  const statusBgColor = {
    open: 'bg-blue-100 text-status-open',
    in_review: 'bg-purple-100 text-status-review',
    resolved: 'bg-green-100 text-status-resolved',
  }[status];

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="text-sm text-text-tertiary mb-1">Report ID</p>
              <p className="text-xl sm:text-2xl font-bold text-text-primary">{reportId}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColor}`}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBgColor}`}>
              {statusLabel}
            </span>
          </div>
          <p className="text-text-secondary">{issueType} • Main Street & 5th Avenue</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            <div className="bg-surface rounded-lg border border-border p-6 sm:p-8">
              <h2 className="text-lg font-bold text-text-primary mb-6">Status Timeline</h2>

              <div className="space-y-6">
                {timeline.map((item, idx) => (
                  <div key={item.step} className="flex gap-6">
                    {/* Timeline Marker */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        item.completed
                          ? 'bg-success border-success'
                          : item.current
                            ? 'bg-primary border-primary ring-4 ring-primary-bg'
                            : 'bg-surface-alt border-border'
                      }`}>
                        {item.completed ? (
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : item.current ? (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        ) : null}
                      </div>
                      {idx < timeline.length - 1 && (
                        <div className={`w-1 h-16 my-2 ${item.completed ? 'bg-success' : 'bg-border'}`} />
                      )}
                    </div>

                    {/* Timeline Content */}
                    <div className="pt-1.5">
                      <h3 className={`font-semibold ${item.completed || item.current ? 'text-text-primary' : 'text-text-secondary'}`}>
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
              <h2 className="text-lg font-bold text-text-primary mb-4">Issue Photo</h2>
              <div className="bg-background rounded-lg border border-border h-64 flex items-center justify-center">
                <svg className="w-16 h-16 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-surface rounded-lg border border-border p-6 sm:p-8">
              <h2 className="text-lg font-bold text-text-primary mb-4">Location</h2>
              <div className="bg-background rounded-lg border border-border h-64 flex items-center justify-center relative">
                <svg className="w-8 h-8 text-primary absolute" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
                </svg>
              </div>
              <p className="text-sm text-text-secondary mt-4">
                <strong>Coordinates:</strong> 17.3850°N, 78.4867°W
              </p>
            </div>

            {/* Sources Accordion */}
            <div className="bg-surface rounded-lg border border-border p-6 sm:p-8">
              <h2 className="text-lg font-bold text-text-primary mb-6">Cited Sources</h2>

              <div className="space-y-3">
                {[
                  {
                    title: 'FHWA Pavement Management Guide',
                    excerpt: 'Potholes exceeding 6 inches should be repaired within 48 hours.',
                  },
                  {
                    title: 'Municipal Code § 15-2-1',
                    excerpt: 'All reported road hazards must be assessed according to severity tier.',
                  },
                ].map((source, idx) => (
                  <details key={idx} className="border border-border rounded-lg overflow-hidden">
                    <summary className="px-4 py-3 bg-background cursor-pointer font-semibold text-text-primary hover:bg-surface-alt transition-colors flex justify-between items-center">
                      {source.title}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </summary>
                    <div className="px-4 py-3 bg-surface-alt border-t border-border text-text-secondary text-sm">
                      <p className="italic mb-3">"{source.excerpt}"</p>
                      <button className="text-primary hover:text-primary-dark font-semibold text-xs flex items-center gap-1">
                        View Full Source
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Details Panel */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4">Details</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-text-tertiary uppercase mb-1">Department</p>
                  <p className="text-text-primary font-semibold">GHMC Engineering</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-text-tertiary uppercase mb-2">Priority Score</p>
                  <div className="flex items-end gap-1 h-12">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${i < 8 ? 'bg-primary h-full' : 'bg-border h-1'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-text-primary mt-1">7.8/10</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-text-tertiary uppercase mb-1">SLA Remaining</p>
                  <p className="text-lg font-bold text-primary">46 hours</p>
                  <p className="text-xs text-text-secondary">Resolution by Mar 15, 2 PM</p>
                </div>
              </div>
            </div>

            {/* Duplicate Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-warning text-sm mb-1">Possible Duplicate</h4>
                  <p className="text-xs text-warning mb-2">Similar report found nearby</p>
                  <button className="text-xs font-semibold text-warning hover:text-orange-700 transition-colors">
                    View Report CV-2024-001089 (25m away) →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
