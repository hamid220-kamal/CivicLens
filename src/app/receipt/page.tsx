'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ReceiptPage() {
  const reportId = 'CV-2024-001234';
  const issueType = 'Pothole';
  const severity = 'high';
  const priorityScore = 7.8;
  const department = 'GHMC Engineering Wing (Roads)';
  const slaHours = 48;
  const reason = 'This pothole is located on a major commuter route with high vehicle traffic. The size and depth indicate risk of vehicle damage and potential pedestrian hazard.';

  const sources = [
    {
      title: 'FHWA Pavement Management Guide',
      publisher: 'Federal Highway Administration',
      excerpt: 'Potholes exceeding 6 inches in diameter pose significant safety risk and should be repaired within 48 hours of detection.',
    },
    {
      title: 'Municipal Code § 15-2-1',
      publisher: 'City Government',
      excerpt: 'All reported road hazards must be assessed and addressed according to severity tier within documented SLA timeframes.',
    },
  ];

  const severityColor = {
    low: 'bg-green-100 text-severity-low',
    medium: 'bg-amber-100 text-severity-medium',
    high: 'bg-orange-100 text-severity-high',
    critical: 'bg-red-100 text-severity-critical',
  }[severity];

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-light mb-4">
            <svg className="w-8 h-8 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Report Submitted</h1>
          <p className="text-lg text-text-secondary mb-1">Your issue has been received and is being analyzed.</p>
          <p className="text-sm font-mono text-text-tertiary">Report ID: <span className="font-semibold text-primary">{reportId}</span></p>
        </div>

        {/* Issue Summary */}
        <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">Issue Summary</h2>

          <div className="flex gap-6 mb-6">
            {/* Photo Placeholder */}
            <div className="w-24 h-24 rounded-lg bg-background border border-border flex-shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Issue Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-text-primary">{issueType}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColor}`}>
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </span>
              </div>
              <p className="text-text-secondary">Main Street & 5th Avenue</p>
            </div>
          </div>

          {/* Severity & Priority Gauge */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
            <div>
              <p className="text-sm font-semibold text-text-secondary mb-3">Priority Score</p>
              <div className="space-y-2">
                <div className="flex items-end gap-1 h-16">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all ${i < Math.ceil(priorityScore) ? 'bg-primary h-full' : 'bg-border h-1'}`}
                    />
                  ))}
                </div>
                <p className="text-lg font-bold text-text-primary">{priorityScore}/10</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-secondary mb-3">Department</p>
              <p className="text-text-primary font-semibold">{department}</p>
              <p className="text-xs text-text-tertiary mt-2">✓ AI recommendation</p>
            </div>
          </div>
        </div>

        {/* SLA Card */}
        <div className="bg-info-light border-l-4 border-info rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-bold text-info">Service Level Agreement</h3>
              <p className="text-info text-sm mt-1">Expected resolution within <strong>{slaHours} hours</strong></p>
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">Why This Was Flagged</h2>
          <p className="text-text-secondary leading-relaxed">{reason}</p>
        </div>

        {/* Sources */}
        <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-text-primary mb-4">Cited Sources</h2>

          <div className="space-y-4">
            {sources.map((source, idx) => (
              <div key={idx} className="bg-background rounded-lg p-4 border border-border">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-text-primary">{source.title}</h3>
                    <p className="text-xs text-text-tertiary">{source.publisher}</p>
                  </div>
                  <button className="text-primary hover:text-primary-dark transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-text-secondary italic border-l-2 border-border pl-3">
                  "{source.excerpt}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/track"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center min-h-[44px] flex items-center justify-center"
          >
            Track This Report
          </Link>
          <Link
            href="/report"
            className="px-6 py-3 bg-surface-alt text-primary border border-primary rounded-lg font-semibold hover:bg-primary-bg transition-colors text-center min-h-[44px] flex items-center justify-center"
          >
            Report Another Issue
          </Link>
        </div>
      </main>
    </div>
  );
}
