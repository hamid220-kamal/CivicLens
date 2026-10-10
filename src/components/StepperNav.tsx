/**
 * StepperNav Component
 * Step indicator tabs with progress bar
 */

import Icon from '@/components/ui/Icon';

interface Step {
  id: number;
  label: string;
}

interface StepperNavProps {
  currentStep: number;
  steps: Step[];
  onStepChange: (step: number) => void;
}

export default function StepperNav({ currentStep, steps, onStepChange }: StepperNavProps) {
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="flex flex-col gap-2 p-space-sm rounded-xl bg-surface-container-lowest shadow-sm">
      {/* Step Tabs */}
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              type="button"
              className={`flex flex-col items-center gap-1 py-1 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary-fixed text-on-primary-fixed-variant'
                  : isCompleted
                    ? 'bg-surface-container text-secondary'
                    : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full font-label-sm text-[11px] flex items-center justify-center ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : isCompleted
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {isCompleted ? (
                  <Icon name="check" size="sm" />
                ) : (
                  step.id
                )}
              </div>
              <span className="font-label-sm text-[11px]">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
