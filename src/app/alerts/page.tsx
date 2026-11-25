"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { AlertRow } from "@/components/dashboard/alert-row";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNoc } from "@/components/providers/noc-provider";

export default function AlertsPage() {
  const { alerts } = useNoc();
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = alerts.filter((a) => {
    const matchesQuery =
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.siteName.toLowerCase().includes(query.toLowerCase()) ||
      a.cameraId.toLowerCase().includes(query.toLowerCase());
    const matchesSeverity = severity === "all" || a.severity === severity;
    const matchesStatus = status === "all" || a.status === status;
    return matchesQuery && matchesSeverity && matchesStatus;
  });

  return (
    <AppShell title="Alerts & Incidents">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search alerts, site, camera..."
            className="h-8 pl-8 text-xs"
          />
        </div>
        <Select value={severity} onValueChange={setSeverity}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All severity</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="acknowledged">Acknowledged</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">{filtered.length} results</span>
      </div>

      <div className="space-y-2">
        {filtered.map((a) => (
          <AlertRow key={a.id} alert={a} />
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No alerts match your filters.
          </p>
        )}
      </div>
    </AppShell>
  );
}
