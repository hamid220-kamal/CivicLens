'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-lg group-hover:bg-primary-dark transition-colors">
              CL
            </div>
            <span className="text-xl font-bold text-text-primary hidden sm:inline group-hover:text-primary transition-colors">
              CivicLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-text-secondary hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/report" className="text-text-secondary hover:text-primary transition-colors font-medium">
              Report Issue
            </Link>
            <Link href="/track" className="text-text-secondary hover:text-primary transition-colors font-medium">
              Track
            </Link>
            <Link href="/dashboard" className="text-text-secondary hover:text-primary transition-colors font-medium">
              Dashboard
            </Link>
          </div>

          {/* Primary CTA Button */}
          <div className="hidden sm:block">
            <Link
              href="/report"
              className="px-4 py-2 md:px-6 md:py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[44px] flex items-center justify-center"
            >
              Report an Issue
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-surface-alt rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link href="/" className="block px-4 py-2 text-text-secondary hover:text-primary hover:bg-surface-alt rounded transition-colors">
              Home
            </Link>
            <Link href="/report" className="block px-4 py-2 text-text-secondary hover:text-primary hover:bg-surface-alt rounded transition-colors">
              Report Issue
            </Link>
            <Link href="/track" className="block px-4 py-2 text-text-secondary hover:text-primary hover:bg-surface-alt rounded transition-colors">
              Track
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 text-text-secondary hover:text-primary hover:bg-surface-alt rounded transition-colors">
              Dashboard
            </Link>
            <Link
              href="/report"
              className="block mx-4 mt-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors text-center"
            >
              Report an Issue
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
