"use client";

import { Button } from "@/components/ui/button";
import { useNoc } from "@/components/providers/noc-provider";
import type { AlertItem } from "@/lib/types";

export function AlertActions({ alert, onResolved }: { alert: AlertItem; onResolved?: () => void }) {
  const { setAlertStatus } = useNoc();
  const ctx = `${alert.title}, ${alert.siteName}`;
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" disabled={alert.status !== "new"} aria-label={`Acknowledge ${ctx}`} onClick={() => setAlertStatus(alert.id, "acknowledged")}>
        Acknowledge
      </Button>
      <Button
        size="sm"
        disabled={alert.status === "resolved"}
        aria-label={`Resolve ${ctx}`}
        onClick={() => {
          setAlertStatus(alert.id, "resolved");
          onResolved?.();
        }}
      >
        Resolve
      </Button>
    </div>
  );
}
