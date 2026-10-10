'use client';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export default function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        return (
          <div key={step} className="flex items-center flex-1">
            {/* Step Circle */}
            <button
              onClick={() => onStepClick?.(stepNumber)}
              disabled={isUpcoming}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] ${
                isCurrent
                  ? 'bg-primary text-white ring-4 ring-primary-bg'
                  : isComplete
                    ? 'bg-success text-white'
                    : 'bg-surface-alt text-text-secondary border border-border'
              } ${isUpcoming ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              {isComplete ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                stepNumber
              )}
            </button>

            {/* Label */}
            <span className={`ml-2 text-xs sm:text-sm font-semibold ${isCurrent ? 'text-primary' : isComplete ? 'text-success' : 'text-text-tertiary'}`}>
              {step}
            </span>

            {/* Divider */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded-full ${isComplete ? 'bg-success' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
