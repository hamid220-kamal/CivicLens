/**
 * TriageScoreGauge Component
 * SVG-based radial progress gauge showing AI triage confidence score (0-10)
 */

interface TriageScoreGaugeProps {
  score: number; // 0-10
  maxScore?: number;
  label?: string;
  sublabel?: string;
}

export default function TriageScoreGauge({
  score,
  maxScore = 10,
  label = 'Triage Confidence',
  sublabel = 'AI Assessment',
}: TriageScoreGaugeProps) {
  // Calculate circumference for stroke-dasharray animation
  const circumference = 2 * Math.PI * 40; // radius=40
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  return (
    <div className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-container-low">
      {/* SVG Arc Gauge */}
      <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            fill="none"
            r="40"
            stroke="#dae2fd"
            strokeLinecap="round"
            strokeWidth="8"
          />
          {/* Progress Arc */}
          <circle
            className="transition-all duration-1000 ease-out"
            cx="50"
            cy="50"
            fill="none"
            r="40"
            stroke="#1e40af"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth="8"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold leading-none">
            {score.toFixed(1)}
          </span>
          <span className="font-label-sm text-[10px] text-on-surface-variant leading-none mt-1">
            out of {maxScore}
          </span>
        </div>
      </div>

      {/* Metrics List */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center justify-between font-label-sm text-[11px]">
          <span className="text-on-surface-variant">Structural Hazard</span>
          <span className="font-body-md-bold text-on-surface">8.8</span>
        </div>
        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '88%' }}></div>
        </div>

        <div className="flex items-center justify-between font-label-sm text-[11px] pt-1">
          <span className="text-on-surface-variant">Traffic Lane Impact</span>
          <span className="font-body-md-bold text-on-surface">8.1</span>
        </div>
        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '81%' }}></div>
        </div>

        <div className="flex items-center justify-between font-label-sm text-[11px] pt-1">
          <span className="text-on-surface-variant">Rain Vulnerability</span>
          <span className="font-body-md-bold text-on-surface">8.5</span>
        </div>
        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-secondary rounded-full" style={{ width: '85%' }}></div>
        </div>
      </div>
    </div>
  );
}
