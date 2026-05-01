import { useEffect, useState } from "react";
import { Building2, Home, Building } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DeliveryCountdown } from "./DeliveryCountdown";

interface TrackingProgressProps {
  progress: number;
  fromLocation: string;
  toLocation: string;
  status?: string;
  estimatedDeliveryAt?: string | null;
  createdAt?: string | null;
}

function computeLiveProgress(
  createdAt: string | null | undefined,
  estimatedDeliveryAt: string | null | undefined,
  fallback: number,
  isDelivered: boolean
): number {
  if (isDelivered) return 100;
  if (!estimatedDeliveryAt) return fallback;
  const end = new Date(estimatedDeliveryAt).getTime();
  if (Number.isNaN(end)) return fallback;
  const start = createdAt ? new Date(createdAt).getTime() : NaN;
  const now = Date.now();
  if (now >= end) return 100;
  // If we don't have a valid start, derive one from fallback so the bar matches initial DB value then advances toward 100.
  let startTime = start;
  if (Number.isNaN(startTime) || startTime >= end) {
    const remainingFraction = Math.max(0.01, 1 - Math.min(99, Math.max(0, fallback)) / 100);
    const totalDuration = (end - now) / remainingFraction;
    startTime = end - totalDuration;
  }
  const total = end - startTime;
  if (total <= 0) return 100;
  const pct = ((now - startTime) / total) * 100;
  return Math.min(99, Math.max(0, Math.round(pct)));
}

export function TrackingProgress({ progress, fromLocation, toLocation, status, estimatedDeliveryAt, createdAt }: TrackingProgressProps) {
  const isDelivered = status === "Delivered" || progress >= 100;
  const [liveProgress, setLiveProgress] = useState(() =>
    computeLiveProgress(createdAt, estimatedDeliveryAt, progress, isDelivered)
  );

  useEffect(() => {
    setLiveProgress(computeLiveProgress(createdAt, estimatedDeliveryAt, progress, isDelivered));
    if (isDelivered || !estimatedDeliveryAt) return;
    const interval = setInterval(() => {
      setLiveProgress(computeLiveProgress(createdAt, estimatedDeliveryAt, progress, isDelivered));
    }, 1000);
    return () => clearInterval(interval);
  }, [createdAt, estimatedDeliveryAt, progress, isDelivered]);

  const displayProgress = isDelivered ? 100 : liveProgress;

  return (
    <div className="bg-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Package Journey</h3>

      <DeliveryCountdown estimatedDeliveryAt={estimatedDeliveryAt ?? null} isDelivered={isDelivered} />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {fromLocation === "Sorting Facility" ? (
            <Building className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Building2 className="h-4 w-4 text-usps-blue" />
          )}
          <span className="text-sm font-medium">{fromLocation}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Home className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{toLocation}</span>
        </div>
      </div>
      
      <div className="relative">
        <Progress value={displayProgress} className="h-3 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Origin</span>
          <span className="font-medium text-tracking-progress tabular-nums">{displayProgress}% Complete</span>
          <span>Destination</span>
        </div>
      </div>
      
      <div className={`mt-4 flex items-center justify-center space-x-2 ${isDelivered ? 'text-tracking-success' : 'text-tracking-progress'}`}>
        <span className="text-sm font-medium">{isDelivered ? 'Delivered' : 'In Transit'}</span>
      </div>
    </div>
  );
}
