import * as React from "react";
import { cn } from "@/lib/utils";

/** Square-cornered text label. Callers pass the state color; it is only used for real status. */
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-sm border border-border px-1.5 py-0.5 text-xs font-medium", className)}
      {...props}
    />
  );
}
