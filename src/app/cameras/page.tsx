"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { CameraCard } from "@/components/dashboard/camera-card";
import { LiveSimToggle } from "@/components/dashboard/live-sim-toggle";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNoc } from "@/components/providers/noc-provider";

export default function CamerasPage() {
  const { cameras } = useNoc();
  const [query, setQuery] = useState("");
  const [site, setSite] = useState("all");
  const [status, setStatus] = useState("all");

  const sites = useMemo(
    () => Array.from(new Set(cameras.map((c) => c.siteName))),
    [cameras]
  );

  const filtered = cameras.filter((c) => {
    const matchesQuery =
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.siteName.toLowerCase().includes(query.toLowerCase());
    const matchesSite = site === "all" || c.siteName === site;
    const matchesStatus = status === "all" || c.status === status;
    return matchesQuery && matchesSite && matchesStatus;
  });

  return (
    <AppShell title="Camera Monitoring">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-56">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search camera or site..."
              className="h-8 pl-8 text-xs"
            />
          </div>
          <Select value={site} onValueChange={setSite}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Site" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sites</SelectItem>
              {sites.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <LiveSimToggle />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((cam) => (
          <CameraCard key={cam.id} camera={cam} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
            No cameras match your filters.
          </p>
        )}
      </div>
    </AppShell>
  );
}
