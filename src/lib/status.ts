import type { Severity, SiteStatus } from "./types";

export function severityBadgeVariant(s: Severity): "critical" | "warning" | "info" {
  if (s === "critical") return "critical";
  if (s === "warning") return "warning";
  return "info";
}

export function siteStatusColor(s: SiteStatus) {
  if (s === "critical") return "text-critical";
  if (s === "warning") return "text-warning";
  return "text-success";
}

export function siteStatusDot(s: SiteStatus) {
  if (s === "critical") return "bg-critical";
  if (s === "warning") return "bg-warning";
  return "bg-success";
}

export function severityDot(s: Severity) {
  if (s === "critical") return "bg-critical";
  if (s === "warning") return "bg-warning";
  return "bg-primary";
}
