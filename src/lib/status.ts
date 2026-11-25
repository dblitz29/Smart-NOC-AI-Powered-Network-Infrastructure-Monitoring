import type { AlertItem, AlertStatus, Severity, SiteStatus } from "./types";

export const sevRank: Record<Severity, number> = { critical: 3, warning: 2, info: 1 };

export const sevLabel: Record<Severity, string> = { critical: "Critical", warning: "Warning", info: "Info" };
export const sevText: Record<Severity, string> = {
  critical: "text-critical",
  warning: "text-warning",
  info: "text-muted-foreground",
};
export const sevBorder: Record<Severity, string> = {
  critical: "border-critical/50 text-critical",
  warning: "border-warning/50 text-warning",
  info: "border-border text-muted-foreground",
};

export const statusLabel: Record<AlertStatus, string> = {
  new: "New",
  acknowledged: "Acknowledged",
  resolved: "Resolved",
};

export const siteLabel: Record<SiteStatus, string> = { healthy: "Healthy", warning: "Warning", critical: "Critical" };
export const siteText: Record<SiteStatus, string> = {
  healthy: "text-success",
  warning: "text-warning",
  critical: "text-critical",
};
export const siteRank: Record<SiteStatus, number> = { critical: 3, warning: 2, healthy: 1 };

export function relTime(at: number, now: number): string {
  const m = Math.max(0, Math.floor((now - at) / 60000));
  if (m < 1) return "Just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h ago`;
  return `${Math.floor(h / 24)} d ago`;
}

/** Wall-clock time in Indonesia (Jakarta, WIB). */
export function fmtWib(d: Date, withDate = false): string {
  return d.toLocaleString("en-GB", {
    timeZone: "Asia/Jakarta",
    ...(withDate ? { day: "2-digit", month: "short", year: "numeric" } : {}),
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

/** Open alerts for a camera, worst first, newest first. */
export function openAlertsFor(alerts: AlertItem[], cameraId: string): AlertItem[] {
  return alerts
    .filter((a) => a.cameraId === cameraId && a.status !== "resolved")
    .sort((a, b) => sevRank[b.severity] - sevRank[a.severity] || b.at - a.at);
}

/** The detection a camera overlay shows: worst open alert that has an AI detection. */
export function cameraDetection(alerts: AlertItem[], cameraId: string): AlertItem | undefined {
  return openAlertsFor(alerts, cameraId).find((a) => a.detection !== null);
}

export function worstSeverity(items: { severity: Severity }[]): Severity | null {
  return items.reduce<Severity | null>((w, a) => (w === null || sevRank[a.severity] > sevRank[w] ? a.severity : w), null);
}
