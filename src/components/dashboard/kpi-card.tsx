import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  trendGood: boolean;
  comparison: string;
  icon: LucideIcon;
  accent: "primary" | "critical" | "warning" | "success";
}

const accentMap = {
  primary: "bg-primary/10 text-primary",
  critical: "bg-critical/10 text-critical",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
};

export function KpiCard({
  label,
  value,
  delta,
  trend,
  trendGood,
  comparison,
  icon: Icon,
  accent,
}: KpiCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", accentMap[accent])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "flex items-center gap-0.5 font-medium",
              trendGood ? "text-success" : "text-critical"
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {delta}
          </span>
          <span className="text-muted-foreground">{comparison}</span>
        </div>
      </CardContent>
    </Card>
  );
}
