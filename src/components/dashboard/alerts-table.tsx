"use client";

import { useState } from "react";
import { AlertActions } from "@/components/dashboard/alert-actions";
import { AlertDetailDialog } from "@/components/dashboard/alert-detail-dialog";
import { Badge } from "@/components/ui/badge";
import { useNoc } from "@/components/providers/noc-provider";
import { relTime, sevBorder, sevLabel, statusLabel } from "@/lib/status";
import type { AlertItem } from "@/lib/types";

const th = "px-3 py-2 text-left text-xs font-medium text-muted-foreground";
const td = "px-3 py-3 align-top";

export function AlertsTable({ rows }: { rows: AlertItem[] }) {
  const { now } = useNoc();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div role="region" aria-label="Alerts table" tabIndex={0} className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[56rem] text-sm">
          <thead className="border-b border-border">
            <tr>
              <th className={th}>Severity</th>
              <th className={th}>Alert</th>
              <th className={th}>Site and camera</th>
              <th className={th}>Detected</th>
              <th className={`${th} text-right`}>Confidence</th>
              <th className={th}>Status</th>
              <th className={th}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((a) => (
              <tr key={a.id} className={a.status === "resolved" ? "text-muted-foreground" : undefined}>
                <td className={td}>
                  <Badge className={sevBorder[a.severity]}>{sevLabel[a.severity]}</Badge>
                </td>
                <td className={td}>
                  <button type="button" onClick={() => setSelected(a.id)} className="text-left font-medium hover:underline">
                    {a.title}
                  </button>
                  <p className="text-xs text-muted-foreground">{a.detection ?? "Connectivity event"}</p>
                </td>
                <td className={td}>
                  {a.siteName}
                  <p className="font-mono text-xs text-muted-foreground">{a.cameraId}</p>
                </td>
                <td className={`${td} whitespace-nowrap`}>{relTime(a.at, now)}</td>
                <td className={`${td} text-right font-mono`}>{a.confidence === null ? "n/a" : `${a.confidence.toFixed(1)}%`}</td>
                <td className={`${td} whitespace-nowrap`}>{statusLabel[a.status]}</td>
                <td className={td}>
                  <AlertActions alert={a} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AlertDetailDialog alertId={selected} onClose={() => setSelected(null)} />
    </>
  );
}
