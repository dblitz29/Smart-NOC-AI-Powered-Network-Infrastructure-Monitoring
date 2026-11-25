"use client";

import { useEffect, useState } from "react";
import { fmtWib } from "@/lib/status";

/** Renders after mount so server and client never disagree on the time. */
export function LiveClock({ withDate = false, className }: { withDate?: boolean; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <time className={className} dateTime={now?.toISOString()}>
      {now ? `${fmtWib(now, withDate)} WIB` : "--:--:-- WIB"}
    </time>
  );
}
