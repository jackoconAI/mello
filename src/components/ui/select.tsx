import * as React from "react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-10 w-full rounded-lg border border-[#d6d8d7] bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#f87b4d]/30 focus:border-[#f87b4d] disabled:cursor-not-allowed disabled:opacity-50 transition-colors appearance-none",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
