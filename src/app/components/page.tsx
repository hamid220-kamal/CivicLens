'use client';

import Navbar from '@/components/Navbar';

export default function ComponentsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Component Library</h1>
        <p className="text-text-secondary mb-12">Reusable components for CivicLens UI</p>

        {/* BUTTONS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Buttons</h2>
          <div className="bg-surface rounded-lg border border-border p-8 space-y-6">
            <div>
              <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Primary Buttons</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors min-h-[44px]">
                  Primary
                </button>
                <button disabled className="px-6 py-3 bg-primary text-white rounded-lg font-semibold opacity-50 cursor-not-allowed min-h-[44px]">
                  Disabled
                </button>
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors min-h-[44px] flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  With Icon
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Secondary Buttons</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-surface-alt text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary-bg transition-colors min-h-[44px]">
                  Secondary
                </button>
                <button className="px-6 py-3 bg-surface-alt text-accent border-2 border-accent rounded-lg font-semibold hover:bg-accent-bg transition-colors min-h-[44px]">
                  Accent
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Ghost Buttons</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 text-primary font-semibold hover:bg-surface-alt rounded-lg transition-colors min-h-[44px]">
                  Ghost
                </button>
                <button className="px-6 py-3 text-error font-semibold hover:bg-error-light rounded-lg transition-colors min-h-[44px]">
                  Danger
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Size Variants</p>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-3 py-1.5 bg-primary text-white rounded text-sm font-semibold hover:bg-primary-dark min-h-[40px]">
                  Small
                </button>
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark min-h-[44px]">
                  Default
                </button>
                <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark min-h-[48px]">
                  Large
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BADGES & TAGS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Badges & Tags</h2>
          <div className="bg-surface rounded-lg border border-border p-8 space-y-6">
            <div>
              <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Severity Badges</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-green-100 text-severity-low rounded-full text-xs font-semibold">Low</span>
                <span className="px-3 py-1 bg-amber-100 text-severity-medium rounded-full text-xs font-semibold">Medium</span>
                <span className="px-3 py-1 bg-orange-100 text-severity-high rounded-full text-xs font-semibold">High</span>
                <span className="px-3 py-1 bg-red-100 text-severity-critical rounded-full text-xs font-semibold">Critical</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Status Badges</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-blue-100 text-status-open rounded-full text-xs font-semibold">Open</span>
                <span className="px-3 py-1 bg-purple-100 text-status-review rounded-full text-xs font-semibold">In Review</span>
                <span className="px-3 py-1 bg-green-100 text-status-resolved rounded-full text-xs font-semibold">Resolved</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Duplicate Tag</p>
              <div className="bg-amber-50 border border-amber-200 rounded px-3 py-2 w-fit flex items-center gap-2">
                <span className="text-warning text-sm font-semibold">⚠</span>
                <span className="text-xs font-semibold text-warning">Possible Duplicate (Nearby)</span>
              </div>
            </div>
          </div>
        </section>

        {/* TOAST NOTIFICATIONS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Toasts</h2>
          <div className="bg-surface rounded-lg border border-border p-8 space-y-4">
            <div className="bg-success-light border border-success text-success px-4 py-3 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Success: Report submitted successfully!</span>
            </div>

            <div className="bg-error-light border border-error text-error px-4 py-3 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Error: Failed to upload. <button className="underline font-semibold hover:opacity-80">Retry</button></span>
            </div>

            <div className="bg-info-light border border-info text-info px-4 py-3 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Info: Location acquired. Accuracy ±5m</span>
            </div>
          </div>
        </section>

        {/* FORM INPUTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Form Inputs</h2>
          <div className="bg-surface rounded-lg border border-border p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Text Input</label>
              <input
                type="text"
                placeholder="Type something..."
                className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Input with Error</label>
              <input
                type="text"
                placeholder="Error state..."
                className="w-full px-4 py-2.5 border-2 border-error rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2"
              />
              <p className="text-error text-sm mt-1">This field is required</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Textarea</label>
              <textarea
                placeholder="Enter description..."
                rows={4}
                className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Select</label>
              <select className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                <option>-- Select an option --</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary cursor-pointer" />
                <span className="text-text-primary font-medium">Checkbox</span>
              </label>
            </div>
          </div>
        </section>

        {/* SKELETONS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Skeleton Loaders</h2>
          <div className="bg-surface rounded-lg border border-border p-8">
            <div className="space-y-4">
              <div className="h-8 bg-border rounded-lg animate-pulse w-48"></div>
              <div className="h-4 bg-border rounded-lg animate-pulse w-full"></div>
              <div className="h-4 bg-border rounded-lg animate-pulse w-5/6"></div>
              <div className="h-40 bg-border rounded-lg animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* SPINNERS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Spinners</h2>
          <div className="bg-surface rounded-lg border border-border p-8 flex gap-8">
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-text-secondary text-sm mt-2">Default</p>
            </div>

            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-text-secondary text-sm mt-2">Large</p>
            </div>
          </div>
        </section>

        {/* EMPTY STATES */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Empty State</h2>
          <div className="bg-surface rounded-lg border border-border p-12 text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">No reports yet</h3>
            <p className="text-text-secondary mb-6">Start by creating your first report</p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
              Create Report
            </button>
          </div>
        </section>

        {/* ACCORDIONS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Accordion</h2>
          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            {[1, 2, 3].map((i) => (
              <details key={i} className={`${i > 1 ? 'border-t border-border' : ''}`}>
                <summary className="px-6 py-4 cursor-pointer font-semibold text-text-primary hover:bg-surface-alt transition-colors flex justify-between items-center">
                  Accordion Item {i}
                  <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </summary>
                <div className="px-6 py-4 bg-surface-alt border-t border-border text-text-secondary">
                  This is the content for accordion item {i}. It can contain any information you want to hide or reveal.
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
