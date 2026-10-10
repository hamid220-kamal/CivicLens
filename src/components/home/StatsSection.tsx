/**
 * StatsSection Component
 * Displays social proof metrics and statistics
 * 
 * @component
 * @example
 * <StatsSection />
 */

interface StatCard {
  number: string;
  label: string;
  icon: string;
}

const stats: StatCard[] = [
  {
    number: '3.4k',
    label: 'Active Citizens',
    icon: '👥',
  },
  {
    number: '98.1%',
    label: 'Success Rate',
    icon: '✓',
  },
  {
    number: '42+',
    label: 'Issues Resolved',
    icon: '🎯',
  },
];

export default function StatsSection() {
  return (
    <section
      className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-primary-bg via-background to-accent-bg"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="stats-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          >
            Trusted by Communities
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of citizens making a real difference in their neighborhoods
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 sm:p-6 rounded-lg bg-surface border border-border hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {/* Icon */}
              <div
                className="text-4xl sm:text-5xl mb-4"
                role="img"
                aria-label={stat.label}
              >
                {stat.icon}
              </div>

              {/* Number */}
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>

              {/* Label */}
              <p className="text-lg text-text-secondary font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-border flex flex-col sm:flex-row justify-around items-center gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏛️</span>
            <span>Partnered with 15+ Municipal Departments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span>GDPR & Privacy Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
