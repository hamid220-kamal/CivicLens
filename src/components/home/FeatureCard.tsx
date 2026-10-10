/**
 * FeatureCard Component
 * Reusable card for displaying features in the "How It Works" section
 * 
 * @component
 * @example
 * <FeatureCard
 *   icon={<CameraIcon />}
 *   title="Snap a Photo"
 *   description="Take a clear photo of the civic issue"
 * />
 */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor?: 'primary' | 'accent';
}

export default function FeatureCard({
  icon,
  title,
  description,
  iconBgColor = 'primary',
}: FeatureCardProps) {
  const bgColorClass = iconBgColor === 'accent' ? 'bg-accent' : 'bg-primary';

  return (
    <div className="bg-background rounded-lg p-6 sm:p-8 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      {/* Icon Container */}
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 ${bgColorClass} rounded-lg flex items-center justify-center text-white mb-4 flex-shrink-0`}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
