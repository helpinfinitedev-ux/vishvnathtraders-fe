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
  inputSize?: "sm" | "md" | "lg";
}

export function FormField({
  label,
  id,
  error,
  as = "input",
  children,
  rows = 4,
  className,
  inputSize = "md",
  ...props
}: FormFieldProps) {
  const inputClass = cn(
    "w-full bg-white border transition-all duration-200",
    "text-[#1c1c1c] placeholder:text-[#9ca3af]",
    error
      ? "border-red-400 focus:ring-red-300"
      : "border-[#e8ddd4] focus:border-[#c8956c] focus:ring-[#c8956c]/20",
    "focus:outline-none focus:ring-2",
    className
  );

  const inputStyle = inputSize === "lg" 
    ? { padding: "1rem 1.25rem", borderRadius: "14px", fontSize: "1.05rem", minHeight: "3.5rem" }
    : { padding: "0.75rem 1rem", borderRadius: "10px", fontSize: "0.875rem", minHeight: "2.75rem" };

  const labelStyle = inputSize === "lg" 
    ? { fontSize: "1.05rem", display: "block", marginBottom: "0.5rem" }
    : { fontSize: "0.875rem", display: "block", marginBottom: "0.375rem" };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-[#1c1c1c]" style={labelStyle}>
        {label}
        {props.required && <span className="text-[#c8956c] ml-0.5">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          rows={rows}
          className={cn(inputClass, "resize-y")}
          style={{ ...inputStyle, minHeight: "100px" }}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === "select" ? (
        <select
          id={id}
          className={inputClass}
          style={inputStyle}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          className={inputClass}
          style={inputStyle}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
