import { cn } from "@/lib/utils";

/** Initials placeholder. No photo is invented for a user (R-23). */
export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-semibold",
        className
      )}
    >
      {initials}
    </span>
  );
}
