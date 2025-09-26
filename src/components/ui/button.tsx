import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 " +
            "disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
