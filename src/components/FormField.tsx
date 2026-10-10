/**
 * FormField Component
 * Reusable form input wrapper with label and helper text
 */

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  helperText?: string;
  icon?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  showCounter?: boolean;
}

import Icon from '@/components/ui/Icon';

export default function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  helperText,
  icon,
  error,
  required,
  disabled,
  maxLength,
  showCounter,
}: FormFieldProps) {
  const charCount = value ? value.length : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-label-md text-label-md text-on-surface">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
        {showCounter && maxLength && (
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {charCount} / {maxLength}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        {icon && (
          <Icon
            name={icon}
            size="md"
            className="absolute left-3 text-on-surface-variant pointer-events-none"
          />
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          maxLength={maxLength}
          disabled={disabled}
          className={`w-full h-12 ${icon ? 'pl-10' : 'pl-4'} pr-4 bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface shadow-sm focus:outline-none focus:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-2 border-error' : ''
          }`}
        />
      </div>

      {helperText && !error && (
        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
          {helperText}
        </p>
      )}

      {error && (
        <p className="font-body-sm text-body-sm text-error flex items-center gap-1">
          <Icon name="error" size="sm" />
          {error}
        </p>
      )}
    </div>
  );
}
