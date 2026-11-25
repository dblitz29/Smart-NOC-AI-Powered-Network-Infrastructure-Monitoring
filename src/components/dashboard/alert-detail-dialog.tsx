"use client";

import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogTitle, SIDE_PANEL } from "@/components/ui/dialog";
import { AlertActions } from "@/components/dashboard/alert-actions";
import { useNoc } from "@/components/providers/noc-provider";
import { fmtWib, relTime, sevLabel, sevText, statusLabel } from "@/lib/status";

/** Side panel. Reads the live alert by id so Acknowledge and Resolve update it in place. */
export function AlertDetailDialog({ alertId, onClose }: { alertId: string | null; onClose: () => void }) {
  const { alerts, now, setQuery } = useNoc();
  const alert = alerts.find((a) => a.id === alertId);

  return (
    <Dialog open={!!alert} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className={SIDE_PANEL}>
        {alert && (
          <>
            <DialogTitle>{alert.title}</DialogTitle>
            <DialogDescription>
              <span className="font-mono">{alert.id}</span>, {alert.siteName}
            </DialogDescription>

            <dl className="mt-5 grid grid-cols-[8.5rem_1fr] gap-y-3 text-sm">
              <dt className="text-muted-foreground">Severity</dt>
              <dd className={`font-medium ${sevText[alert.severity]}`}>{sevLabel[alert.severity]}</dd>
              <dt className="text-muted-foreground">Status</dt>
              <dd>{statusLabel[alert.status]}</dd>
              <dt className="text-muted-foreground">Detection</dt>
              <dd>{alert.detection ?? "None, connectivity event"}</dd>
              <dt className="text-muted-foreground">AI confidence</dt>
              <dd className="font-mono">{alert.confidence === null ? "Not applicable" : `${alert.confidence.toFixed(1)}%`}</dd>
              <dt className="text-muted-foreground">Site</dt>
              <dd>{alert.siteName}</dd>
              <dt className="text-muted-foreground">Camera</dt>
              <dd className="font-mono">{alert.cameraId}</dd>
              <dt className="text-muted-foreground">Detected</dt>
              <dd>
                {relTime(alert.at, now)}
                <span className="block font-mono text-xs text-muted-foreground">{fmtWib(new Date(alert.at), true)} WIB</span>
              </dd>
            </dl>

            <div className="mt-6 border-t border-border pt-4">
              <AlertActions alert={alert} />
              <Link
                href="/cameras"
                onClick={() => setQuery(alert.cameraId)}
                className="mt-4 inline-flex min-h-10 items-center text-sm font-medium text-primary underline underline-offset-4"
              >
                See {alert.cameraId} in Camera Monitoring
              </Link>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
