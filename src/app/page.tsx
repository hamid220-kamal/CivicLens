/**
 * CivicLens Home Page
 * 
 * Main landing page with:
 * - Hero section with phone mockup
 * - 4-step process flow
 * - Trust badges
 * - Recent incident showcase
 * - CTA banner
 * - Footer
 * 
 * Reuses: Icon, TopBar
 * New: ProcessCard, IncidentCard, TrustBadge
 */

import Icon from '@/components/ui/Icon';
import TopBar from '@/components/layout/TopBar';
import ProcessCard from '@/components/ProcessCard';
import IncidentCard from '@/components/IncidentCard';
import TrustBadge from '@/components/TrustBadge';
import Link from 'next/link';

import {
  metricsData,
  processSteps,
  trustBadges,
  incidentsData,
  footerLinks,
} from '@/lib/placeholder';

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen text-on-surface">
      {/* Header */}
      <TopBar />

      <main className="w-full flex flex-col relative">
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden bg-surface py-space-xl lg:py-24">
          {/* Ambient Civic Glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

          <div className="w-full px-margin-mobile md:px-margin max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              {/* Left Column: Copy & Actions */}
              <div className="lg:col-span-7 flex flex-col gap-space-lg">
                {/* Version Badge */}
                <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container w-fit shadow-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                    Decentralized City Response v3.2
                  </span>
                </div>

                {/* Headline & Copy */}
                <div className="flex flex-col gap-space-sm">
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight text-balance">
                    See it. Snap it.
                    <br className="hidden sm:inline" />
                    <span className="text-primary-container">Get it fixed.</span>
                  </h1>

                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    Report civic issues across your municipality in seconds. Submit a photo with instant GPS
                    validation, powered by AI-assisted triage that routes directly to public works dispatchers
                    with real-time status tracking.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                  <Link
                    href="/report"
                    className="inline-flex items-center justify-center gap-space-sm min-h-[48px] px-space-lg rounded-xl bg-primary-container text-on-primary font-body-md-bold text-body-md-bold shadow-md hover:bg-primary transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                  >
                    <Icon name="photo_camera" size="lg" />
                    <span>Report an Issue</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-space-sm min-h-[48px] px-space-lg rounded-xl bg-surface-container-low text-secondary font-body-md-bold text-body-md-bold shadow-sm hover:bg-surface-container transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                  >
                    <Icon name="map" size="lg" />
                    <span>View Live Dashboard</span>
                  </Link>
                </div>

                {/* Proof Indicator */}
                <div className="inline-flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low w-fit shadow-sm mt-space-xs">
                  <Icon name="bolt" size="lg" className="text-secondary" />
                  <span className="font-label-md text-label-md text-on-surface">
                    <strong className="font-semibold text-primary">Over {metricsData.totalResolved}</strong> civic hazards
                    resolved across {metricsData.totalMunicipalDistricts} municipal districts
                  </span>
                </div>

                {/* Micro Metric Counters */}
                <div className="grid grid-cols-3 gap-space-md pt-space-md">
                  <div className="flex flex-col">
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      {metricsData.avgTriageTime}
                      <span className="font-headline-sm text-headline-sm text-secondary ml-1">
                        {metricsData.avgTriageUnit}
                      </span>
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Avg. Triage Dispatch
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      {metricsData.gpsPinAccuracy}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      GPS Pin Accuracy
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      {metricsData.activeWards}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Active Wards
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Phone Mockup */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[360px] aspect-[9/19] rounded-[2.5rem] bg-inverse-surface p-3 shadow-2xl transition-all duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,40,142,0.25)]">
                  {/* Notch */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-on-background rounded-full z-30"></div>

                  {/* Phone Display */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-on-background flex flex-col justify-between">
                    {/* Camera Background */}
                    <img
                      alt="Close up street level shot of a jagged asphalt road pothole in an urban avenue with autumn sunlight casting dramatic shadows on broken bitumen, hyper-realistic, authentic municipal inspection photograph"
                      className="absolute inset-0 z-0 w-full h-full object-cover opacity-90 brightness-95"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfYrDjc80TYz6tFENFzh0YgIC-wh8EFV61eks5pQ2-qjQ_SPeM8f_d6LL-js_tYSmGV13sqOtEvfoPwEmW4vVxTn5Ecx8nK6LH-ewdtHThzivaYFdA-mfcYRE37SokaAH58MAwLbOAY2p_zHVTQQE4hpeWRFgI_PcGbsn4BqOIr1Q0qvzLWfrkCrcSQ8C7Ew7inkJ2dBlWOfjD4buKEmdJUdKekA4nibOMPoorCER7pnFPlwuTtIidWw"
                    />

                    {/* Viewfinder Grid */}
                    <div className="absolute inset-0 bg-gradient-to-t from-on-background via-transparent to-black/60 pointer-events-none"></div>
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20 pointer-events-none">
                      <div className="border-b border-r border-white/40"></div>
                      <div className="border-b border-r border-white/40"></div>
                      <div className="border-b border-white/40"></div>
                      <div className="border-b border-r border-white/40"></div>
                      <div className="border-b border-r border-white/40"></div>
                      <div className="border-b border-white/40"></div>
                      <div className="border-r border-white/40"></div>
                      <div className="border-r border-white/40"></div>
                      <div></div>
                    </div>

                    {/* Top HUD */}
                    <div className="relative z-10 p-space-md pt-8 flex items-center justify-between text-surface">
                      <div className="flex items-center gap-space-xs bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-surface text-[12px]">
                        <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                        <span className="font-label-sm text-label-sm tracking-wide">REC LIVE</span>
                      </div>

                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-surface">
                        <Icon name="hdr_auto" size="sm" />
                        <span>4K 60FPS</span>
                      </div>
                    </div>

                    {/* Center AI Detection Box */}
                    <div className="relative z-10 px-4 flex flex-col items-center">
                      <div className="w-64 h-48 rounded-xl relative shadow-lg">
                        {/* Corner Accents */}
                        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-tertiary-container"></div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-tertiary-container"></div>
                        <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-tertiary-container"></div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-tertiary-container"></div>

                        {/* Confidence Badge */}
                        <div className="absolute -top-4 left-2 bg-tertiary-container text-surface px-2.5 py-0.5 rounded-full font-label-sm text-label-sm shadow flex items-center gap-1">
                          <Icon name="auto_fix_high" size="sm" />
                          <span>Pothole (Grade 3) • 98.4%</span>
                        </div>

                        {/* Center Target */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-8 h-8 rounded-full bg-tertiary-container/20 flex items-center justify-center animate-ping"></div>
                          <Icon name="filter_center_focus" size="xl" className="text-tertiary-container absolute" />
                        </div>
                      </div>

                      {/* GPS Metatag */}
                      <div className="mt-4 bg-surface-container-lowest/95 backdrop-blur-md text-on-surface px-3 py-1.5 rounded-full shadow-lg flex items-center gap-space-xs font-label-sm text-label-sm">
                        <Icon name="location_on" size="md" className="text-secondary" />
                        <span>Elm & 5th Ave • GPS ±2m</span>
                      </div>
                    </div>

                    {/* Bottom Action Console */}
                    <div className="relative z-10 p-space-md pb-6 flex flex-col gap-2">
                      <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-3 shadow-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                            Severity: High
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold">
                            Triaged
                          </span>
                        </div>
                        <Icon name="verified" size="lg" className="text-primary" />
                      </div>

                      <div className="flex items-center justify-around pt-2">
                        <button
                          type="button"
                          className="w-10 h-10 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface flex items-center justify-center hover:bg-surface-container-lowest/40 transition-colors"
                          aria-label="Flash"
                        >
                          <Icon name="flash_on" size="lg" />
                        </button>

                        <button
                          type="button"
                          className="w-14 h-14 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                          aria-label="Send report"
                        >
                          <div className="w-11 h-11 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                            <Icon name="send" size="lg" />
                          </div>
                        </button>

                        <button
                          type="button"
                          className="w-10 h-10 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-surface flex items-center justify-center hover:bg-surface-container-lowest/40 transition-colors"
                          aria-label="Settings"
                        >
                          <Icon name="tune" size="lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="w-full bg-surface-container-low py-space-xl">
          <div className="w-full px-margin-mobile md:px-margin max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-space-xl">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold mb-space-xs">
                STREAMLINED CITIZEN REPORTING
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                From street hazard to municipal resolution in 4 steps
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                Engineered for zero-friction reporting and rapid city dispatch.
              </p>
            </div>

            {/* 4 Process Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
              {processSteps.map((step) => (
                <ProcessCard key={step.id} {...step} />
              ))}
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="w-full bg-surface py-space-lg shadow-sm">
          <div className="w-full px-margin-mobile md:px-margin max-w-7xl mx-auto flex flex-col items-center gap-space-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm tracking-wide uppercase font-semibold">
              <Icon name="gavel" size="lg" className="text-primary" />
              <span>Backed by real civic guidelines & municipal standards</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-space-sm">
              {trustBadges.map((badge, idx) => (
                <TrustBadge key={idx} {...badge} />
              ))}
            </div>
          </div>
        </section>

        {/* INCIDENT SHOWCASE SECTION */}
        <section className="w-full bg-surface-container-low py-space-xl">
          <div className="w-full px-margin-mobile md:px-margin max-w-7xl mx-auto flex flex-col gap-space-xl">
            {/* Showcase Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                  LIVE COMMUNITY PULSE
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Recent Municipal Resolutions
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Transparent real-time auditing of resident submissions across city departments.
                </p>
              </div>

              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-lowest shadow-sm text-primary font-label-md text-label-md">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span>Feed synchronized 2m ago</span>
              </div>
            </div>

            {/* 3 Incident Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {incidentsData.map((incident) => (
                <IncidentCard key={incident.id} {...incident} />
              ))}
            </div>

            {/* High-Impact CTA Banner */}
            <div className="relative overflow-hidden bg-primary-container text-on-primary rounded-xl p-space-xl md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg">
              {/* Decorative Blobs */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-surface-tint/30 pointer-events-none"></div>
              <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-secondary-container/10 pointer-events-none"></div>

              <div className="flex flex-col gap-space-xs relative z-10 max-w-2xl text-center lg:text-left">
                <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-widest font-bold">
                  COMMUNITY FIRST INITIATIVE
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-primary tracking-tight">
                  Ready to make your neighborhood safer?
                </h2>
                <p className="font-body-md text-body-md text-on-primary-container">
                  Report an issue in under 30 seconds. Help local crews identify hazards before they cause
                  vehicle damage or pedestrian injury.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-space-sm w-full lg:w-auto">
                <Link
                  href="/report"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm min-h-[48px] px-space-xl rounded-xl bg-surface-container-lowest text-primary font-body-md-bold text-body-md-bold shadow-lg hover:bg-surface-container transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                >
                  <Icon name="add_a_photo" size="lg" />
                  <span>Start Citizen Report</span>
                </Link>

                <Link
                  href="/track"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-sm min-h-[48px] px-space-lg rounded-xl bg-primary/40 text-on-primary font-body-md text-body-md hover:bg-primary/60 transition-colors"
                >
                  <Icon name="search" size="lg" />
                  <span>Look up Case ID</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_6px_rgba(0,0,0,0.03)]">
        <div className="w-full px-margin py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
            {/* Brand Column */}
            <div className="lg:col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm text-primary">
                <Icon name="assured_workload" size="xl" />
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Civic<span className="text-primary">Lens</span>
                </span>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                Empowering transparent, accountable municipal collaboration. Connecting community members with
                public works, traffic safety, and city infrastructure teams in real time.
              </p>

              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">
                  <Icon name="verified_user" size="md" className="text-secondary" />
                  Municipal Trust Certified
                </span>
                <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">
                  <Icon name="security" size="md" className="text-secondary" />
                  FedRAMP Ready
                </span>
              </div>
            </div>

            {/* Platform Links */}
            <div className="flex flex-col gap-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Platform</h3>
              <nav className="flex flex-col gap-space-xs">
                {footerLinks.platform.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Governance Links */}
            <div className="flex flex-col gap-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Governance</h3>
              <nav className="flex flex-col gap-space-xs">
                {footerLinks.governance.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Community Links */}
            <div className="flex flex-col gap-space-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Community</h3>
              <nav className="flex flex-col gap-space-xs">
                {footerLinks.community.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md border-t border-surface-container">
            <div className="flex flex-col md:flex-row items-center gap-space-md text-center md:text-left">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                © 2025 CivicLens Municipal Network. All rights reserved.
              </span>
              <span className="hidden md:inline font-body-sm text-body-sm text-on-surface-variant">•</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant inline-flex items-center gap-1">
                <Icon name="accessibility_new" size="md" className="text-secondary" />
                WCAG 2.1 AA Compliant Platform
              </span>
            </div>

            <div className="flex items-center gap-space-lg font-body-sm text-body-sm text-on-surface-variant">
              <Link href="/privacy" className="hover:text-on-surface transition-colors">
                Privacy Statement
              </Link>
              <Link href="/terms" className="hover:text-on-surface transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-on-surface transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
