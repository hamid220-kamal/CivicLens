'use client';

import Navbar from '@/components/Navbar';

export default function StyleGuidePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Design System
          </h1>
          <p className="text-lg text-text-secondary">
            CivicLens design system: clean, government-grade, friendly, and modern.
          </p>
        </div>

        {/* COLOR PALETTE */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Colors</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Primary */}
            <div>
              <div className="flex gap-4 items-start mb-4">
                <div className="w-24 h-24 rounded-lg bg-primary"></div>
                <div>
                  <h3 className="font-bold text-text-primary">Primary</h3>
                  <p className="text-sm text-text-secondary">#1E40AF</p>
                  <p className="text-xs text-text-tertiary mt-1">Deep blue, trust, primary actions</p>
                </div>
              </div>
            </div>

            {/* Primary Light */}
            <div>
              <div className="flex gap-4 items-start mb-4">
                <div className="w-24 h-24 rounded-lg bg-primary-light"></div>
                <div>
                  <h3 className="font-bold text-text-primary">Primary Light</h3>
                  <p className="text-sm text-text-secondary">#3B82F6</p>
                  <p className="text-xs text-text-tertiary mt-1">Hover states</p>
                </div>
              </div>
            </div>

            {/* Primary Dark */}
            <div>
              <div className="flex gap-4 items-start mb-4">
                <div className="w-24 h-24 rounded-lg bg-primary-dark"></div>
                <div>
                  <h3 className="font-bold text-text-primary">Primary Dark</h3>
                  <p className="text-sm text-text-secondary">#1E3A8A</p>
                  <p className="text-xs text-text-tertiary mt-1">Active states</p>
                </div>
              </div>
            </div>

            {/* Accent */}
            <div>
              <div className="flex gap-4 items-start mb-4">
                <div className="w-24 h-24 rounded-lg bg-accent"></div>
                <div>
                  <h3 className="font-bold text-text-primary">Accent (Teal)</h3>
                  <p className="text-sm text-text-secondary">#0D9488</p>
                  <p className="text-xs text-text-tertiary mt-1">Secondary highlights</p>
                </div>
              </div>
            </div>

            {/* Background */}
            <div>
              <div className="flex gap-4 items-start mb-4">
                <div className="w-24 h-24 rounded-lg bg-background border border-border"></div>
                <div>
                  <h3 className="font-bold text-text-primary">Background</h3>
                  <p className="text-sm text-text-secondary">#F8FAFC</p>
                  <p className="text-xs text-text-tertiary mt-1">Page backgrounds</p>
                </div>
              </div>
            </div>

            {/* Surface */}
            <div>
              <div className="flex gap-4 items-start mb-4">
                <div className="w-24 h-24 rounded-lg bg-surface border border-border"></div>
                <div>
                  <h3 className="font-bold text-text-primary">Surface</h3>
                  <p className="text-sm text-text-secondary">#FFFFFF</p>
                  <p className="text-xs text-text-tertiary mt-1">Cards, containers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Severity Colors */}
          <div className="bg-surface rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Status & Severity</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Status Colors */}
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-status-open"></div>
                    <span className="text-sm text-text-secondary">Open</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-status-review"></div>
                    <span className="text-sm text-text-secondary">In Review</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-status-resolved"></div>
                    <span className="text-sm text-text-secondary">Resolved</span>
                  </div>
                </div>
              </div>

              {/* Severity Colors */}
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Severity</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-severity-low"></div>
                    <span className="text-sm text-text-secondary">Low</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-severity-medium"></div>
                    <span className="text-sm text-text-secondary">Medium</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-severity-high"></div>
                    <span className="text-sm text-text-secondary">High</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-severity-critical"></div>
                    <span className="text-sm text-text-secondary">Critical</span>
                  </div>
                </div>
              </div>

              {/* Semantic Colors */}
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Semantic</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-error"></div>
                    <span className="text-sm text-text-secondary">Error</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-warning"></div>
                    <span className="text-sm text-text-secondary">Warning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success"></div>
                    <span className="text-sm text-text-secondary">Success</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-info"></div>
                    <span className="text-sm text-text-secondary">Info</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TYPOGRAPHY */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Typography</h2>

          <div className="bg-surface rounded-lg p-8 border border-border space-y-8">
            <div>
              <p className="text-xs font-semibold text-text-tertiary uppercase mb-2">Heading 1</p>
              <p className="text-5xl font-bold text-text-primary">See it. Snap it. Get it fixed.</p>
              <p className="text-xs text-text-tertiary mt-2">36px bold, 44px line-height</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-text-tertiary uppercase mb-2">Heading 2</p>
              <p className="text-4xl font-bold text-text-primary">How it works</p>
              <p className="text-xs text-text-tertiary mt-2">28px bold, 36px line-height</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-text-tertiary uppercase mb-2">Heading 3</p>
              <p className="text-2xl font-bold text-text-primary">Trust & Transparency</p>
              <p className="text-xs text-text-tertiary mt-2">24px bold, 32px line-height</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-text-tertiary uppercase mb-2">Body Text</p>
              <p className="text-base text-text-primary">
                Report civic issues—potholes, garbage, sewer overflow—with a photo and GPS location. Get
                AI-assisted triage with real municipal guidelines and track progress in real-time.
              </p>
              <p className="text-xs text-text-tertiary mt-2">16px regular, 24px line-height</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-text-tertiary uppercase mb-2">Body Small</p>
              <p className="text-sm text-text-secondary">
                This is smaller body text used for secondary information and descriptions.
              </p>
              <p className="text-xs text-text-tertiary mt-2">14px regular, 20px line-height</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-text-tertiary uppercase mb-2">Label</p>
              <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                System Label
              </p>
              <p className="text-xs text-text-tertiary mt-2">12-14px semibold, uppercase</p>
            </div>
          </div>
        </section>

        {/* COMPONENTS */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Components</h2>

          {/* Buttons */}
          <div className="bg-surface rounded-lg p-8 border border-border mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Buttons</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Primary */}
              <div>
                <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Primary</p>
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  Report an Issue
                </button>
                <p className="text-xs text-text-tertiary mt-3">
                  Primary actions, high emphasis. Min tap target 44px.
                </p>
              </div>

              {/* Secondary */}
              <div>
                <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Secondary</p>
                <button className="px-6 py-3 bg-surface-alt text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  View Dashboard
                </button>
                <p className="text-xs text-text-tertiary mt-3">
                  Secondary actions, medium emphasis.
                </p>
              </div>

              {/* Ghost */}
              <div>
                <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Ghost</p>
                <button className="px-6 py-3 text-primary font-semibold hover:bg-surface-alt rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  Learn More
                </button>
                <p className="text-xs text-text-tertiary mt-3">
                  Tertiary actions, low emphasis.
                </p>
              </div>

              {/* Disabled */}
              <div>
                <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Disabled</p>
                <button disabled className="px-6 py-3 bg-surface-alt text-text-tertiary rounded-lg font-semibold cursor-not-allowed opacity-50">
                  Disabled State
                </button>
                <p className="text-xs text-text-tertiary mt-3">
                  All button states support disabled.
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-surface rounded-lg p-8 border border-border mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Badges & Status Tags</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Status Badges */}
              <div>
                <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Status</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-status-open rounded-full text-xs font-semibold">
                    Open
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-status-review rounded-full text-xs font-semibold">
                    In Review
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-status-resolved rounded-full text-xs font-semibold">
                    Resolved
                  </span>
                </div>
              </div>

              {/* Severity Badges */}
              <div>
                <p className="text-sm font-semibold text-text-secondary mb-4 uppercase">Severity</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-green-100 text-severity-low rounded-full text-xs font-semibold">
                    Low
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-severity-medium rounded-full text-xs font-semibold">
                    Medium
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-severity-high rounded-full text-xs font-semibold">
                    High
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-severity-critical rounded-full text-xs font-semibold">
                    Critical
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="bg-surface rounded-lg p-8 border border-border mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Cards</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Basic Card */}
              <div className="bg-background rounded-lg p-6 border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
                <h4 className="text-lg font-bold text-text-primary mb-2">Card Title</h4>
                <p className="text-text-secondary mb-4">
                  Cards contain related content and actions with consistent styling and shadow depth.
                </p>
                <button className="text-primary font-semibold text-sm hover:text-primary-dark transition-colors">
                  Learn More →
                </button>
              </div>

              {/* Incident Card Example */}
              <div className="bg-background rounded-lg p-6 border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-text-primary">Pothole on Main St</h4>
                  <span className="px-2 py-1 bg-red-100 text-severity-critical rounded text-xs font-semibold">
                    Critical
                  </span>
                </div>
                <p className="text-text-secondary text-sm mb-4">Reported 2 hours ago</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-surface-alt text-text-secondary rounded text-xs">
                    Main Street & 5th
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-status-open rounded text-xs font-semibold">
                    Open
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-surface rounded-lg p-8 border border-border">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Input Fields</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Text Input</label>
                <input
                  type="text"
                  placeholder="Enter issue title..."
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Textarea</label>
                <textarea
                  placeholder="Describe the issue in detail..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Select Dropdown</label>
                <select className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all">
                  <option>-- Select severity --</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Checkbox</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                  />
                  <span className="text-text-secondary">I agree to the terms</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* SPACING & LAYOUT */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Spacing & Layout</h2>

          <div className="bg-surface rounded-lg p-8 border border-border">
            <h3 className="text-lg font-bold text-text-primary mb-6">Spacing Scale</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-primary rounded"></div>
                <div>
                  <p className="font-semibold text-text-primary">xs: 0.5rem (8px)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-8 bg-primary rounded"></div>
                <div>
                  <p className="font-semibold text-text-primary">sm: 1rem (16px)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-8 bg-primary rounded"></div>
                <div>
                  <p className="font-semibold text-text-primary">md: 1.5rem (24px)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary rounded"></div>
                <div>
                  <p className="font-semibold text-text-primary">lg: 2rem (32px)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-primary rounded"></div>
                <div>
                  <p className="font-semibold text-text-primary">xl: 3rem (48px)</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-text-primary mt-8 mb-4">Breakpoints</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="font-semibold text-text-primary">Mobile: 0px - 640px</p>
                <p className="text-sm text-text-secondary mt-1">Single column, full width</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="font-semibold text-text-primary">Tablet: 640px - 1024px</p>
                <p className="text-sm text-text-secondary mt-1">2 columns, constrained width</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="font-semibold text-text-primary">Desktop: 1024px - 1280px</p>
                <p className="text-sm text-text-secondary mt-1">3-4 columns, max 1280px</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="font-semibold text-text-primary">Large: 1280px+</p>
                <p className="text-sm text-text-secondary mt-1">Full grid layout</p>
              </div>
            </div>
          </div>
        </section>

        {/* ACCESSIBILITY */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Accessibility</h2>

          <div className="bg-surface rounded-lg p-8 border border-border space-y-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-3">✓ WCAG 2.1 AA Compliant</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>• Minimum contrast ratio 4.5:1 for normal text, 3:1 for large text</li>
                <li>• All interactive elements have visible focus indicators</li>
                <li>• Minimum tap target size of 44x44px for all buttons</li>
                <li>• Semantic HTML with proper heading hierarchy</li>
                <li>• ARIA labels where necessary</li>
              </ul>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold text-text-primary mb-2">Focus Ring Example</p>
              <button className="px-4 py-2 text-primary font-semibold hover:bg-primary-bg rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all">
                Focus on me (Tab key)
              </button>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold text-text-primary mb-2">Color Contrast Check</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-primary text-white rounded">
                  <p className="text-sm font-semibold">Good (7:1 ratio)</p>
                  <p className="text-xs">Primary on white</p>
                </div>
                <div className="p-3 bg-text-primary text-surface rounded">
                  <p className="text-sm font-semibold">Good (16:1 ratio)</p>
                  <p className="text-xs">Text on white</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center text-text-secondary text-sm">
          <p>© 2025 CivicLens Design System. Made for transparent, accountable municipal collaboration.</p>
        </div>
      </footer>
    </div>
  );
}
