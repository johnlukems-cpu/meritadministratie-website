import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/cn';

/* -----------------------------------------------------------------------------
   Gedeelde stukken: label, hint, foutmelding
   ---------------------------------------------------------------------------- */

interface FieldWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

function FieldWrapper({ id, label, required, hint, error, children, className }: FieldWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
        {required ? (
          <span className="text-error" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="ml-1 font-normal text-subtle">(optioneel)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const controlBase =
  'w-full rounded-md border bg-surface px-3.5 text-[0.9375rem] text-text placeholder:text-subtle ' +
  'transition-[border-color,box-shadow] duration-150 ' +
  'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 ' +
  'aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/15';

function describedBy(id: string, hint?: string, error?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/* -----------------------------------------------------------------------------
   Input
   ---------------------------------------------------------------------------- */

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, className, ...rest },
  ref,
) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, 'h-12 border-strong')}
        {...rest}
      />
    </FieldWrapper>
  );
});

/* -----------------------------------------------------------------------------
   Textarea
   ---------------------------------------------------------------------------- */

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'> {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, required, className, rows = 5, ...rest },
  ref,
) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlBase, 'min-h-28 resize-y border-strong py-3')}
        {...rest}
      />
    </FieldWrapper>
  );
});

/* -----------------------------------------------------------------------------
   Select
   ---------------------------------------------------------------------------- */

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className'> {
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder = 'Maak een keuze', hint, error, required, className, ...rest },
  ref,
) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <div className="relative">
        <select
          ref={ref}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(controlBase, 'h-12 appearance-none border-strong pr-10')}
          defaultValue={rest.defaultValue ?? ''}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </FieldWrapper>
  );
});

/* -----------------------------------------------------------------------------
   Enkele checkbox (bijv. privacy-akkoord)
   ---------------------------------------------------------------------------- */

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className' | 'type'> {
  label: ReactNode;
  error?: string;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, required, className, ...rest },
  ref,
) {
  const id = useId();
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.9375rem] text-text">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-4 shrink-0 accent-[var(--brand-primary)]"
          {...rest}
        />
        <span>
          {label}
          {required && (
            <span className="text-error" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

/* -----------------------------------------------------------------------------
   Checkbox-groep (meerdere keuzes, bijv. "gewenste diensten")
   ---------------------------------------------------------------------------- */

interface CheckboxGroupProps {
  legend: string;
  name: string;
  options: readonly SelectOption[];
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  value?: string[];
  onChange?: (next: string[]) => void;
}

export function CheckboxGroup({
  legend,
  name,
  options,
  required,
  hint,
  error,
  className,
  value,
  onChange,
}: CheckboxGroupProps) {
  const id = useId();
  const isControlled = value !== undefined;

  return (
    <fieldset
      className={cn('flex flex-col gap-1.5', className)}
      aria-describedby={describedBy(id, hint, error)}
      aria-invalid={error ? true : undefined}
    >
      <legend className="mb-1.5 text-sm font-medium text-text">
        {legend}
        {required && (
          <span className="text-error" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const optId = `${id}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-default px-3.5 py-2.5 text-[0.9375rem] transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary-soft/50 hover:border-strong"
            >
              <input
                id={optId}
                type="checkbox"
                name={name}
                value={opt.value}
                checked={isControlled ? value.includes(opt.value) : undefined}
                onChange={(e) => {
                  if (!onChange || !isControlled) return;
                  onChange(
                    e.target.checked
                      ? [...value, opt.value]
                      : value.filter((v) => v !== opt.value),
                  );
                }}
                className="size-4 shrink-0 accent-[var(--brand-primary)]"
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
