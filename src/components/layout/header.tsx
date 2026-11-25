"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LiveClock } from "@/components/layout/live-clock";
import { useNoc } from "@/components/providers/noc-provider";
import { relTime, sevRank, sevText } from "@/lib/status";

const SEARCHABLE = ["/alerts", "/cameras", "/sites"];

export function Header({ title }: { title: string }) {
  const { alerts, sites, now, query, setQuery } = useNoc();
  const pathname = usePathname();
  const router = useRouter();

  const open = alerts
    .filter((a) => a.status !== "resolved")
    .sort((a, b) => sevRank[b.severity] - sevRank[a.severity] || b.at - a.at);

  const critical = sites.some((s) => s.status === "critical");
  const warning = sites.some((s) => s.status === "warning");
  const state = critical
    ? { text: "Degraded", dot: "bg-critical" }
    : warning
      ? { text: "Partial", dot: "bg-warning" }
      : { text: "Operational", dot: "bg-success" };

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border bg-background px-4 py-3 md:px-6">
      <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>

      <div className="flex items-center gap-4">
        <LiveClock withDate className="hidden font-mono text-xs text-muted-foreground xl:block" />
        <p className="flex items-center gap-2 text-sm">
          <span className={`h-2 w-2 rounded-full ${state.dot}`} aria-hidden="true" />
          <span className="sr-only">System status: </span>
          {state.text}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Notifications, ${open.length} open alerts`}
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-secondary"
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            {open.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 min-w-5 rounded-sm bg-critical px-1 text-center font-mono text-[11px] font-semibold leading-5 text-background">
                {open.length}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Open alerts, worst first</DropdownMenuLabel>
            {open.length === 0 && <p className="px-3 py-4 text-sm text-muted-foreground">Nothing open. New detections show up here.</p>}
            {open.slice(0, 5).map((a) => (
              <DropdownMenuItem key={a.id} asChild>
                <Link href="/alerts">
                  <span className="flex justify-between gap-3">
                    <span className="font-medium">{a.title}</span>
                    <span className={`shrink-0 text-xs ${sevText[a.severity]}`}>{a.severity}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {a.siteName}, {relTime(a.at, now)}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
            {open.length > 0 && (
              <DropdownMenuItem asChild className="border-t border-border text-sm font-medium">
                <Link href="/alerts">Open all {open.length} in Alerts &amp; Incidents</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <form
        role="search"
        className="order-last flex w-full items-center gap-2 md:order-none md:w-80"
        onSubmit={(e) => {
          e.preventDefault();
          if (!SEARCHABLE.includes(pathname)) router.push("/alerts");
        }}
      >
        <label htmlFor="global-search" className="shrink-0 text-xs text-muted-foreground">
          Search
        </label>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="global-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Alerts, cameras, sites"
            className="pl-9"
          />
        </div>
      </form>
    </header>
  );
}
