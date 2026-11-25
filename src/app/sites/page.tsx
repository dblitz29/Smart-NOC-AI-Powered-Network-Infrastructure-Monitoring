"use client";

import { AppShell } from "@/components/layout/app-shell";
import { SiteCard } from "@/components/dashboard/site-card";
import { SITES } from "@/lib/mock-data";

export default function SitesPage() {
  return (
    <AppShell title="Site Health">
      <p className="mb-5 text-sm text-muted-foreground">
        Simulated telemetry for {SITES.length} monitored sites across Indonesia.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SITES.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </AppShell>
  );
}
