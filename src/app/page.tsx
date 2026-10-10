'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-background via-surface to-background overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 right-0 w-96 h-96 bg-primary-bg rounded-full blur-3xl opacity-40 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-bg rounded-full blur-3xl opacity-30 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Copy & CTAs */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                  See it. Snap it.
                  <br />
                  <span className="text-primary">Get it fixed.</span>
                </h1>
                <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl">
                  Report civic issues—potholes, garbage, sewer overflow—with a photo and GPS location. Get AI-assisted triage with real municipal guidelines and track progress in real-time.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/report"
                  className="px-6 py-3 sm:py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-center min-h-[44px] flex items-center justify-center"
                >
                  Report an Issue
                </Link>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 sm:py-4 bg-surface-alt text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary-bg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-center min-h-[44px] flex items-center justify-center"
                >
                  View Dashboard
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Real municipal guidelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>AI-powered triage</span>
                </div>
              </div>
            </div>

            {/* Right: Phone Mockup Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                {/* Phone frame */}
                <div className="relative bg-text-primary rounded-3xl p-3 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  {/* Screen */}
                  <div className="relative bg-white rounded-2xl overflow-hidden aspect-[9/19] flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
                    {/* Notch */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-text-primary rounded-b-2xl z-20"></div>

                    {/* Content inside phone */}
                    <div className="relative w-full h-full p-4 flex flex-col items-center justify-center space-y-4">
                      {/* Icon grid showing camera + map */}
                      <div className="flex flex-col items-center gap-4 z-10">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>

                      {/* Status badge */}
                      <div className="absolute bottom-8 left-4 right-4 bg-white rounded-lg p-3 shadow-md border border-border">
                        <div className="text-xs font-semibold text-text-primary mb-1">Auto Detected</div>
                        <div className="text-sm text-text-secondary">Pothole • High Priority</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              How it works
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Four simple steps from spotting an issue to resolution.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-background rounded-lg p-6 sm:p-8 border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-lg flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">Snap a Photo</h3>
              <p className="text-text-secondary">Take a clear photo of the civic issue with your phone camera.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-background rounded-lg p-6 sm:p-8 border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-lg flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">Auto Location</h3>
              <p className="text-text-secondary">GPS pinpoints the exact location automatically.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-background rounded-lg p-6 sm:p-8 border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-lg flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">AI Triage + Sources</h3>
              <p className="text-text-secondary">AI analyzes the issue with grounded municipal guidelines.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-background rounded-lg p-6 sm:p-8 border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-lg flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">Track Progress</h3>
              <p className="text-text-secondary">Monitor real-time status updates from municipal teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="w-full py-12 sm:py-16 bg-surface-alt border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm sm:text-base font-semibold text-text-secondary uppercase tracking-wide">
              ✓ Backed by real civic guidelines
            </p>
          </div>

          {/* Citation Chips */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="px-3 sm:px-4 py-2 bg-surface rounded-full border border-border text-xs sm:text-sm text-text-secondary hover:border-primary transition-colors cursor-pointer">
              FHWA Road Standards
            </div>
            <div className="px-3 sm:px-4 py-2 bg-surface rounded-full border border-border text-xs sm:text-sm text-text-secondary hover:border-primary transition-colors cursor-pointer">
              Municipal Code § 15-2
            </div>
            <div className="px-3 sm:px-4 py-2 bg-surface rounded-full border border-border text-xs sm:text-sm text-text-secondary hover:border-primary transition-colors cursor-pointer">
              AASHTO Guidelines
            </div>
            <div className="px-3 sm:px-4 py-2 bg-surface rounded-full border border-border text-xs sm:text-sm text-text-secondary hover:border-primary transition-colors cursor-pointer">
              EPA Waste Rules
            </div>
            <div className="px-3 sm:px-4 py-2 bg-surface rounded-full border border-border text-xs sm:text-sm text-text-secondary hover:border-primary transition-colors cursor-pointer">
              State DOT Manual
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg">
                  CL
                </div>
                <span className="text-xl font-bold text-text-primary">CivicLens</span>
              </div>
              <p className="text-text-secondary text-sm">
                Transforming how citizens and cities collaborate on civic infrastructure.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="/report" className="hover:text-primary transition-colors">Report Issue</Link></li>
                <li><Link href="/track" className="hover:text-primary transition-colors">Track Status</Link></li>
                <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="#privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="#terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="#accessibility" className="hover:text-primary transition-colors">Accessibility</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="#about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#blog" className="hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
            <p>© 2025 CivicLens. All rights reserved.</p>
            <p>Made for transparent, accountable municipal collaboration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
