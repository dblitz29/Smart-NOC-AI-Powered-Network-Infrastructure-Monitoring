import type { AlertItem, Camera, DetectionType, Site } from "./types";

export const DETECTION_TYPES: DetectionType[] = [
  "Person Detection",
  "Unauthorized Access",
  "Restricted Area Intrusion",
  "PPE Violation",
  "Smoke Detection",
  "Fire Detection",
];

export const SITES: Site[] = [
  {
    id: "SITE-01",
    name: "Jakarta Core Network",
    region: "DKI Jakarta",
    status: "healthy",
    networkStatus: "healthy",
    cameraStatus: "healthy",
    temperature: 24.5,
    power: 68,
    cpu: 42,
    lastUpdated: "2 min ago",
  },
  {
    id: "SITE-02",
    name: "Bandung BTS-042",
    region: "Jawa Barat",
    status: "critical",
    networkStatus: "critical",
    cameraStatus: "warning",
    temperature: 41.2,
    power: 91,
    cpu: 88,
    lastUpdated: "Just now",
  },
  {
    id: "SITE-03",
    name: "Surabaya Data Center",
    region: "Jawa Timur",
    status: "warning",
    networkStatus: "warning",
    cameraStatus: "healthy",
    temperature: 33.8,
    power: 77,
    cpu: 65,
    lastUpdated: "1 min ago",
  },
  {
    id: "SITE-04",
    name: "Semarang BTS-018",
    region: "Jawa Tengah",
    status: "healthy",
    networkStatus: "healthy",
    cameraStatus: "healthy",
    temperature: 27.1,
    power: 54,
    cpu: 38,
    lastUpdated: "3 min ago",
  },
  {
    id: "SITE-05",
    name: "Yogyakarta BTS-031",
    region: "DI Yogyakarta",
    status: "healthy",
    networkStatus: "healthy",
    cameraStatus: "healthy",
    temperature: 25.9,
    power: 49,
    cpu: 31,
    lastUpdated: "5 min ago",
  },
  {
    id: "SITE-06",
    name: "Medan BTS-057",
    region: "Sumatera Utara",
    status: "warning",
    networkStatus: "healthy",
    cameraStatus: "warning",
    temperature: 36.4,
    power: 72,
    cpu: 58,
    lastUpdated: "4 min ago",
  },
  {
    id: "SITE-07",
    name: "Makassar Core Network",
    region: "Sulawesi Selatan",
    status: "healthy",
    networkStatus: "healthy",
    cameraStatus: "healthy",
    temperature: 28.3,
    power: 61,
    cpu: 44,
    lastUpdated: "2 min ago",
  },
  {
    id: "SITE-08",
    name: "Denpasar BTS-009",
    region: "Bali",
    status: "healthy",
    networkStatus: "healthy",
    cameraStatus: "healthy",
    temperature: 26.7,
    power: 52,
    cpu: 36,
    lastUpdated: "6 min ago",
  },
];

export const CAMERAS: Camera[] = [
  {
    id: "CAM-01",
    code: "CAM-01",
    siteId: "SITE-01",
    siteName: "Jakarta Core Network",
    status: "online",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&auto=format&fit=crop",
    detection: "Person Detection",
    severity: "normal",
    box: { x: 42, y: 30, w: 18, h: 48 },
    lastUpdated: "Just now",
  },
  {
    id: "CAM-02",
    code: "CAM-02",
    siteId: "SITE-02",
    siteName: "Bandung BTS-042",
    status: "online",
    image:
      "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=900&q=80&auto=format&fit=crop",
    detection: "Unauthorized Access",
    severity: "critical",
    box: { x: 30, y: 22, w: 24, h: 52 },
    lastUpdated: "Just now",
  },
  {
    id: "CAM-03",
    code: "CAM-03",
    siteId: "SITE-03",
    siteName: "Surabaya Data Center",
    status: "online",
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=900&q=80&auto=format&fit=crop",
    detection: "Smoke Detection",
    severity: "critical",
    box: { x: 15, y: 10, w: 45, h: 35 },
    lastUpdated: "Just now",
  },
  {
    id: "CAM-04",
    code: "CAM-04",
    siteId: "SITE-04",
    siteName: "Semarang BTS-018",
    status: "online",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop",
    detection: "PPE Violation",
    severity: "warning",
    box: { x: 48, y: 35, w: 20, h: 45 },
    lastUpdated: "Just now",
  },
  {
    id: "CAM-05",
    code: "CAM-05",
    siteId: "SITE-05",
    siteName: "Yogyakarta BTS-031",
    status: "offline",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80&auto=format&fit=crop",
    detection: null,
    severity: "normal",
    lastUpdated: "8 min ago",
  },
  {
    id: "CAM-06",
    code: "CAM-06",
    siteId: "SITE-07",
    siteName: "Makassar Core Network",
    status: "online",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=900&q=80&auto=format&fit=crop",
    detection: null,
    severity: "normal",
    lastUpdated: "Just now",
  },
];

export const ALERTS: AlertItem[] = [
  {
    id: "ALT-1001",
    severity: "critical",
    title: "Unauthorized Access Detected",
    detection: "Unauthorized Access",
    siteId: "SITE-02",
    siteName: "Bandung BTS-042",
    cameraId: "CAM-02",
    confidence: 96.8,
    timestamp: "2 min ago",
    status: "new",
  },
  {
    id: "ALT-1002",
    severity: "critical",
    title: "Smoke Detected",
    detection: "Smoke Detection",
    siteId: "SITE-03",
    siteName: "Surabaya Data Center",
    cameraId: "CAM-03",
    confidence: 94.2,
    timestamp: "6 min ago",
    status: "new",
  },
  {
    id: "ALT-1003",
    severity: "warning",
    title: "PPE Violation",
    detection: "PPE Violation",
    siteId: "SITE-04",
    siteName: "Semarang BTS-018",
    cameraId: "CAM-04",
    confidence: 89.5,
    timestamp: "14 min ago",
    status: "acknowledged",
  },
  {
    id: "ALT-1004",
    severity: "warning",
    title: "Restricted Area Intrusion",
    detection: "Restricted Area Intrusion",
    siteId: "SITE-01",
    siteName: "Jakarta Core Network",
    cameraId: "CAM-01",
    confidence: 92.1,
    timestamp: "22 min ago",
    status: "new",
  },
  {
    id: "ALT-1005",
    severity: "info",
    title: "Camera Connectivity Restored",
    detection: "Person Detection",
    siteId: "SITE-05",
    siteName: "Yogyakarta BTS-031",
    cameraId: "CAM-05",
    confidence: 100,
    timestamp: "41 min ago",
    status: "resolved",
  },
  {
    id: "ALT-1006",
    severity: "warning",
    title: "Unusual Loitering Detected",
    detection: "Restricted Area Intrusion",
    siteId: "SITE-06",
    siteName: "Medan BTS-057",
    cameraId: "CAM-06",
    confidence: 87.3,
    timestamp: "1 hr ago",
    status: "acknowledged",
  },
  {
    id: "ALT-1007",
    severity: "critical",
    title: "Fire Signature Detected",
    detection: "Fire Detection",
    siteId: "SITE-02",
    siteName: "Bandung BTS-042",
    cameraId: "CAM-02",
    confidence: 91.4,
    timestamp: "2 hr ago",
    status: "resolved",
  },
  {
    id: "ALT-1008",
    severity: "info",
    title: "Routine Person Detection",
    detection: "Person Detection",
    siteId: "SITE-07",
    siteName: "Makassar Core Network",
    cameraId: "CAM-06",
    confidence: 98.1,
    timestamp: "3 hr ago",
    status: "resolved",
  },
];

export const INCIDENTS_OVER_TIME = [
  { day: "Mon", incidents: 14 },
  { day: "Tue", incidents: 22 },
  { day: "Wed", incidents: 18 },
  { day: "Thu", incidents: 27 },
  { day: "Fri", incidents: 31 },
  { day: "Sat", incidents: 19 },
  { day: "Sun", incidents: 24 },
];

export const INCIDENT_CATEGORIES = [
  { name: "Unauthorized Access", value: 32, color: "#f87171" },
  { name: "PPE Violation", value: 24, color: "#fbbf24" },
  { name: "Smoke / Fire", value: 12, color: "#ef4444" },
  { name: "Restricted Area", value: 20, color: "#a78bfa" },
  { name: "Person Detection", value: 42, color: "#22d3ee" },
];

export const SEVERITY_DISTRIBUTION = [
  { name: "Critical", value: 18, color: "#ef4444" },
  { name: "Warning", value: 34, color: "#f59e0b" },
  { name: "Info", value: 48, color: "#22d3ee" },
];

export const SITE_HEALTH_DISTRIBUTION = [
  { name: "Healthy", value: 5, color: "#22c55e" },
  { name: "Warning", value: 2, color: "#f59e0b" },
  { name: "Critical", value: 1, color: "#ef4444" },
];

export const DETECTION_TRENDS = [
  { month: "Jun", person: 320, ppe: 90, unauthorized: 40, smoke: 8 },
  { month: "Jul", person: 356, ppe: 110, unauthorized: 52, smoke: 12 },
  { month: "Aug", person: 401, ppe: 98, unauthorized: 61, smoke: 6 },
  { month: "Sep", person: 378, ppe: 124, unauthorized: 45, smoke: 9 },
  { month: "Oct", person: 442, ppe: 132, unauthorized: 58, smoke: 14 },
  { month: "Nov", person: 468, ppe: 118, unauthorized: 63, smoke: 11 },
];

export function randomDetection(): DetectionType {
  return DETECTION_TYPES[Math.floor(Math.random() * DETECTION_TYPES.length)];
}

export function severityForDetection(d: DetectionType): "critical" | "warning" | "info" {
  if (d === "Smoke Detection" || d === "Fire Detection" || d === "Unauthorized Access")
    return "critical";
  if (d === "PPE Violation" || d === "Restricted Area Intrusion") return "warning";
  return "info";
}
