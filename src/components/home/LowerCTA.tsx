/**
 * LowerCTA Component
 * Lower call-to-action section: "Ready to make your neighborhood safer?"
 * 
 * @component
 * @example
 * <LowerCTA
 *   heading="Ready to make your neighborhood safer?"
 *   description="Join thousands of citizens reporting and resolving civic issues together."
 *   buttonText="Start Reporting Now"
 *   onCtaClick={() => router.push('/report')}
 * />
 */

import Link from 'next/link';

export interface LowerCTAProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  buttonHref?: string;
  secondaryButtonHref?: string;
  onCtaClick?: () => void;
}

export default function LowerCTA({
  heading = 'Ready to make your neighborhood safer?',
  description = 'Join thousands of citizens reporting and resolving civic issues in your community.',
  buttonText = 'Start Reporting Now',
  secondaryButtonText = 'Learn More',
  buttonHref = '/report',
  secondaryButtonHref = '/dashboard',
  onCtaClick,
}: LowerCTAProps) {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-primary via-primary-dark to-accent overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2
          id="cta-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {heading}
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button */}
          <Link
            href={buttonHref}
            onClick={onCtaClick}
            className="inline-flex items-center justify-center bg-white text-primary px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary w-full sm:w-auto"
          >
            {buttonText}
            <span className="ml-2">→</span>
          </Link>

          {/* Secondary Button */}
          <Link
            href={secondaryButtonHref}
            className="inline-flex items-center justify-center border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-lg hover:bg-white/10 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary w-full sm:w-auto"
          >
            {secondaryButtonText}
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>98.1% Success Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            <span>Your Data is Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>Quick & Easy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
