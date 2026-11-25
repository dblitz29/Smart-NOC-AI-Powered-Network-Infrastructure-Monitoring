export type Severity = "critical" | "warning" | "info";
export type AlertStatus = "new" | "acknowledged" | "resolved";
export type SiteStatus = "healthy" | "warning" | "critical";
export type CameraStatus = "online" | "offline";

export type DetectionType =
  | "Person Detection"
  | "Unauthorized Access"
  | "Restricted Area Intrusion"
  | "PPE Violation"
  | "Smoke Detection"
  | "Fire Detection";

export interface Camera {
  id: string;
  code: string;
  siteId: string;
  siteName: string;
  status: CameraStatus;
  image: string;
  detection: DetectionType | null;
  severity: Severity | "normal";
  box?: { x: number; y: number; w: number; h: number };
  lastUpdated: string;
}

export interface AlertItem {
  id: string;
  severity: Severity;
  title: string;
  detection: DetectionType;
  siteId: string;
  siteName: string;
  cameraId: string;
  confidence: number;
  timestamp: string;
  status: AlertStatus;
}

export interface Site {
  id: string;
  name: string;
  region: string;
  status: SiteStatus;
  networkStatus: SiteStatus;
  cameraStatus: SiteStatus;
  temperature: number;
  power: number;
  cpu: number;
  lastUpdated: string;
}
