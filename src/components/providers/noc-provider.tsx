"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ALERT_SEEDS, CAMERAS, DETECTION_TYPES, SITE_SEEDS, severityFor } from "@/lib/mock-data";
import type { AlertItem, AlertStatus, Camera, Seed, Site } from "@/lib/types";

interface Noc {
  alerts: AlertItem[];
  sites: Site[];
  cameras: Camera[];
  /** Ticks every 20 s so relative times stay honest. */
  now: number;
  /** Shared by the header search and the list pages. */
  query: string;
  setQuery: (q: string) => void;
  liveSimulation: boolean;
  setLiveSimulation: (v: boolean) => void;
  setAlertStatus: (id: string, status: AlertStatus) => void;
}

const Ctx = createContext<Noc | null>(null);
const seed = <T,>(seeds: Seed<T>[], base: number): T[] =>
  seeds.map(({ ageMin, ...rest }) => ({ ...rest, at: base - ageMin * 60000 }) as unknown as T);

let seq = 2000;
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

export function NocProvider({ children }: { children: React.ReactNode }) {
  // Same base on first render means server and client print identical relative times.
  const [base] = useState(() => Date.now());
  const [now, setNow] = useState(base);
  const [alerts, setAlerts] = useState<AlertItem[]>(() => seed<AlertItem>(ALERT_SEEDS, base));
  const [sites] = useState<Site[]>(() => seed<Site>(SITE_SEEDS, base));
  const [query, setQuery] = useState("");
  const [liveSimulation, setLiveSimulation] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 20000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!liveSimulation) return;
    const t = setInterval(() => {
      const cam = pick(CAMERAS.filter((c) => c.online));
      const detection = pick(DETECTION_TYPES);
      seq += 1;
      const item: AlertItem = {
        id: `ALT-${seq}`,
        severity: severityFor(detection),
        title: `${detection} (${cam.view})`,
        detection,
        confidence: Math.round((85 + Math.random() * 14) * 10) / 10,
        siteId: cam.siteId,
        siteName: cam.siteName,
        cameraId: cam.id,
        at: Date.now(),
        status: "new",
      };
      setAlerts((prev) => [item, ...prev].slice(0, 40));
    }, 20000);
    return () => clearInterval(t);
  }, [liveSimulation]);

  const setAlertStatus = useCallback(
    (id: string, status: AlertStatus) => setAlerts((p) => p.map((a) => (a.id === id ? { ...a, status } : a))),
    []
  );

  const value = useMemo<Noc>(
    () => ({ alerts, sites, cameras: CAMERAS, now, query, setQuery, liveSimulation, setLiveSimulation, setAlertStatus }),
    [alerts, sites, now, query, liveSimulation, setAlertStatus]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNoc() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useNoc must be used inside NocProvider");
  return v;
}
