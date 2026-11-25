"use client";

import { useNoc } from "@/components/providers/noc-provider";
import { ONLINE_SITES, TOTAL_SITES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: string;
  change: string;
  vs: string;
  good: boolean;
  alarm?: boolean;
  wide?: boolean;
}

const YESTERDAY_ALERTS = 5; // sample comparison value

export function MetricStrip() {
  const { alerts } = useNoc();
  const open = alerts.filter((a) => a.status !== "resolved");
  const critical = open.some((a) => a.severity === "critical");
  const pct = Math.round(((open.length - YESTERDAY_ALERTS) / YESTERDAY_ALERTS) * 100);

  const metrics: Metric[] = [
    { label: "Sites online", value: `${ONLINE_SITES} / ${TOTAL_SITES}`, change: "+8.3%", vs: "vs last week", good: true },
    { label: "Active alerts", value: String(open.length), change: `${pct >= 0 ? "+" : ""}${pct}%`, vs: "vs yesterday", good: pct <= 0, alarm: critical },
    { label: "AI detections today", value: "1,284", change: "+12.4%", vs: "vs yesterday", good: true },
    { label: "Camera availability", value: "98.4%", change: "-0.3 pts", vs: "vs last 24 h", good: false },
    { label: "Network availability", value: "99.2%", change: "+0.1 pts", vs: "vs last 24 h", good: true, wide: true },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-5">
      {metrics.map((m) => (
        <div key={m.label} className={cn("bg-card px-4 py-3", m.wide && "col-span-2 lg:col-span-1")}>
          <dt className="text-xs text-muted-foreground">{m.label}</dt>
          <dd className={cn("mt-1 font-mono text-2xl", m.alarm && "text-critical")}>{m.value}</dd>
          <dd className="mt-1 text-xs">
            <span className={m.good ? "text-success" : "text-critical"}>{m.change}</span> <span className="text-muted-foreground">{m.vs}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
