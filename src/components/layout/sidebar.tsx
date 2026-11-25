"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { useNoc } from "@/components/providers/noc-provider";
import { ONLINE_SITES, TOTAL_SITES } from "@/lib/mock-data";

export const NAV = [
  { href: "/", label: "Overview" },
  { href: "/cameras", label: "Camera Monitoring" },
  { href: "/alerts", label: "Alerts & Incidents" },
  { href: "/sites", label: "Site Health" },
  { href: "/analytics", label: "Analytics" },
];

function NavLinks({ row }: { row?: boolean }) {
  const pathname = usePathname();
  const { alerts } = useNoc();
  const open = alerts.filter((a) => a.status !== "resolved").length;
  return (
    <ul className={cn(row ? "flex gap-1" : "space-y-0.5")}>
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center justify-between gap-3 rounded-md px-3 text-sm",
                active ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <span className="whitespace-nowrap">{item.label}</span>
              {item.href === "/alerts" && open > 0 && (
                <span className="font-mono text-xs text-foreground" aria-label={`${open} open alerts`}>
                  {open}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function MobileNav() {
  return (
    <nav aria-label="Main" className="overflow-x-auto border-b border-border px-2 py-1 lg:hidden">
      <NavLinks row />
    </nav>
  );
}

export function Sidebar() {
  const { sites } = useNoc();
  const critical = sites.filter((s) => s.status === "critical").length;
  const warning = sites.filter((s) => s.status === "warning").length;
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <div className="px-5 py-5">
        <p className="text-base font-semibold">Smart NOC</p>
        <p className="text-xs text-muted-foreground">Network Operations Center</p>
      </div>

      <nav aria-label="Main" className="flex-1 px-3">
        <NavLinks />
      </nav>

      <div className="space-y-4 border-t border-border p-4">
        <div className="text-xs">
          <p className="mb-1 font-medium text-muted-foreground">System status</p>
          <p>
            {ONLINE_SITES} of {TOTAL_SITES} sites online
          </p>
          <p className="text-muted-foreground">
            {critical} critical, {warning} warning in the {sites.length} sites listed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar initials="OP" />
          <div className="text-xs">
            <p className="font-medium">NOC Operator</p>
            <p className="text-muted-foreground">Day shift (sample profile)</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
