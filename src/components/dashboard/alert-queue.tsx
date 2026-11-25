"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertActions } from "@/components/dashboard/alert-actions";
import { AlertDetailDialog } from "@/components/dashboard/alert-detail-dialog";
import { EmptyState } from "@/components/dashboard/empty-state";
import { useNoc } from "@/components/providers/noc-provider";
import { relTime, sevLabel, sevRank, sevText } from "@/lib/status";

export function AlertQueue() {
  const { alerts, now } = useNoc();
  const [selected, setSelected] = useState<string | null>(null);

  const open = alerts
    .filter((a) => a.status !== "resolved")
    .sort((a, b) => sevRank[b.severity] - sevRank[a.severity] || b.at - a.at);

  return (
    <section aria-labelledby="queue-h" className="flex min-h-0 flex-col rounded-lg border border-border bg-card">
      <div className="flex items-baseline justify-between gap-3 border-b border-border px-4 py-3">
        <h2 id="queue-h" className="text-sm font-semibold">
          Needs action <span className="ml-1 font-mono font-normal text-muted-foreground">{open.length}</span>
        </h2>
        <Link href="/alerts" className="text-sm font-medium text-primary underline underline-offset-4">
          All alerts
        </Link>
      </div>

      {open.length === 0 ? (
        <div className="p-4">
          <EmptyState title="Nothing open" hint="Every alert is resolved. New detections will appear here as they come in." />
        </div>
      ) : (
        <ul className="max-h-[34rem] divide-y divide-border overflow-y-auto">
          {open.map((a) => (
            <li key={a.id} className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <button type="button" onClick={() => setSelected(a.id)} className="text-left text-sm font-medium hover:underline">
                  {a.title}
                </button>
                <span className={`shrink-0 text-xs font-medium ${sevText[a.severity]}`}>{sevLabel[a.severity]}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {a.siteName}, <span className="font-mono">{a.cameraId}</span>, {relTime(a.at, now)}
                {a.confidence !== null && <>, {a.confidence.toFixed(1)}%</>}
                {a.status === "acknowledged" && <>, acknowledged</>}
              </p>
              <div className="mt-2">
                <AlertActions alert={a} />
              </div>
            </li>
          ))}
        </ul>
      )}
      <AlertDetailDialog alertId={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
