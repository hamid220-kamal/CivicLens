/**
 * RecentResolutions Component
 * Displays 3 case studies of recently resolved civic issues
 * 
 * @component
 * @example
 * <RecentResolutions caseStudies={[...]} />
 */

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  location: string;
  resolvedDate: string;
  issueType: 'Pothole' | 'Drainage' | 'Street Light' | 'Sidewalk';
  impact: string;
  bgGradient: string;
  icon: string;
}

export interface RecentResolutionsProps {
  caseStudies?: CaseStudy[];
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: 'case-001',
    title: 'Major Pothole Fixed on Main Street',
    description: 'Community reported dangerous pothole affecting 200+ daily commuters. Fixed within 48 hours.',
    location: 'Main Street, Downtown',
    resolvedDate: 'Resolved Oct 8, 2026',
    issueType: 'Pothole',
    impact: '200+ Citizens Helped',
    bgGradient: 'from-blue-500/10 to-blue-600/10',
    icon: '🚗',
  },
  {
    id: 'case-002',
    title: 'Broken Street Light Replaced',
    description: 'Safety concern in residential area. Street light replaced to improve nighttime visibility and security.',
    location: 'Oak Avenue, North Side',
    resolvedDate: 'Resolved Oct 5, 2026',
    issueType: 'Street Light',
    impact: '150+ Citizens Safer',
    bgGradient: 'from-yellow-500/10 to-orange-600/10',
    icon: '💡',
  },
  {
    id: 'case-003',
    title: 'Drainage Issue in Park Resolved',
    description: 'Flooding during rain causing park closure. Drainage system repaired, park reopened to community.',
    location: 'Central Park, Midtown',
    resolvedDate: 'Resolved Oct 2, 2026',
    issueType: 'Drainage',
    impact: '500+ Citizens Happy',
    bgGradient: 'from-green-500/10 to-emerald-600/10',
    icon: '💧',
  },
];

export default function RecentResolutions({
  caseStudies = defaultCaseStudies,
}: RecentResolutionsProps) {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 bg-background"
      aria-labelledby="resolutions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="resolutions-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          >
            Recent Resolutions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            See how communities like yours are solving real issues together
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy) => (
            <article
              key={caseStudy.id}
              className={`bg-gradient-to-br ${caseStudy.bgGradient} border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col`}
            >
              {/* Image Placeholder */}
              <div className="h-48 sm:h-56 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-b border-border relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-pattern" />
                <span className="text-6xl sm:text-7xl" role="img" aria-hidden="true">
                  {caseStudy.icon}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                {/* Badge */}
                <div className="inline-flex w-fit">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
                    {caseStudy.issueType}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 leading-snug">
                  {caseStudy.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4">
                  {caseStudy.description}
                </p>

                {/* Location & Date */}
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <span>📍</span>
                    <span>{caseStudy.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary text-sm">
                    <span>✓</span>
                    <span className="font-semibold">{caseStudy.resolvedDate}</span>
                  </div>
                </div>

                {/* Impact */}
                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  <span className="text-lg">👥</span>
                  <span className="text-base font-bold text-primary">
                    {caseStudy.impact}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            className="inline-block bg-primary text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold hover:bg-primary-dark hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="View all resolved cases"
          >
            View All Cases →
          </button>
        </div>
      </div>
    </section>
  );
}
