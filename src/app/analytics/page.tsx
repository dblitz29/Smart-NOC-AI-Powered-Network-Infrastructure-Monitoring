"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AppShell } from "@/components/layout/app-shell";
import { ChartCard } from "@/components/dashboard/chart-card";
import {
  INCIDENTS_OVER_TIME,
  INCIDENT_CATEGORIES,
  SEVERITY_DISTRIBUTION,
  SITE_HEALTH_DISTRIBUTION,
  DETECTION_TRENDS,
} from "@/lib/mock-data";

const tooltipStyle = {
  backgroundColor: "hsl(222 28% 9%)",
  border: "1px solid hsl(222 20% 17%)",
  borderRadius: 8,
  fontSize: 12,
  color: "hsl(210 20% 92%)",
};

const axisStyle = { fontSize: 11, fill: "hsl(215 15% 62%)" };

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="AI Incidents Over Time" description="Last 7 days">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={INCIDENTS_OVER_TIME}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 17%)" />
              <XAxis dataKey="day" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="incidents"
                stroke="#22d3ee"
                fill="#22d3ee"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Incident Categories" description="Distribution by detection type">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={INCIDENT_CATEGORIES}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
              >
                {INCIDENT_CATEGORIES.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(215 15% 62%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Severity Distribution" description="Across all active & resolved alerts">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={SEVERITY_DISTRIBUTION}
                dataKey="value"
                nameKey="name"
                outerRadius={85}
              >
                {SEVERITY_DISTRIBUTION.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(215 15% 62%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Site Health Distribution" description="Current status across all sites">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SITE_HEALTH_DISTRIBUTION} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 17%)" />
              <XAxis type="number" tick={axisStyle} />
              <YAxis type="category" dataKey="name" tick={axisStyle} width={70} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {SITE_HEALTH_DISTRIBUTION.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Detection Trends"
          description="Monthly detections by type (last 6 months)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DETECTION_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 17%)" />
              <XAxis dataKey="month" tick={axisStyle} />
              <YAxis tick={axisStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(215 15% 62%)" }} />
              <Line type="monotone" dataKey="person" stroke="#22d3ee" strokeWidth={2} name="Person" />
              <Line type="monotone" dataKey="ppe" stroke="#fbbf24" strokeWidth={2} name="PPE Violation" />
              <Line type="monotone" dataKey="unauthorized" stroke="#a78bfa" strokeWidth={2} name="Unauthorized" />
              <Line type="monotone" dataKey="smoke" stroke="#ef4444" strokeWidth={2} name="Smoke/Fire" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </AppShell>
  );
}
