"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "url" | "date" | "tel" | "textarea" | "select";
  placeholder?: string;
  hint?: string;
  options?: { value: string; label: string }[];
}

export function FormField({
  name,
  label,
  required,
  type = "text",
  placeholder,
  hint,
  options,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="flex items-center gap-1">
        {label}
        {required && <span className="text-[#f87b4d]">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className={error ? "border-red-400 focus:ring-red-400/30 focus:border-red-400" : ""}
        />
      ) : type === "select" && options ? (
        <Select
          id={name}
          {...register(name)}
          className={error ? "border-red-400 focus:ring-red-400/30 focus:border-red-400" : ""}
        >
          <option value="">Select…</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={error ? "border-red-400 focus:ring-red-400/30 focus:border-red-400" : ""}
        />
      )}

      {hint && !error && (
        <p className="text-xs text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500">{error.message as string}</p>
      )}
    </div>
  );
}
