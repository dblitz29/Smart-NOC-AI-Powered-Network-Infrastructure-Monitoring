"use client";

import { useNoc } from "@/components/providers/noc-provider";
import { relTime, siteLabel, siteText } from "@/lib/status";
import type { Site } from "@/lib/types";

const th = "px-3 py-2 text-left text-xs font-medium text-muted-foreground";
const td = "px-3 py-3 align-top";

/** Colors a reading and appends "high" so the state is never color alone. */
function Reading({ value, unit, warnAt, critAt }: { value: number; unit: string; warnAt: number; critAt: number }) {
  const cls = value >= critAt ? "text-critical" : value >= warnAt ? "text-warning" : "";
  return (
    <span className={`font-mono ${cls}`}>
      {value}
      {unit}
      {value >= warnAt && <span className="ml-1 font-sans text-xs">high</span>}
    </span>
  );
}

export function SitesTable({ rows }: { rows: Site[] }) {
  const { now } = useNoc();
  return (
    <div role="region" aria-label="Site health table" tabIndex={0} className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[60rem] text-sm">
        <thead className="border-b border-border">
          <tr>
            <th className={th}>Site</th>
            <th className={th}>Status</th>
            <th className={th}>Network</th>
            <th className={th}>Camera</th>
            <th className={`${th} text-right`}>Temperature</th>
            <th className={`${th} text-right`}>Power</th>
            <th className={`${th} text-right`}>CPU</th>
            <th className={th}>Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((s) => (
            <tr key={s.id}>
              <td className={td}>
                <span className="font-medium">{s.name}</span>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono">{s.id}</span>, {s.region}
                </p>
              </td>
              {[s.status, s.network, s.camera].map((st, i) => (
                <td key={i} className={`${td} font-medium ${siteText[st]}`}>
                  {siteLabel[st]}
                </td>
              ))}
              <td className={`${td} text-right`}>
                <Reading value={s.tempC} unit=" °C" warnAt={35} critAt={40} />
              </td>
              <td className={`${td} text-right font-mono`}>{s.powerKw.toFixed(1)} kW</td>
              <td className={`${td} text-right`}>
                <Reading value={s.cpu} unit="%" warnAt={70} critAt={85} />
              </td>
              <td className={`${td} whitespace-nowrap text-muted-foreground`}>{relTime(s.at, now)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
