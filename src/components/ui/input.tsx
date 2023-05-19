import React from "react";
import { cn } from "~/utils/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={cn(
        "flex-1 rounded-lg bg-bg-200 py-2 pl-4 text-white outline-none md:px-4",
        className
      )}
    />
  );
});

Input.displayName = "Input";
