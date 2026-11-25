"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { MetricStrip } from "@/components/dashboard/metric-strip";
import { CameraCard } from "@/components/dashboard/camera-card";
import { AlertQueue } from "@/components/dashboard/alert-queue";
import { LiveSimToggle } from "@/components/dashboard/live-sim-toggle";
import { useNoc } from "@/components/providers/noc-provider";
import { openAlertsFor, sevRank, worstSeverity } from "@/lib/status";

export default function OverviewPage() {
  const { cameras, alerts } = useNoc();

  // The wall leads with the camera that has the worst open alert; offline counts as a warning.
  const rank = (id: string, online: boolean) => {
    const w = worstSeverity(openAlertsFor(alerts, id));
    return Math.max(w ? sevRank[w] : 0, online ? 0 : 2);
  };
  const wall = cameras
    .slice(0, 4)
    .map((c, i) => ({ c, i, r: rank(c.id, c.online) }))
    .sort((a, b) => b.r - a.r || a.i - b.i)
    .map((x) => x.c);
  const [lead, ...rest] = wall;

  return (
    <AppShell title="Overview">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-sm text-muted-foreground">
            Sample figures for the sites on this console. With simulated events on, a new mock detection arrives every 20 seconds.
          </p>
          <LiveSimToggle />
        </div>

        <MetricStrip />

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <section aria-labelledby="wall-h" className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="wall-h" className="text-sm font-semibold">
                Camera wall
              </h2>
              <Link href="/cameras" className="text-sm font-medium text-primary underline underline-offset-4">
                All {cameras.length} cameras
              </Link>
            </div>
            <CameraCard camera={lead} />
            <div className="grid gap-3 sm:grid-cols-3">
              {rest.map((c) => (
                <CameraCard key={c.id} camera={c} />
              ))}
            </div>
          </section>

          <AlertQueue />
        </div>
      </div>
    </AppShell>
  );
}
