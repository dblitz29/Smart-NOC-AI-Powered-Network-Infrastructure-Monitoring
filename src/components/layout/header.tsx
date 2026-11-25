"use client";

import { useEffect, useState } from "react";
import { Bell, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNoc } from "@/components/providers/noc-provider";

export function Header({ title }: { title: string }) {
  const { alerts } = useNoc();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const unresolved = alerts.filter((a) => a.status !== "resolved").slice(0, 5);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card/60 px-6">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search sites, cameras, alerts..." className="pl-8" />
        </div>

        <div className="hidden items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground md:flex">
          <Clock className="h-3.5 w-3.5" />
          {now
            ? now.toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "--"}
        </div>

        <Badge variant="success" className="hidden sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Operational
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary/40 hover:bg-secondary/70">
              <Bell className="h-4 w-4" />
              {unresolved.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-critical text-[9px] font-bold text-white">
                  {unresolved.length}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {unresolved.length === 0 && (
              <p className="px-2 py-3 text-xs text-muted-foreground">No active alerts.</p>
            )}
            {unresolved.map((a) => (
              <DropdownMenuItem key={a.id} className="flex-col items-start gap-0.5">
                <span className="font-medium text-foreground">{a.title}</span>
                <span className="text-muted-foreground">
                  {a.siteName} · {a.timestamp}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
