export type Severity = "critical" | "warning" | "info";
export type AlertStatus = "new" | "acknowledged" | "resolved";
export type SiteStatus = "healthy" | "warning" | "critical";
export type Scene = "rack-row" | "tower" | "battery" | "gate";

export type DetectionType =
  | "Person Detection"
  | "Unauthorized Access"
  | "Restricted Area Intrusion"
  | "PPE Violation"
  | "Smoke Detection"
  | "Fire Detection";

/** Percent of the 16:9 frame. The simulated scene draws its subject from the same box. */
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Camera {
  id: string;
  siteId: string;
  siteName: string;
  view: string;
  online: boolean;
  scene: Scene;
  box: Box;
}

export interface AlertItem {
  id: string;
  severity: Severity;
  title: string;
  /** null for connectivity alerts: no AI detection, so no confidence either. */
  detection: DetectionType | null;
  confidence: number | null;
  siteId: string;
  siteName: string;
  cameraId: string;
  at: number;
  status: AlertStatus;
}

export interface Site {
  id: string;
  name: string;
  region: string;
  status: SiteStatus;
  network: SiteStatus;
  camera: SiteStatus;
  tempC: number;
  powerKw: number;
  cpu: number;
  at: number;
}

export type Seed<T> = Omit<T, "at"> & { ageMin: number };
