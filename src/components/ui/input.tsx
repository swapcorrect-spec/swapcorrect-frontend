import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, startIcon, endIcon, label, ...props }, ref) => {
    return (
      <div className="w-full">
        <p className="font-normal text-[13px]">{label}</p>
        {/* Input wrapper with relative positioning for icons */}
        <div className="relative w-full">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              `flex h-9 w-full rounded-[9.77px] border ${
                error ? "border-red-500" : "border-[#E9E9E9]"
              } bg-transparent px-3 py-6 text-base shadow-sm transition-colors placeholder:text-[#A1A1A1] focus-visible:outline-none focus-visible:border-[#E9E9E9] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                startIcon ? "pl-10" : ""
              } ${endIcon ? "pr-10" : ""}`,
              className
            )}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>

        {/* Error message below input (won't affect icon layout) */}
        {error && (
          <p className="mt-1 text-sm text-red-500 min-h-[1rem]">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
