import type { Metadata } from "next";

export const metadata: Metadata = { title: "Camera Monitoring" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
