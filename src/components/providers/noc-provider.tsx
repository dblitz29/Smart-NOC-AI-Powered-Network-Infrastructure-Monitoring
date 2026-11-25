"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { ALERTS, CAMERAS, randomDetection, severityForDetection } from "@/lib/mock-data";
import type { AlertItem, AlertStatus, Camera } from "@/lib/types";

interface NocContextValue {
  alerts: AlertItem[];
  cameras: Camera[];
  liveSimulation: boolean;
  setLiveSimulation: (v: boolean) => void;
  acknowledgeAlert: (id: string) => void;
  resolveAlert: (id: string) => void;
  setAlertStatus: (id: string, status: AlertStatus) => void;
}

const NocContext = createContext<NocContextValue | null>(null);

let seq = 2000;

export function NocProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>(ALERTS);
  const [cameras] = useState<Camera[]>(CAMERAS);
  const [liveSimulation, setLiveSimulation] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setAlertStatus = useCallback((id: string, status: AlertStatus) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);

  const acknowledgeAlert = useCallback(
    (id: string) => setAlertStatus(id, "acknowledged"),
    [setAlertStatus]
  );
  const resolveAlert = useCallback((id: string) => setAlertStatus(id, "resolved"), [setAlertStatus]);

  useEffect(() => {
    if (!liveSimulation) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      const detection = randomDetection();
      const severity = severityForDetection(detection);
      const camera = cameras[Math.floor(Math.random() * cameras.length)];
      seq += 1;
      const newAlert: AlertItem = {
        id: `ALT-${seq}`,
        severity,
        title: `${detection} Detected`,
        detection,
        siteId: camera.siteId,
        siteName: camera.siteName,
        cameraId: camera.id,
        confidence: Math.round((85 + Math.random() * 14) * 10) / 10,
        timestamp: "Just now",
        status: "new",
      };
      setAlerts((prev) => [newAlert, ...prev].slice(0, 40));
    }, 14000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [liveSimulation, cameras]);

  return (
    <NocContext.Provider
      value={{
        alerts,
        cameras,
        liveSimulation,
        setLiveSimulation,
        acknowledgeAlert,
        resolveAlert,
        setAlertStatus,
      }}
    >
      {children}
    </NocContext.Provider>
  );
}

export function useNoc() {
  const ctx = useContext(NocContext);
  if (!ctx) throw new Error("useNoc must be used within NocProvider");
  return ctx;
}
