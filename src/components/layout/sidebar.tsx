"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Siren,
  Server,
  BarChart3,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNoc } from "@/components/providers/noc-provider";

const NAV_ITEMS = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/cameras", label: "Camera Monitoring", icon: Video },
  { href: "/alerts", label: "Alerts & Incidents", icon: Siren },
  { href: "/sites", label: "Site Health", icon: Server },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { alerts } = useNoc();
  const activeAlerts = alerts.filter((a) => a.status !== "resolved").length;

  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-card lg:flex">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Radio className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Smart NOC</p>
          <p className="text-[11px] text-muted-foreground">Network Operations Center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.label}
              </span>
              {item.href === "/alerts" && activeAlerts > 0 && (
                <span className="rounded-full bg-critical/15 px-1.5 py-0.5 text-[10px] font-semibold text-critical">
                  {activeAlerts}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-4 py-3">
        <div className="mb-3 flex items-center gap-2 rounded-md bg-secondary/40 px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-success" />
          </span>
          <div className="text-xs">
            <p className="font-medium text-foreground">All Systems Operational</p>
            <p className="text-muted-foreground">24 / 26 sites online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <p className="font-medium text-foreground">Andi Rahman</p>
            <p className="text-muted-foreground">NOC Engineer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
