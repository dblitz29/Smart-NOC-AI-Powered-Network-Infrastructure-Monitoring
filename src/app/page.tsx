"use client";

import { Server, Siren, ScanEye, Camera as CameraIcon, Wifi } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { CameraCard } from "@/components/dashboard/camera-card";
import { AlertRow } from "@/components/dashboard/alert-row";
import { LiveSimToggle } from "@/components/dashboard/live-sim-toggle";
import { useNoc } from "@/components/providers/noc-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function OverviewPage() {
  const { cameras, alerts } = useNoc();
  const recentAlerts = alerts.slice(0, 5);

  return (
    <AppShell title="Overview">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Real-time summary across all monitored telecom sites.
        </p>
        <LiveSimToggle />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          label="Sites Online"
          value="24 / 26"
          delta="+2"
          trend="up"
          trendGood
          comparison="vs last week"
          icon={Server}
          accent="success"
        />
        <KpiCard
          label="Active Alerts"
          value={String(alerts.filter((a) => a.status !== "resolved").length)}
          delta="+3"
          trend="up"
          trendGood={false}
          comparison="vs yesterday"
          icon={Siren}
          accent="critical"
        />
        <KpiCard
          label="AI Detections Today"
          value="1,284"
          delta="+12.4%"
          trend="up"
          trendGood
          comparison="vs yesterday"
          icon={ScanEye}
          accent="primary"
        />
        <KpiCard
          label="Camera Availability"
          value="98.4%"
          delta="-0.3%"
          trend="down"
          trendGood={false}
          comparison="vs last 24h"
          icon={CameraIcon}
          accent="warning"
        />
        <KpiCard
          label="Network Availability"
          value="99.2%"
          delta="+0.1%"
          trend="up"
          trendGood
          comparison="vs last 24h"
          icon={Wifi}
          accent="success"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Live Camera Feeds</CardTitle>
            <Link href="/cameras" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {cameras.slice(0, 4).map((cam) => (
              <CameraCard key={cam.id} camera={cam} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent Alerts</CardTitle>
            <Link href="/alerts" className="text-xs font-medium text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentAlerts.map((a) => (
              <AlertRow key={a.id} alert={a} compact />
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
