"use client";

import { Activity } from "lucide-react";
import { useNoc } from "@/components/providers/noc-provider";
import { cn } from "@/lib/utils";

export function LiveSimToggle() {
  const { liveSimulation, setLiveSimulation } = useNoc();

  return (
    <button
      onClick={() => setLiveSimulation(!liveSimulation)}
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
        liveSimulation
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-secondary/40 text-muted-foreground"
      )}
    >
      <Activity className={cn("h-3.5 w-3.5", liveSimulation && "animate-pulse-dot")} />
      {liveSimulation ? "Live Simulation: ON" : "Live Simulation: OFF"}
    </button>
  );
}
