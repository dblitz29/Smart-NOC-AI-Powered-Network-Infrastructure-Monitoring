import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NocProvider } from "@/components/providers/noc-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Smart NOC | Network Operations Center",
  description:
    "AI-powered Computer Vision monitoring dashboard for telecom infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NocProvider>{children}</NocProvider>
      </body>
    </html>
  );
}
