export default function Logo({ size = 'md', showText = true }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
  const sizeMap = {
    sm: { container: 'w-8 h-8', svg: 'w-8 h-8' },
    md: { container: 'w-10 h-10', svg: 'w-10 h-10' },
    lg: { container: 'w-16 h-16', svg: 'w-16 h-16' },
  };

  const { container, svg } = sizeMap[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className={`flex-shrink-0 ${container}`}>
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className={svg}
          fill="none"
        >
          {/* Outer Blue Circle (Camera Lens) */}
          <circle cx="100" cy="100" r="85" fill="#1E40AF" />

          {/* City Skyline Silhouette (Top Rim) */}
          <g clipPath="url(#skylineClip)">
            <path
              d="M 30 100 L 40 80 L 45 85 L 50 70 L 55 75 L 65 60 L 70 65 L 75 55 L 80 60 L 90 50 L 100 55 L 110 45 L 120 50 L 130 60 L 140 55 L 150 70 L 160 65 L 170 85 L 180 80 L 170 100 Q 100 110 30 100 Z"
              fill="white"
              opacity="0.15"
            />
          </g>

          {/* Teal Location Pin */}
          <path
            d="M 100 65 C 91.7 65 85 71.7 85 80 C 85 92 100 110 100 110 C 100 110 115 92 115 80 C 115 71.7 108.3 65 100 65 Z"
            fill="#0D9488"
          />

          {/* Camera Aperture (White Circle in Pin Center) */}
          <circle cx="100" cy="80" r="10" fill="white" />

          {/* Aperture Lines */}
          <circle cx="100" cy="80" r="10" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <line x1="100" y1="70" x2="100" y2="90" stroke="white" strokeWidth="1" opacity="0.4" />
          <line x1="90" y1="80" x2="110" y2="80" stroke="white" strokeWidth="1" opacity="0.4" />

          {/* Lens Ring Detail */}
          <circle cx="100" cy="100" r="85" fill="none" stroke="white" strokeWidth="2.5" opacity="0.2" />

          {/* Inner Lens Circle */}
          <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="1.5" opacity="0.15" />

          <defs>
            <clipPath id="skylineClip">
              <rect x="30" y="60" width="150" height="50" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <div className="flex-shrink-0">
          <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" className={size === 'sm' ? 'w-24' : size === 'md' ? 'w-32' : 'w-48'}>
            {/* "Civic" in Deep Blue */}
            <text
              x="0"
              y="90"
              fontFamily="Inter, -apple-system, system-ui, sans-serif"
              fontSize="72"
              fontWeight="700"
              fill="#1E40AF"
              letterSpacing="-1"
            >
              Civic
            </text>

            {/* "Lens" in Teal */}
            <text
              x="210"
              y="90"
              fontFamily="Inter, -apple-system, system-ui, sans-serif"
              fontSize="72"
              fontWeight="700"
              fill="#0D9488"
              letterSpacing="-1"
            >
              Lens
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}
