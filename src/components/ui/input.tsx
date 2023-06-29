import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const errorClass = error
      ? "border-tomato focus:border-tomato text-tomato placeholder:text-tomato bg-[rgba(255,97,85,0.15)]"
      : "";
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-neutral-grey focus:border-dark-slate-grey bg-white pl-6 pr-3 py-2 text-sm text-dark-slate-grey placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-0 h-[56px]",
          className,
          errorClass
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
