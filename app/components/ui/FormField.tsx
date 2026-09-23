// =============================================================================
// FormField — reusable label + input/textarea/select wrapper
// Eliminates repeated label+input markup across all forms
// Usage: <FormField label="Name" id="name" required />
// =============================================================================

import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  id: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode; // for select options
  rows?: number;
}

export function FormField({
  label,
  id,
  error,
  as = "input",
  children,
  rows = 4,
  className,
  ...props
}: FormFieldProps) {
  const inputClass = cn(
    "w-full px-4 py-3 rounded-[10px] bg-white border",
    "text-sm text-[#1c1c1c] placeholder:text-[#9ca3af]",
    "transition-all duration-200",
    error
      ? "border-red-400 focus:ring-red-300"
      : "border-[#e8ddd4] focus:border-[#c8956c] focus:ring-[#c8956c]/20",
    "focus:outline-none focus:ring-2",
    className
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[#1c1c1c]">
        {label}
        {props.required && <span className="text-[#c8956c] ml-0.5">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          rows={rows}
          className={cn(inputClass, "resize-y min-h-[100px]")}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === "select" ? (
        <select
          id={id}
          className={inputClass}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          className={inputClass}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
