"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, WifiOff, ScanEye } from "lucide-react";
import type { Camera } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { severityBadgeVariant } from "@/lib/status";

function BoundingBox({ camera }: { camera: Camera }) {
  if (!camera.box || !camera.detection) return null;
  const color =
    camera.severity === "critical"
      ? "border-critical text-critical"
      : camera.severity === "warning"
      ? "border-warning text-warning"
      : "border-primary text-primary";
  return (
    <div
      className={`absolute rounded-sm border-2 ${color}`}
      style={{
        left: `${camera.box.x}%`,
        top: `${camera.box.y}%`,
        width: `${camera.box.w}%`,
        height: `${camera.box.h}%`,
      }}
    >
      <span
        className={`absolute -top-5 left-0 whitespace-nowrap rounded-sm px-1 text-[10px] font-semibold ${
          camera.severity === "critical"
            ? "bg-critical text-white"
            : camera.severity === "warning"
            ? "bg-warning text-black"
            : "bg-primary text-black"
        }`}
      >
        {camera.detection}
      </span>
    </div>
  );
}

function CameraFeed({ camera, fullscreen = false }: { camera: Camera; fullscreen?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden bg-black ${
        fullscreen ? "aspect-video w-full" : "aspect-video"
      }`}
    >
      {camera.status === "online" ? (
        <>
          <Image
            src={camera.image}
            alt={camera.siteName}
            fill
            className="object-cover opacity-80 grayscale-[20%] contrast-125"
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
          <div className="pointer-events-none absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <BoundingBox camera={camera} />

          <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded bg-black/60 px-1.5 py-0.5">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-critical" />
            <span className="text-[10px] font-semibold tracking-wide text-white">REC</span>
          </div>
          <div className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-white">
            {camera.code}
          </div>
          <div className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-white">
            {camera.lastUpdated}
          </div>
          {camera.detection && (
            <div className="absolute bottom-2 right-2">
              <Badge variant={severityBadgeVariant(camera.severity === "normal" ? "info" : camera.severity)}>
                <ScanEye className="h-3 w-3" />
                {camera.detection}
              </Badge>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#0a0e14] text-muted-foreground">
          <WifiOff className="h-6 w-6" />
          <span className="text-xs font-medium">Signal Lost</span>
          <span className="text-[10px]">{camera.code}</span>
        </div>
      )}
    </div>
  );
}

export function CameraCard({ camera }: { camera: Camera }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative">
        <CameraFeed camera={camera} />
        <button
          onClick={() => setOpen(true)}
          className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded bg-black/60 text-white hover:bg-black/80"
          aria-label="Fullscreen"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <div>
          <p className="text-sm font-medium">{camera.siteName}</p>
          <p className="text-[11px] text-muted-foreground">{camera.code}</p>
        </div>
        <Badge variant={camera.status === "online" ? "success" : "critical"}>
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              camera.status === "online" ? "bg-success" : "bg-critical"
            }`}
          />
          {camera.status === "online" ? "Online" : "Offline"}
        </Badge>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {camera.code} — {camera.siteName}
            </DialogTitle>
            <DialogDescription>
              Simulated live feed · Last updated {camera.lastUpdated}
            </DialogDescription>
          </DialogHeader>
          <CameraFeed camera={camera} fullscreen />
        </DialogContent>
      </Dialog>
    </div>
  );
}
