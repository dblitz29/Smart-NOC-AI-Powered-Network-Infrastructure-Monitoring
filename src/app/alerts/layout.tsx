import type { Metadata } from "next";

export const metadata: Metadata = { title: "Alerts & Incidents" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
