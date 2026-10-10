/**
 * Style Guide Page
 * CivicLens UI Kit - Design system reference and component showcase
 * 
 * Reuses:
 * - Icon (from ui/)
 * - TopBar (from layout/)
 * - BottomNav (from layout/)
 * 
 * New components:
 * - ColorSwatch
 * - SeverityItem
 * - TypographySpecimen
 */

import Icon from '@/components/ui/Icon';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import ColorSwatch from '@/components/ColorSwatch';
import SeverityItem from '@/components/SeverityItem';
import TypographySpecimen from '@/components/TypographySpecimen';

export default function StyleGuidePage() {
  return (
    <div className="bg-surface min-h-screen text-on-surface">
      {/* Header */}
      <TopBar title="Style Guide" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface px-margin-mobile">
        <div className="flex flex-col w-full pb-12 gap-space-lg">
          {/* Overview Header Card */}
          <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Design System v1.0
              </span>
            </div>

            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
              CivicLens UI Kit
            </h1>

            <p className="font-body-md text-body-md text-on-surface-variant">
              Municipal Public Works & Citizen Reporting interface specifications engineered for high legibility,
              accessible touch states, and reliable triage in the field.
            </p>

            {/* Design Principles Badges */}
            <div className="flex flex-wrap gap-1.5 pt-space-xs">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px]">
                <Icon name="verified" size="sm" className="text-secondary" />
                WCAG 2.1 AA Compliant
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px]">
                <Icon name="rounded_corner" size="sm" className="text-primary" />
                12px Radius System
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px]">
                <Icon name="touch_app" size="sm" className="text-secondary" />
                Tap Target ≥ 44px
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[11px]">
                <Icon name="contrast" size="sm" className="text-primary" />
                High Contrast 8.5:1
              </div>
            </div>
          </section>

          {/* Color Tokens Section */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between px-space-xs">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  01. Color Foundations
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  High-accountability semantic color palette
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
                Tokens
              </span>
            </div>

            {/* Core Brand Swatches Grid */}
            <div className="grid grid-cols-2 gap-space-sm">
              <ColorSwatch
                colorName="Primary Blue"
                hexCode="#1E40AF"
                tokenName="primary-container"
                bgClass="bg-primary-container"
                textClass="text-on-primary"
                contrastRatio="8.5:1 AAA"
                icon="verified"
              />
              <ColorSwatch
                colorName="Civic Accent"
                hexCode="#006A61"
                tokenName="secondary"
                bgClass="bg-secondary"
                textClass="text-on-secondary"
                contrastRatio="4.8:1 AA"
                icon="local_police"
              />
              <ColorSwatch
                colorName="Canvas Base"
                hexCode="#FAF8FF"
                tokenName="surface-container-low"
                bgClass="bg-surface-container-low flex items-center justify-center"
                textClass="text-on-surface"
              />
              <ColorSwatch
                colorName="Navy Charcoal"
                hexCode="#131B2E"
                tokenName="on-surface"
                bgClass="bg-on-surface flex items-center justify-center"
                textClass="text-surface-container-lowest"
              />
            </div>

            {/* Severity Matrix */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-body-md-bold text-body-md-bold text-on-surface">
                  Severity Tiers Matrix
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant">
                  Triage Prioritization
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <SeverityItem
                  severity="low"
                  icon="low_priority"
                  description="Street Sweep / Minor Paint"
                />
                <SeverityItem
                  severity="medium"
                  icon="build_circle"
                  description="Broken Curb / Minor Graffiti"
                />
                <SeverityItem
                  severity="high"
                  icon="warning"
                  description="Deep Pothole / Traffic Sign Down"
                />
                <SeverityItem
                  severity="critical"
                  icon="fmd_bad"
                  description="Sewer Overflow / Exposed Wire"
                />
              </div>
            </div>

            {/* Lifecycle Status Badges */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
              <span className="font-body-md-bold text-body-md-bold text-on-surface">
                Lifecycle Status Badges
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 px-3 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  <span className="font-label-sm text-label-sm">Open</span>
                </div>
                <div className="h-10 px-3 rounded-full bg-purple-50 text-purple-800 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                  <span className="font-label-sm text-label-sm">In Review</span>
                </div>
                <div className="h-10 px-3 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                  <span className="font-label-sm text-label-sm">In Progress</span>
                </div>
                <div className="h-10 px-3 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span className="font-label-sm text-label-sm">Resolved</span>
                </div>
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between px-space-xs">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  02. Typography Scale
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Inter Variable typography stack with paired line-heights
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
                Type
              </span>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md divide-y divide-surface-container-high">
              <TypographySpecimen
                label="Display / H1 Mobile"
                size="24px / 32px"
                weight="Bold"
                specimen="Report Municipal Issue"
                className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface"
              />

              <div className="pt-space-sm">
                <TypographySpecimen
                  label="Section Header / H2"
                  size="18px / 24px"
                  weight="Semibold"
                  specimen="Location & Severity Classification"
                  className="font-headline-sm text-headline-sm text-on-surface"
                />
              </div>

              <div className="pt-space-sm">
                <TypographySpecimen
                  label="Body Regular"
                  size="16px / 24px"
                  weight="Regular"
                  specimen="Citizens can submit geo-tagged incident photos directly to DPW field technicians for expedited triage and municipal repair dispatch."
                  className="font-body-md text-body-md text-on-surface-variant"
                />
              </div>

              <div className="pt-space-sm">
                <TypographySpecimen
                  label="Label & Helper Text"
                  size="14px / 20px"
                  weight="Medium"
                  specimen="Minimum 44px tap target footprint | Form Helper Text"
                  className="font-label-md text-label-md text-on-surface"
                />
              </div>

              <div className="pt-space-sm">
                <TypographySpecimen
                  label="Microcopy / Telemetry Badge"
                  size="12px / 16px"
                  weight="Semibold"
                  specimen="GPS: ±3.2m ACCURACY (TRIANGULATED)"
                  className="font-label-sm text-label-sm text-secondary uppercase tracking-widest flex items-center gap-1"
                />
              </div>
            </div>
          </section>

          {/* Interactive Components Section */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between px-space-xs">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  03. Interactive Components
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tested touch patterns for mobile reporters
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
                Atomic
              </span>
            </div>

            {/* Buttons Section */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-body-md-bold text-body-md-bold text-on-surface">
                  Buttons & Actions (48px Touch Height)
                </span>
                <Icon name="smart_button" size="lg" className="text-primary" />
              </div>

              {/* Primary Button */}
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                  Primary Button
                </span>
                <button
                  type="button"
                  className="w-full h-12 px-5 bg-primary-container text-on-primary rounded-xl font-body-md-bold text-body-md-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all hover:bg-primary"
                >
                  <Icon name="camera_enhance" size="md" />
                  Submit Citizen Report
                </button>
              </div>

              {/* Secondary Button */}
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                  Secondary / Surface Action
                </span>
                <button
                  type="button"
                  className="w-full h-12 px-5 bg-secondary-container/40 text-on-secondary-fixed-variant rounded-xl font-body-md-bold text-body-md-bold flex items-center justify-center gap-2 active:bg-secondary-container/60 transition-all hover:bg-secondary-container/50"
                >
                  <Icon name="map" size="md" />
                  View Live Incident Map
                </button>
              </div>

              {/* Ghost Button */}
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                  Ghost / Neutral Action
                </span>
                <button
                  type="button"
                  className="w-full h-12 px-5 bg-surface-container-high/60 text-on-surface-variant rounded-xl font-body-md-bold text-body-md-bold flex items-center justify-center gap-2 active:bg-surface-container-high transition-all hover:bg-surface-container-high"
                >
                  <Icon name="close" size="md" />
                  Cancel / Discard Draft
                </button>
              </div>

              {/* Disabled Button */}
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase">
                  Disabled State
                </span>
                <button
                  type="button"
                  disabled
                  className="w-full h-12 px-5 bg-surface-container-high text-outline rounded-xl font-body-md-bold text-body-md-bold flex items-center justify-center gap-2 cursor-not-allowed opacity-75"
                >
                  <Icon name="lock" size="md" />
                  Upload Restricted (Offline)
                </button>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-body-md-bold text-body-md-bold text-on-surface">
                  Form Fields & Selections
                </span>
                <Icon name="edit_note" size="lg" className="text-secondary" />
              </div>

              {/* Location Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="incident-loc-demo"
                  className="font-label-md text-label-md text-on-surface flex items-center gap-1"
                >
                  Incident Location
                  <span className="text-secondary font-label-sm text-[11px]">(GPS Auto-detect)</span>
                </label>
                <div className="relative flex items-center">
                  <Icon name="pin_drop" size="md" className="absolute left-3 text-secondary pointer-events-none" />
                  <input
                    id="incident-loc-demo"
                    type="text"
                    readOnly
                    value="742 Evergreen Terrace, Springfield"
                    className="w-full h-12 pl-10 pr-4 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors"
                  />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                  <Icon name="check_circle" size="sm" className="text-secondary" />
                  Auto-resolved via device geolocation telemetry
                </p>
              </div>

              {/* Issue Description Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="issue-title-demo"
                  className="font-label-md text-label-md text-on-surface"
                >
                  Issue Description (Active Focus State)
                </label>
                <div className="relative flex items-center bg-surface-container-high/40 rounded-xl p-0.5">
                  <Icon name="edit" size="md" className="absolute left-3 text-primary pointer-events-none" />
                  <input
                    id="issue-title-demo"
                    type="text"
                    readOnly
                    value="Large sinkhole forming near bus stop..."
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface shadow-sm focus:outline-none"
                  />
                </div>
                <p className="font-body-sm text-body-sm text-primary font-label-sm">
                  High-visibility WCAG focus container demonstrated
                </p>
              </div>

              {/* Category Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cat-select-demo" className="font-label-md text-label-md text-on-surface">
                  Issue Category
                </label>
                <div className="relative flex items-center">
                  <Icon
                    name="category"
                    size="md"
                    className="absolute left-3 text-on-surface-variant pointer-events-none"
                  />
                  <select
                    id="cat-select-demo"
                    className="w-full h-12 pl-10 pr-10 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface shadow-sm appearance-none focus:outline-none"
                  >
                    <option>Pothole & Road Hazard</option>
                    <option>Illegal Waste & Dumping</option>
                    <option>Streetlight & Signal Failure</option>
                    <option>Water Main / Sewer Overflow</option>
                  </select>
                  <Icon
                    name="arrow_drop_down"
                    size="md"
                    className="absolute right-3 text-on-surface-variant pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Alerts Section */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-body-md-bold text-body-md-bold text-on-surface">
                  Alert Banners & Toasts
                </span>
                <Icon name="notifications_active" size="lg" className="text-primary" />
              </div>

              {/* Success Toast */}
              <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-950 flex items-start gap-3 shadow-sm">
                <Icon name="check_circle" size="lg" className="text-emerald-700 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-body-md-bold text-body-md text-emerald-950">Report #CL-8821 Submitted</div>
                  <p className="font-body-sm text-body-sm text-emerald-900 leading-snug">
                    Dispatched to Public Works Ward 4 dispatch console with high triage tag.
                  </p>
                </div>
                <button
                  aria-label="Dismiss toast"
                  type="button"
                  className="text-emerald-700 p-1 hover:bg-emerald-100 rounded-full"
                >
                  <Icon name="close" size="md" />
                </button>
              </div>

              {/* Warning Alert */}
              <div className="p-3.5 rounded-xl bg-amber-50 text-amber-950 flex items-start gap-3 shadow-sm">
                <Icon name="warning" size="lg" className="text-amber-700 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-body-md-bold text-body-md text-amber-950">Severe Weather Advisory</div>
                  <p className="font-body-sm text-body-sm text-amber-900 leading-snug">
                    Heavy rains in effect. Emergency drainage responses prioritized; standard graffiti SLA extended by
                    48h.
                  </p>
                </div>
              </div>
            </div>

            {/* Accordions Section */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
              <span className="font-body-md-bold text-body-md-bold text-on-surface">Interactive Accordions</span>

              {/* Open Accordion */}
              <details className="group rounded-xl bg-surface-container-low p-space-sm open:pb-space-md transition-all" open>
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-sm text-body-md-bold text-on-surface min-h-[44px]">
                  <span className="flex items-center gap-2">
                    <Icon name="gps_fixed" size="md" className="text-primary" />
                    How does photo GPS verification work?
                  </span>
                  <Icon
                    name="expand_more"
                    size="lg"
                    className="text-on-surface-variant transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="pt-2 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  CivicLens extracts the cryptographic EXIF timestamp alongside hardware sensor coordinates at shutter
                  release. This prevents duplicate municipal submissions and confirms field proximity within 5 meters.
                </div>
              </details>

              {/* Closed Accordion */}
              <details className="group rounded-xl bg-surface-container-low p-space-sm transition-all">
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-sm text-body-md-bold text-on-surface min-h-[44px]">
                  <span className="flex items-center gap-2">
                    <Icon name="report" size="md" className="text-error" />
                    What qualifies as a Critical Severity issue?
                  </span>
                  <Icon
                    name="expand_more"
                    size="lg"
                    className="text-on-surface-variant transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="pt-2 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Active sewer backups, downed energized utility wires, missing manhole covers on thoroughfares, and
                  broken gas lines are routed immediately to emergency city dispatch units within 15 minutes.
                </div>
              </details>
            </div>

            {/* Skeleton Loading */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-body-md-bold text-body-md-bold text-on-surface">Skeleton Loading State</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant">Low-Bandwidth Mobile View</span>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high"></div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-4 bg-surface-container-high rounded w-3/4"></div>
                    <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-6 bg-surface-container-high rounded-full"></div>
                </div>
                <div className="h-3 bg-surface-container-high rounded w-full"></div>
                <div className="h-3 bg-surface-container-high rounded w-4/5"></div>
              </div>
            </div>
          </section>

          {/* Accessibility Standards Section */}
          <section className="bg-surface-container-high rounded-xl p-space-md flex flex-col gap-space-sm shadow-sm">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="accessibility_new" size="xl" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Accessibility & Breakpoints</h3>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant">
              CivicLens is certified against WCAG 2.1 Level AA compliance guidelines to assure equitable access across
              diverse citizen devices and abilities.
            </p>

            {/* Checklist Matrix */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start gap-2.5">
                <Icon name="check_circle" size="lg" className="text-secondary mt-0.5" />
                <div>
                  <div className="font-body-md-bold text-body-md text-on-surface">Interactive Target Geometry</div>
                  <div className="font-body-sm text-[13px] text-on-surface-variant">
                    Minimum touch footprint is strictly 44×44px for thumb tap clearance in wet weather outdoor reporting.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start gap-2.5">
                <Icon name="check_circle" size="lg" className="text-secondary mt-0.5" />
                <div>
                  <div className="font-body-md-bold text-body-md text-on-surface">Contrast Ratios Guarantee</div>
                  <div className="font-body-sm text-[13px] text-on-surface-variant">
                    All body copy maintains &gt;4.5:1 against surfaces. Critical badges and primary action CTA achieve
                    8.5:1 ratio.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-lowest flex items-start gap-2.5">
                <Icon name="check_circle" size="lg" className="text-secondary mt-0.5" />
                <div>
                  <div className="font-body-md-bold text-body-md text-on-surface">Fluid Viewport Thresholds</div>
                  <div className="font-body-sm text-[13px] text-on-surface-variant">
                    Breakpoints anchored at: sm (640px), md (768px), lg (1024px), xl (1280px). Tested primarily for
                    390px mobile viewport.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activePath="/style-guide" />
    </div>
  );
}
