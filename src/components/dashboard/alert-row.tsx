"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDetailDialog } from "@/components/dashboard/alert-detail-dialog";
import { severityBadgeVariant } from "@/lib/status";
import { useNoc } from "@/components/providers/noc-provider";
import type { AlertItem } from "@/lib/types";

const statusVariant = {
  new: "critical",
  acknowledged: "warning",
  resolved: "success",
} as const;

export function AlertRow({ alert, compact = false }: { alert: AlertItem; compact?: boolean }) {
  const { acknowledgeAlert, resolveAlert } = useNoc();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3 rounded-md border border-border/60 bg-secondary/20 px-3 py-2.5 text-sm">
        <Badge variant={severityBadgeVariant(alert.severity)} className="shrink-0">
          {alert.severity}
        </Badge>
        <button
          className="min-w-0 flex-1 text-left"
          onClick={() => setOpen(true)}
        >
          <p className="truncate font-medium">{alert.title}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {alert.siteName} · {alert.cameraId} · {alert.timestamp} · {alert.confidence}% confidence
          </p>
        </button>
        {!compact && (
          <Badge variant={statusVariant[alert.status]} className="shrink-0">
            {alert.status}
          </Badge>
        )}
        {!compact && (
          <div className="flex shrink-0 gap-1.5">
            <Button
              size="sm"
              variant="outline"
              disabled={alert.status !== "new"}
              onClick={() => acknowledgeAlert(alert.id)}
            >
              Acknowledge
            </Button>
            <Button
              size="sm"
              disabled={alert.status === "resolved"}
              onClick={() => resolveAlert(alert.id)}
            >
              Resolve
            </Button>
          </div>
        )}
      </div>
      <AlertDetailDialog alert={alert} open={open} onOpenChange={setOpen} />
    </>
  );
}
