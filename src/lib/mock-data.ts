import type { AlertItem, Camera, DetectionType, Seed, Severity, Site } from "./types";

export const DETECTION_TYPES: DetectionType[] = [
  "Person Detection",
  "Unauthorized Access",
  "Restricted Area Intrusion",
  "PPE Violation",
  "Smoke Detection",
  "Fire Detection",
];

export function severityFor(d: DetectionType): Severity {
  if (d === "Smoke Detection" || d === "Fire Detection" || d === "Unauthorized Access") return "critical";
  if (d === "PPE Violation" || d === "Restricted Area Intrusion") return "warning";
  return "info";
}

// Sample data. Figures are invented for the prototype and labelled as such in the UI.
export const SITE_SEEDS: Seed<Site>[] = [
  { id: "SITE-01", name: "Jakarta Core Network", region: "DKI Jakarta", status: "healthy", network: "healthy", camera: "healthy", tempC: 24.5, powerKw: 68.4, cpu: 42, ageMin: 0 },
  { id: "SITE-02", name: "Bandung BTS-042", region: "Jawa Barat", status: "critical", network: "critical", camera: "healthy", tempC: 41.2, powerKw: 9.1, cpu: 88, ageMin: 0 },
  { id: "SITE-03", name: "Surabaya Data Center", region: "Jawa Timur", status: "warning", network: "warning", camera: "healthy", tempC: 33.8, powerKw: 112.7, cpu: 65, ageMin: 1 },
  { id: "SITE-04", name: "Semarang BTS-018", region: "Jawa Tengah", status: "healthy", network: "healthy", camera: "healthy", tempC: 27.1, powerKw: 5.4, cpu: 38, ageMin: 3 },
  { id: "SITE-05", name: "Yogyakarta BTS-031", region: "DI Yogyakarta", status: "healthy", network: "healthy", camera: "healthy", tempC: 25.9, powerKw: 4.9, cpu: 31, ageMin: 5 },
  { id: "SITE-06", name: "Medan BTS-057", region: "Sumatera Utara", status: "warning", network: "healthy", camera: "critical", tempC: 36.4, powerKw: 7.2, cpu: 58, ageMin: 4 },
  { id: "SITE-07", name: "Makassar Core Network", region: "Sulawesi Selatan", status: "healthy", network: "healthy", camera: "healthy", tempC: 28.3, powerKw: 54.0, cpu: 44, ageMin: 2 },
  { id: "SITE-08", name: "Denpasar BTS-009", region: "Bali", status: "healthy", network: "healthy", camera: "healthy", tempC: 26.7, powerKw: 5.2, cpu: 36, ageMin: 6 },
];

export const TOTAL_SITES = 26;
export const ONLINE_SITES = 24;

export const CAMERAS: Camera[] = [
  { id: "CAM-01", siteId: "SITE-01", siteName: "Jakarta Core Network", view: "Core room, row A", online: true, scene: "rack-row", box: { x: 42, y: 34, w: 12, h: 46 } },
  { id: "CAM-02", siteId: "SITE-02", siteName: "Bandung BTS-042", view: "Tower base, gate", online: true, scene: "tower", box: { x: 30, y: 36, w: 12, h: 46 } },
  { id: "CAM-03", siteId: "SITE-03", siteName: "Surabaya Data Center", view: "Hall 2, row C", online: true, scene: "rack-row", box: { x: 20, y: 8, w: 40, h: 34 } },
  { id: "CAM-04", siteId: "SITE-04", siteName: "Semarang BTS-018", view: "Equipment shelter", online: true, scene: "battery", box: { x: 50, y: 34, w: 12, h: 46 } },
  { id: "CAM-05", siteId: "SITE-05", siteName: "Yogyakarta BTS-031", view: "Tower base", online: true, scene: "tower", box: { x: 62, y: 36, w: 12, h: 46 } },
  { id: "CAM-06", siteId: "SITE-06", siteName: "Medan BTS-057", view: "Generator pad", online: false, scene: "gate", box: { x: 40, y: 36, w: 12, h: 46 } },
  { id: "CAM-07", siteId: "SITE-01", siteName: "Jakarta Core Network", view: "Restricted cage B", online: true, scene: "rack-row", box: { x: 58, y: 34, w: 12, h: 46 } },
];

type A = Seed<AlertItem>;
export const ALERT_SEEDS: A[] = [
  { id: "ALT-1001", severity: "critical", title: "Unauthorized Access Detected", detection: "Unauthorized Access", confidence: 96.8, siteId: "SITE-02", siteName: "Bandung BTS-042", cameraId: "CAM-02", ageMin: 2, status: "new" },
  { id: "ALT-1002", severity: "critical", title: "Smoke Detected", detection: "Smoke Detection", confidence: 94.2, siteId: "SITE-03", siteName: "Surabaya Data Center", cameraId: "CAM-03", ageMin: 6, status: "new" },
  { id: "ALT-1008", severity: "info", title: "Person Detected in Core Room", detection: "Person Detection", confidence: 98.1, siteId: "SITE-01", siteName: "Jakarta Core Network", cameraId: "CAM-01", ageMin: 9, status: "new" },
  { id: "ALT-1003", severity: "warning", title: "PPE Violation", detection: "PPE Violation", confidence: 89.5, siteId: "SITE-04", siteName: "Semarang BTS-018", cameraId: "CAM-04", ageMin: 14, status: "acknowledged" },
  { id: "ALT-1004", severity: "warning", title: "Restricted Area Intrusion", detection: "Restricted Area Intrusion", confidence: 92.1, siteId: "SITE-01", siteName: "Jakarta Core Network", cameraId: "CAM-07", ageMin: 22, status: "new" },
  { id: "ALT-1009", severity: "warning", title: "PPE Violation", detection: "PPE Violation", confidence: 86.9, siteId: "SITE-04", siteName: "Semarang BTS-018", cameraId: "CAM-04", ageMin: 33, status: "new" },
  { id: "ALT-1005", severity: "info", title: "Camera Connectivity Restored", detection: null, confidence: null, siteId: "SITE-05", siteName: "Yogyakarta BTS-031", cameraId: "CAM-05", ageMin: 41, status: "resolved" },
  { id: "ALT-1010", severity: "info", title: "Person Detected at Tower Base", detection: "Person Detection", confidence: 90.3, siteId: "SITE-05", siteName: "Yogyakarta BTS-031", cameraId: "CAM-05", ageMin: 47, status: "new" },
  { id: "ALT-1006", severity: "warning", title: "Camera Offline", detection: null, confidence: null, siteId: "SITE-06", siteName: "Medan BTS-057", cameraId: "CAM-06", ageMin: 58, status: "acknowledged" },
  { id: "ALT-1007", severity: "critical", title: "Fire Detected", detection: "Fire Detection", confidence: 91.4, siteId: "SITE-02", siteName: "Bandung BTS-042", cameraId: "CAM-02", ageMin: 120, status: "resolved" },
  { id: "ALT-1011", severity: "info", title: "Person Detected in Core Room", detection: "Person Detection", confidence: 97.2, siteId: "SITE-01", siteName: "Jakarta Core Network", cameraId: "CAM-01", ageMin: 190, status: "resolved" },
  { id: "ALT-1012", severity: "warning", title: "Smoke Detected", detection: "Smoke Detection", confidence: 88.0, siteId: "SITE-03", siteName: "Surabaya Data Center", cameraId: "CAM-03", ageMin: 300, status: "resolved" },
];

// Analytics sample series.
export const INCIDENTS_PER_DAY = [
  { day: "Mon", incidents: 14 },
  { day: "Tue", incidents: 22 },
  { day: "Wed", incidents: 18 },
  { day: "Thu", incidents: 27 },
  { day: "Fri", incidents: 31 },
  { day: "Sat", incidents: 19 },
  { day: "Sun", incidents: 24 },
];

export const INCIDENT_CATEGORIES = [
  { name: "Person Detection", value: 42 },
  { name: "Unauthorized Access", value: 32 },
  { name: "PPE Violation", value: 24 },
  { name: "Restricted Area", value: 20 },
  { name: "Smoke / Fire", value: 12 },
];

export const SEVERITY_COUNTS = [
  { name: "Critical", value: 18 },
  { name: "Warning", value: 34 },
  { name: "Info", value: 48 },
];

export const DETECTION_TRENDS = [
  { month: "Jun", person: 320, ppe: 90, unauthorized: 40, smoke: 8 },
  { month: "Jul", person: 356, ppe: 110, unauthorized: 52, smoke: 12 },
  { month: "Aug", person: 401, ppe: 98, unauthorized: 61, smoke: 6 },
  { month: "Sep", person: 378, ppe: 124, unauthorized: 45, smoke: 9 },
  { month: "Oct", person: 442, ppe: 132, unauthorized: 58, smoke: 14 },
  { month: "Nov", person: 468, ppe: 118, unauthorized: 63, smoke: 11 },
];
