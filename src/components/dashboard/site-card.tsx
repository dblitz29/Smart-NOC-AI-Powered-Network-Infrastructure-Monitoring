import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Site } from "@/lib/types";
import { severityBadgeVariant, siteStatusDot } from "@/lib/status";

export function SiteCard({ site }: { site: Site }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold">{site.name}</p>
            <p className="text-[11px] text-muted-foreground">
              {site.id} · {site.region}
            </p>
          </div>
          <Badge variant={severityBadgeVariant(site.status === "critical" ? "critical" : site.status === "warning" ? "warning" : "info")}>
            <span className={`h-1.5 w-1.5 rounded-full ${siteStatusDot(site.status)}`} />
            {site.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground">Network</p>
            <p className={`font-medium ${siteStatusDot(site.networkStatus) && ""}`}>
              {site.networkStatus}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Camera</p>
            <p className="font-medium">{site.cameraStatus}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Temperature</p>
            <p className="font-medium">{site.temperature}°C</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last updated</p>
            <p className="font-medium">{site.lastUpdated}</p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div>
            <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
              <span>Power Consumption</span>
              <span>{site.power}%</span>
            </div>
            <Progress value={site.power} />
          </div>
          <div>
            <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
              <span>CPU Utilization</span>
              <span>{site.cpu}%</span>
            </div>
            <Progress value={site.cpu} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
