"use client";

import { useNoc } from "@/components/providers/noc-provider";
import { cn } from "@/lib/utils";

export function LiveSimToggle() {
  const { liveSimulation, setLiveSimulation } = useNoc();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={liveSimulation}
      aria-label="Simulated live events"
      onClick={() => setLiveSimulation(!liveSimulation)}
      className="flex min-h-10 items-center gap-3 rounded-md border border-border px-3 text-sm hover:bg-secondary"
    >
      Simulated live events
      <span className="font-mono text-xs text-muted-foreground">{liveSimulation ? "On" : "Off"}</span>
      <span className={cn("flex h-5 w-9 items-center rounded-full p-0.5", liveSimulation ? "bg-primary" : "bg-secondary")} aria-hidden="true">
        <span className={cn("h-4 w-4 rounded-full bg-background transition-transform", liveSimulation && "translate-x-4")} />
      </span>
    </button>
  );
}
