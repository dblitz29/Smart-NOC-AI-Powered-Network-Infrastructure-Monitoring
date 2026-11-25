"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterSelect } from "@/components/dashboard/filter-select";
import { SitesTable } from "@/components/dashboard/sites-table";
import { Button } from "@/components/ui/button";
import { useNoc } from "@/components/providers/noc-provider";
import { TOTAL_SITES } from "@/lib/mock-data";
import { siteRank } from "@/lib/status";

export default function SitesPage() {
  const { sites, query, setQuery } = useNoc();
  const [status, setStatus] = useState("all");

  const q = query.trim().toLowerCase();
  const rows = sites
    .filter((s) => (!q || `${s.id} ${s.name} ${s.region}`.toLowerCase().includes(q)) && (status === "all" || s.status === status))
    .sort((a, b) => siteRank[b.status] - siteRank[a.status] || a.name.localeCompare(b.name));

  return (
    <AppShell title="Site Health">
      <div className="space-y-5">
        <div className="flex flex-wrap items-end gap-3">
          <FilterSelect id="s-status" label="Status" value={status} onChange={setStatus} options={[
            { value: "all", label: "All statuses" },
            { value: "critical", label: "Critical" },
            { value: "warning", label: "Warning" },
            { value: "healthy", label: "Healthy" },
          ]} />
          <p className="pb-2.5 text-sm text-muted-foreground" role="status">
            {rows.length} of {sites.length} sites listed, worst first. The network has {TOTAL_SITES} sites; sample telemetry covers these {sites.length}.
          </p>
        </div>

        {rows.length === 0 ? (
          <EmptyState
            title="No sites match"
            hint="Nothing fits the current search and status filter."
            action={<Button variant="outline" onClick={() => { setQuery(""); setStatus("all"); }}>Clear search and filter</Button>}
          />
        ) : (
          <SitesTable rows={rows} />
        )}
      </div>
    </AppShell>
  );
}
