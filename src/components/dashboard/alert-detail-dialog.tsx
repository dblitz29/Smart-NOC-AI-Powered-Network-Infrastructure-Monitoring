"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { AlertItem } from "@/lib/types";
import { severityBadgeVariant } from "@/lib/status";
import { useNoc } from "@/components/providers/noc-provider";

export function AlertDetailDialog({
  alert,
  open,
  onOpenChange,
}: {
  alert: AlertItem | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { acknowledgeAlert, resolveAlert } = useNoc();
  if (!alert) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{alert.title}</DialogTitle>
          <DialogDescription>{alert.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Badge variant={severityBadgeVariant(alert.severity)}>{alert.severity}</Badge>
            <Badge variant="outline">{alert.status}</Badge>
          </div>

          <Separator />

          <dl className="grid grid-cols-2 gap-y-2 text-xs">
            <dt className="text-muted-foreground">Site</dt>
            <dd className="text-right font-medium">{alert.siteName}</dd>
            <dt className="text-muted-foreground">Camera</dt>
            <dd className="text-right font-medium">{alert.cameraId}</dd>
            <dt className="text-muted-foreground">Detection type</dt>
            <dd className="text-right font-medium">{alert.detection}</dd>
            <dt className="text-muted-foreground">AI Confidence</dt>
            <dd className="text-right font-medium">{alert.confidence}%</dd>
            <dt className="text-muted-foreground">Timestamp</dt>
            <dd className="text-right font-medium">{alert.timestamp}</dd>
          </dl>

          <Separator />

          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              disabled={alert.status !== "new"}
              onClick={() => acknowledgeAlert(alert.id)}
            >
              Acknowledge
            </Button>
            <Button
              size="sm"
              disabled={alert.status === "resolved"}
              onClick={() => {
                resolveAlert(alert.id);
                onOpenChange(false);
              }}
            >
              Resolve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
