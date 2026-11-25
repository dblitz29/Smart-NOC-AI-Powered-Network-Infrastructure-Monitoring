"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AlertsTable } from "@/components/dashboard/alerts-table";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterSelect } from "@/components/dashboard/filter-select";
import { LiveSimToggle } from "@/components/dashboard/live-sim-toggle";
import { Button } from "@/components/ui/button";
import { useNoc } from "@/components/providers/noc-provider";
import { sevRank } from "@/lib/status";

const WITHIN: Record<string, number> = { "60": 60, "360": 360, "1440": 1440 };

export default function AlertsPage() {
  const { alerts, sites, now, query, setQuery } = useNoc();
  const [severity, setSeverity] = useState("all");
  const [status, setStatus] = useState("open");
  const [site, setSite] = useState("all");
  const [time, setTime] = useState("all");

  const q = query.trim().toLowerCase();
  const rows = alerts
    .filter((a) => {
      const hit = !q || `${a.id} ${a.title} ${a.detection ?? ""} ${a.siteName} ${a.cameraId}`.toLowerCase().includes(q);
      const bySev = severity === "all" || a.severity === severity;
      const byStatus = status === "all" || (status === "open" ? a.status !== "resolved" : a.status === status);
      const bySite = site === "all" || a.siteId === site;
      const byTime = time === "all" || (now - a.at) / 60000 <= WITHIN[time];
      return hit && bySev && byStatus && bySite && byTime;
    })
    .sort((a, b) => sevRank[b.severity] - sevRank[a.severity] || b.at - a.at);

  const showAll = () => {
    setQuery("");
    setSeverity("all");
    setStatus("all");
    setSite("all");
    setTime("all");
  };

  return (
    <AppShell title="Alerts & Incidents">
      <div className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-wrap items-end gap-3">
            <FilterSelect id="f-sev" label="Severity" value={severity} onChange={setSeverity} options={[
              { value: "all", label: "All severities" },
              { value: "critical", label: "Critical" },
              { value: "warning", label: "Warning" },
              { value: "info", label: "Info" },
            ]} />
            <FilterSelect id="f-status" label="Status" value={status} onChange={setStatus} options={[
              { value: "open", label: "Open (new + acknowledged)" },
              { value: "new", label: "New" },
              { value: "acknowledged", label: "Acknowledged" },
              { value: "resolved", label: "Resolved" },
              { value: "all", label: "All" },
            ]} />
            <FilterSelect id="f-site" label="Site" value={site} onChange={setSite} options={[
              { value: "all", label: "All sites" },
              ...sites.map((s) => ({ value: s.id, label: s.name })),
            ]} />
            <FilterSelect id="f-time" label="Detected" value={time} onChange={setTime} options={[
              { value: "all", label: "Any time" },
              { value: "60", label: "Last hour" },
              { value: "360", label: "Last 6 hours" },
              { value: "1440", label: "Last 24 hours" },
            ]} />
            <p className="pb-2.5 text-sm text-muted-foreground" role="status">
              {rows.length} of {alerts.length} alerts
            </p>
          </div>
          <LiveSimToggle />
        </div>

        <h2 className="sr-only">Alert list</h2>
        {rows.length === 0 ? (
          <EmptyState
            title={status === "open" && alerts.every((a) => a.status === "resolved") ? "No open alerts" : "No alerts match"}
            hint="Nothing fits the current search and filters. Show everything, including resolved alerts, to start over."
            action={<Button variant="outline" onClick={showAll}>Show all alerts</Button>}
          />
        ) : (
          <AlertsTable rows={rows} />
        )}
      </div>
    </AppShell>
  );
}
