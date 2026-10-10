/**
 * Track Incident Page
 * Post-submission incident status tracking with timeline, SLA countdown, evidence, and community engagement
 * 
 * Reuses: Icon, TopBar
 * New: IncidentTimeline, ComplianceAccordion, TriageScoreGauge
 * 
 * Features:
 * - Breadcrumb navigation
 * - Duplicate detection banner
 * - Incident header with status badges
 * - Vertical audit trail timeline (5 stages)
 * - SLA countdown gauge
 * - Evidence photos + location map
 * - Priority score breakdown
 * - Municipal authority assignment
 * - Community upvote/follow system
 * - Compliance standards accordion
 * - Copy, share, download actions
 */

import Icon from '@/components/ui/Icon';
import TopBar from '@/components/layout/TopBar';
import IncidentTimeline from '@/components/IncidentTimeline';
import ComplianceAccordion from '@/components/ComplianceAccordion';
import TriageScoreGauge from '@/components/TriageScoreGauge';
import Link from 'next/link';

import {
  incidentTrackingData,
  timelineEvents,
  regulationsData,
} from '@/lib/placeholder';

export default function TrackIncidentPage() {
  const incident = incidentTrackingData;

  return (
    <div className="bg-background min-h-screen text-on-surface">
      {/* Header */}
      <TopBar title="Track Incident" />

      <main className="w-full pt-16 bg-background min-h-screen">
        <div className="w-full px-margin-mobile md:px-margin py-space-lg flex flex-col gap-space-lg max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant">
            <div className="flex items-center gap-space-xs font-label-md text-label-md">
              <Link className="hover:text-primary transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-secondary rounded" href="/">
                <Icon name="home" size="md" />
                <span>Dashboard</span>
              </Link>
              <span className="text-outline-variant">/</span>
              <Link className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded" href="/track">
                Track Incident
              </Link>
              <span className="text-outline-variant">/</span>
              <span aria-current="page" className="text-primary font-body-md-bold">
                #{incident.id}
              </span>
            </div>

            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Live Dispatch Sync: Active
              </span>
            </div>
          </nav>

          {/* Duplicate Detection Banner */}
          <aside aria-label="Duplicate report detected notice" className="w-full rounded-xl bg-surface-container-high p-space-md md:p-space-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="difference" size="xl" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      Possible Duplicate Detected Nearby
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm">
                      18m Offset
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Incident <strong className="text-on-surface font-body-md-bold">#CV-2024-9179</strong> was
                    logged 18 meters away on 5th Ave & Elm St. Merging community signals combines telemetry data
                    while preserving the active 48-hour municipal SLA window.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-sm pl-12 md:pl-0 shrink-0">
                <button className="h-11 px-space-md rounded-lg bg-surface-container-lowest text-primary font-body-md-bold text-body-sm hover:bg-surface-container transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary" type="button">
                  View Linked Report
                </button>
                <button className="h-11 px-space-md rounded-lg bg-primary text-on-primary font-body-md-bold text-body-sm hover:bg-primary-container transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary" type="button">
                  Confirm Same Issue (+1 Upvote)
                </button>
              </div>
            </div>
          </aside>

          {/* Page Header & Key Metadata */}
          <header className="flex flex-col gap-space-md">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">#{incident.id}</h1>

                  <button aria-label="Copy Incident ID" className="w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-secondary" type="button">
                    <Icon name="content_copy" size="lg" />
                  </button>

                  <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-1.5">
                    <Icon name="warning" size="md" />
                    {incident.severity}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                    {incident.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-on-surface-variant mt-1">
                  <Icon name="maps_ar" size="xl" className="text-primary" />
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                    {incident.title}
                  </span>
                  <span className="text-outline-variant font-body-sm">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{incident.location}</span>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-xs shrink-0">
                <button className="h-11 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary" type="button">
                  <Icon name="sms" size="lg" className="text-secondary" />
                  <span>SMS Updates</span>
                </button>
                <button className="h-11 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary" type="button">
                  <Icon name="share" size="lg" className="text-primary" />
                  <span>Share Report</span>
                </button>
                <button className="h-11 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary" type="button">
                  <Icon name="download" size="lg" className="text-on-surface-variant" />
                  <span>PDF Summary</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            {/* Left Column: Timeline & Compliance (7 cols) */}
            <section className="lg:col-span-7 flex flex-col gap-space-lg">
              {/* Timeline */}
              <IncidentTimeline events={timelineEvents} />

              {/* Compliance Accordion */}
              <ComplianceAccordion expandedByDefault="fhwa" regulations={regulationsData} />
            </section>

            {/* Right Column: Evidence & Metrics (5 cols) */}
            <aside className="lg:col-span-5 flex flex-col gap-space-lg">
              {/* Evidence Card */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-md text-headline-md text-on-surface">Telemetry & Evidence</h3>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    Geo-Anchored
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {/* Photo Evidence */}
                  <div className="relative rounded-lg overflow-hidden h-48 bg-surface-container flex flex-col justify-end group">
                    <img
                      alt="Close up photograph of a severe deep roadway pothole with crumbling asphalt edges on a city transit street"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2sKrmAiNG5uXPjH3DSNBni1Xd5DVevdq5zQKOvZH5q5tKp6t9nrjstHVnEAhzYMTRmoGtgFsWO7b1LHlhTVG21VINM6_Xj-DOk9cjLxJTfeTApRgs0Vha5S0JKtFo54vvxy2tDMf-2CWtcyFiUzByp4L95j8VWS8KLc6yB9Y1dgFYgUIG0gA9SIHWwJ2BkaHP2d-JawMM3ubKeORsWf4NsN5Z3acl55XYvWsbzRa3rNh4-JL4U2AhFA"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-variant/90 via-transparent to-transparent pointer-events-none"></div>
                    <div className="relative z-10 p-2 flex flex-col gap-1">
                      <div className="flex flex-wrap gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-[10px] text-on-surface font-semibold backdrop-blur-sm">
                          12.4 MP EXIF
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-[10px] text-on-surface font-semibold backdrop-blur-sm">
                          GPS Authenticated
                        </span>
                      </div>
                      <span className="text-[11px] font-label-sm text-on-surface truncate">
                        Captured Nov 14, 14:28 EST
                      </span>
                    </div>
                  </div>

                  {/* Location Map */}
                  <div className="relative rounded-lg overflow-hidden h-48 bg-surface-container-high flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between z-10">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-[11px] text-primary font-bold backdrop-blur-sm shadow-sm">
                        Ward 4 Transit
                      </span>
                      <span className="w-6 h-6 rounded bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-sm">
                        <Icon name="layers" size="lg" />
                      </span>
                    </div>

                    {/* Animated Pin Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full bg-primary/20 animate-ping absolute"></span>
                        <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg relative z-10">
                          <Icon name="location_on" size="lg" />
                        </div>
                      </div>
                    </div>

                    <div className="z-10 bg-surface-container-lowest/90 backdrop-blur-sm p-1.5 rounded text-left shadow-sm">
                      <span className="font-label-sm text-[10px] text-on-surface font-mono block">
                        37.7749° N, -122.4194° W
                      </span>
                      <span className="font-label-sm text-[10px] text-on-surface-variant block">
                        5th Ave & Elm St (Lane 2)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLA & Priority Card */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
                <div className="rounded-lg bg-surface-container-low p-space-md flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Icon name="timer" size="xl" className="text-secondary" />
                      <span className="font-body-md-bold text-body-md-bold text-on-surface">
                        Municipal SLA Guarantee
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      On Track
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                      29h : 45m
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Remaining of 48h Window
                    </span>
                  </div>

                  <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '38%' }}></div>
                  </div>

                  <div className="flex items-center justify-between font-label-sm text-[12px] text-on-surface-variant">
                    <span>Dispatched 18h ago</span>
                    <span>Deadline: Nov 16, 14:30 EST</span>
                  </div>
                </div>

                {/* Triage Score Gauge */}
                <TriageScoreGauge score={8.4} />
              </div>

              {/* Department Assignment Card */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                    <Icon name="local_shipping" size="xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Assigned Municipal Authority
                    </span>
                    <span className="font-body-md-bold text-body-md-bold text-on-surface">
                      DPW — Roadway Maintenance
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-space-sm pt-2">
                  <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col">
                    <span className="font-label-sm text-[11px] text-on-surface-variant">Field Unit</span>
                    <span className="font-body-md-bold text-body-sm text-on-surface">Ward 4 Crew Bravo</span>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col">
                    <span className="font-label-sm text-[11px] text-on-surface-variant">Dispatch ID</span>
                    <span className="font-body-md-bold text-body-sm text-on-surface">#R-402 (M. Vance)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-1">
                  <span className="flex items-center gap-1.5">
                    <Icon name="phone_in_talk" size="lg" className="text-secondary" />
                    DPW Hotline: (555) 019-4820
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Open 24/7</span>
                </div>
              </div>

              {/* Community Engagement Card */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="flex -space-x-2 overflow-hidden">
                      <span className="inline-block h-8 w-8 rounded-full ring-2 ring-surface bg-surface-container text-on-surface flex items-center justify-center font-label-sm">
                        JD
                      </span>
                      <span className="inline-block h-8 w-8 rounded-full ring-2 ring-surface bg-surface-container-high text-primary flex items-center justify-center font-label-sm">
                        EL
                      </span>
                      <span className="inline-block h-8 w-8 rounded-full ring-2 ring-surface bg-secondary-container text-on-secondary flex items-center justify-center font-label-sm">
                        MR
                      </span>
                      <span className="inline-block h-8 w-8 rounded-full ring-2 ring-surface bg-primary text-on-primary flex items-center justify-center font-label-sm">
                        +4
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-md-bold text-body-sm text-on-surface">7 Citizens Confirmed</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Nearby residents within 100m
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full h-12 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container font-body-md-bold text-body-md flex items-center justify-center gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary" type="button">
                  <Icon name="thumb_up" size="lg" />
                  <span>Upvote / Follow this Report (7)</span>
                </button>

                <p className="font-label-sm text-label-sm text-on-surface-variant text-center">
                  Subscribed residents receive instantaneous push alerts upon crew work completion and photo release.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
