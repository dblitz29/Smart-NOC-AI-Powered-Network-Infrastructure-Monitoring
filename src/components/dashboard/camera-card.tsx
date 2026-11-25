"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LiveClock } from "@/components/layout/live-clock";
import { CameraScene } from "@/components/dashboard/camera-scene";
import { useNoc } from "@/components/providers/noc-provider";
import { cameraDetection, openAlertsFor, relTime, sevLabel, sevText, worstSeverity } from "@/lib/status";
import type { AlertItem, Camera } from "@/lib/types";

const chip = "rounded-sm bg-black/75 px-1.5 py-0.5 font-mono text-[11px] text-white";
const boxColor = { critical: "border-critical", warning: "border-warning", info: "border-white/80" };
const tagColor = { critical: "bg-critical text-black", warning: "bg-warning text-black", info: "bg-white/90 text-black" };

type Retry = "idle" | "trying" | "failed";

function OfflineFeed({ camera }: { camera: Camera }) {
  const [retry, setRetry] = useState<Retry>("idle");
  const tryAgain = () => {
    setRetry("trying");
    setTimeout(() => setRetry("failed"), 1500);
  };
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0b1114] p-3 text-center">
      <p className="text-sm font-medium">{retry === "trying" ? "Connecting to camera..." : "No signal"}</p>
      <p className="max-w-[28ch] text-xs text-muted-foreground" role="status">
        {retry === "failed" ? `No response from ${camera.siteName}. Check the site uplink.` : `${camera.id} stopped sending frames.`}
      </p>
      <Button size="sm" variant="outline" onClick={tryAgain} disabled={retry === "trying"}>
        {retry === "failed" ? "Retry again" : "Retry connection"}
      </Button>
    </div>
  );
}

function Feed({ camera, detection, feedRef }: { camera: Camera; detection?: AlertItem; feedRef: React.RefObject<HTMLDivElement> }) {
  const goFullscreen = () => feedRef.current?.requestFullscreen?.();
  const sev = detection?.severity ?? "info";
  return (
    <div ref={feedRef} className="feed-fs bg-black">
      <div className="feed-frame relative aspect-video w-full overflow-hidden">
        {camera.online ? (
          <>
            <CameraScene scene={camera.scene} detection={detection?.detection ?? null} box={camera.box} />
            {detection && (
              <div
                className={`absolute border-2 ${boxColor[sev]}`}
                style={{ left: `${camera.box.x}%`, top: `${camera.box.y}%`, width: `${camera.box.w}%`, height: `${camera.box.h}%` }}
              >
                <span className={`absolute left-0 top-0 whitespace-nowrap px-1 text-[11px] font-semibold leading-4 ${tagColor[sev]}`}>
                  {detection.detection} {detection.confidence?.toFixed(1)}%
                </span>
              </div>
            )}
            <div className="absolute left-2 top-2 flex gap-1.5">
              <span className={`${chip} flex items-center gap-1.5`}>
                <span className="h-2 w-2 rounded-full bg-critical" aria-hidden="true" />
                REC
              </span>
              <span className={chip}>{camera.id}</span>
            </div>
            <LiveClock className={`${chip} absolute right-2 top-2`} />
            <span className={`${chip} absolute bottom-2 left-2`}>Simulated feed</span>
            <button
              type="button"
              onClick={goFullscreen}
              aria-label={`Fullscreen ${camera.id}`}
              className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-sm bg-black/75 text-white hover:bg-black"
            >
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </>
        ) : (
          <OfflineFeed camera={camera} />
        )}
      </div>
    </div>
  );
}

export function CameraCard({ camera }: { camera: Camera }) {
  const { alerts, now, setQuery } = useNoc();
  const [open, setOpen] = useState(false);
  const cardFeed = useRef<HTMLDivElement>(null);
  const modalFeed = useRef<HTMLDivElement>(null);

  const detection = cameraDetection(alerts, camera.id);
  const openAlerts = openAlertsFor(alerts, camera.id);
  const worst = worstSeverity(openAlerts);
  const status = !camera.online
    ? { text: "Offline", cls: "text-critical" }
    : worst && worst !== "info"
      ? { text: sevLabel[worst], cls: sevText[worst] }
      : { text: "Normal", cls: "text-success" };

  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <Feed camera={camera} detection={detection} feedRef={cardFeed} />
      <div className="flex items-start justify-between gap-3 p-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">{camera.siteName}</h3>
          <p className="truncate text-xs text-muted-foreground">
            <span className="font-mono">{camera.id}</span>, {camera.view}
          </p>
          <p className={`mt-1 text-xs font-medium ${status.cls}`}>
            <span className="sr-only">Status: </span>
            {status.text}
            {camera.online && !detection && <span className="font-normal text-muted-foreground">, no detection</span>}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen(true)} aria-label={`Details for ${camera.id}`}>
          Details
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>
            {camera.id}, {camera.siteName}
          </DialogTitle>
          <DialogDescription>{camera.view}. Simulated feed, detections are drawn from open alerts.</DialogDescription>
          <div className="mt-4 overflow-hidden rounded-md">
            <Feed camera={camera} detection={detection} feedRef={modalFeed} />
          </div>
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium">Open alerts on this camera</h4>
            {openAlerts.length === 0 ? (
              <p className="text-sm text-muted-foreground">None. This camera has no unresolved alerts.</p>
            ) : (
              <ul className="divide-y divide-border rounded-md border border-border text-sm">
                {openAlerts.map((a) => (
                  <li key={a.id} className="flex justify-between gap-3 px-3 py-2">
                    <span>{a.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      <span className={sevText[a.severity]}>{sevLabel[a.severity]}</span>, {relTime(a.at, now)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href="/alerts"
              onClick={() => setQuery(camera.id)}
              className="mt-3 inline-flex min-h-10 items-center text-sm font-medium text-primary underline underline-offset-4"
            >
              Open {camera.id} in Alerts &amp; Incidents
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
