"use client";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/layout/app-shell";
import { ChartCard } from "@/components/dashboard/chart-card";
import { useNoc } from "@/components/providers/noc-provider";
import { DETECTION_TRENDS, INCIDENTS_PER_DAY, INCIDENT_CATEGORIES, SEVERITY_COUNTS } from "@/lib/mock-data";

// Recharts needs literal colors. They mirror the CSS variables in globals.css.
const C = { axis: "#9aa6ad", grid: "#242d33", accent: "#35c7e0", critical: "#ee6666", warning: "#f5b53d", success: "#4cc47a", neutral: "#7f95a2", text: "#e8edf1" };
const tick = { fill: C.axis, fontSize: 12 };
const tip = {
  contentStyle: { background: "#1b242a", border: "1px solid #2e3a42", borderRadius: 6, fontSize: 12 },
  labelStyle: { color: C.text },
  itemStyle: { color: C.text },
  cursor: { fill: "#ffffff10" },
};
const SEV_COLOR: Record<string, string> = { Critical: C.critical, Warning: C.warning, Info: C.neutral };

export default function AnalyticsPage() {
  const { sites } = useNoc();
  const health = (["healthy", "warning", "critical"] as const).map((s) => ({
    name: s[0].toUpperCase() + s.slice(1),
    value: sites.filter((x) => x.status === s).length,
  }));
  const HEALTH_COLOR: Record<string, string> = { Healthy: C.success, Warning: C.warning, Critical: C.critical };

  return (
    <AppShell title="Analytics">
      <div className="space-y-5">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Sample series. The site health chart reads the live site list; the others are fixed mock data.
        </p>
        <div className="grid gap-5 xl:grid-cols-3">
          <ChartCard className="xl:col-span-2" height="h-72" title="How many AI incidents did we get each day this week?" note="Incidents per day, Monday to Sunday. Friday was the peak at 31.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCIDENTS_PER_DAY}>
                <CartesianGrid stroke={C.grid} vertical={false} />
                <XAxis dataKey="day" tick={tick} tickLine={false} axisLine={{ stroke: C.grid }} />
                <YAxis tick={tick} tickLine={false} axisLine={false} width={32} />
                <Tooltip {...tip} />
                <Bar dataKey="incidents" name="Incidents" fill={C.accent} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard height="h-72" title="How severe are the incidents?" note="Count by severity. Warning and info make up most of the load.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SEVERITY_COUNTS} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid stroke={C.grid} horizontal={false} />
                <XAxis type="number" tick={tick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={tick} tickLine={false} axisLine={false} width={64} />
                <Tooltip {...tip} />
                <Bar dataKey="value" name="Incidents" radius={[0, 2, 2, 0]}>
                  {SEVERITY_COUNTS.map((d) => (
                    <Cell key={d.name} fill={SEV_COLOR[d.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard className="xl:col-span-2" height="h-72" title="Which detections are growing over six months?" note="Monthly detections by type, June to November. Person detection leads and keeps rising.">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DETECTION_TRENDS}>
                <CartesianGrid stroke={C.grid} vertical={false} />
                <XAxis dataKey="month" tick={tick} tickLine={false} axisLine={{ stroke: C.grid }} />
                <YAxis tick={tick} tickLine={false} axisLine={false} width={36} />
                <Tooltip {...tip} cursor={{ stroke: C.grid }} />
                <Legend wrapperStyle={{ fontSize: 12, color: C.axis }} />
                <Line type="monotone" dataKey="person" name="Person" stroke={C.accent} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ppe" name="PPE violation" stroke={C.warning} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="unauthorized" name="Unauthorized access" stroke={C.critical} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="smoke" name="Smoke and fire" stroke={C.text} strokeWidth={2} strokeDasharray="4 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard height="h-72" title="What are the incidents about?" note="Count by category, largest first.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INCIDENT_CATEGORIES} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid stroke={C.grid} horizontal={false} />
                <XAxis type="number" tick={tick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={tick} tickLine={false} axisLine={false} width={120} />
                <Tooltip {...tip} />
                <Bar dataKey="value" name="Incidents" fill={C.neutral} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard className="xl:col-span-3" height="h-44" title="How many listed sites are healthy right now?" note={`Sites by status, from the ${sites.length} sites on the Site Health page.`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={health} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid stroke={C.grid} horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={tick} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={tick} tickLine={false} axisLine={false} width={64} />
                <Tooltip {...tip} />
                <Bar dataKey="value" name="Sites" radius={[0, 2, 2, 0]}>
                  {health.map((d) => (
                    <Cell key={d.name} fill={HEALTH_COLOR[d.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </AppShell>
  );
}
