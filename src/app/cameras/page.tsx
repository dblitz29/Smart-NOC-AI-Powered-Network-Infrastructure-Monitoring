"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { CameraCard } from "@/components/dashboard/camera-card";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterSelect } from "@/components/dashboard/filter-select";
import { LiveSimToggle } from "@/components/dashboard/live-sim-toggle";
import { Button } from "@/components/ui/button";
import { useNoc } from "@/components/providers/noc-provider";
import { openAlertsFor } from "@/lib/status";

export default function CamerasPage() {
  const { cameras, sites, alerts, query, setQuery } = useNoc();
  const [site, setSite] = useState("all");
  const [status, setStatus] = useState("all");

  const q = query.trim().toLowerCase();
  const rows = cameras.filter((c) => {
    const hit = !q || `${c.id} ${c.siteName} ${c.view}`.toLowerCase().includes(q);
    const bySite = site === "all" || c.siteId === site;
    const byStatus =
      status === "all" ||
      (status === "online" && c.online) ||
      (status === "offline" && !c.online) ||
      (status === "alerting" && openAlertsFor(alerts, c.id).length > 0);
    return hit && bySite && byStatus;
  });
  const reset = () => {
    setQuery("");
    setSite("all");
    setStatus("all");
  };

  return (
    <AppShell title="Camera Monitoring">
      <div className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap items-end gap-3">
            <FilterSelect
              id="cam-site"
              label="Site"
              value={site}
              onChange={setSite}
              options={[{ value: "all", label: "All sites" }, ...sites.map((s) => ({ value: s.id, label: s.name }))]}
            />
            <FilterSelect
              id="cam-status"
              label="Status"
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: "All cameras" },
                { value: "online", label: "Online" },
                { value: "offline", label: "Offline" },
                { value: "alerting", label: "With open alerts" },
              ]}
            />
            <p className="pb-2.5 text-sm text-muted-foreground" role="status">
              {rows.length} of {cameras.length} cameras
            </p>
          </div>
          <LiveSimToggle />
        </div>

        <h2 className="sr-only">Camera feeds</h2>
        {rows.length === 0 ? (
          <EmptyState
            title="No cameras match"
            hint="Nothing fits the current search and filters. Clear them to see every camera again."
            action={<Button variant="outline" onClick={reset}>Clear search and filters</Button>}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rows.map((c) => (
              <CameraCard key={c.id} camera={c} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
