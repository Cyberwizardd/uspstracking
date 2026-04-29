import { useEffect, useState } from "react";
import { Timer, CheckCircle2 } from "lucide-react";

interface DeliveryCountdownProps {
  estimatedDeliveryAt: string | null;
  isDelivered: boolean;
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function DeliveryCountdown({ estimatedDeliveryAt, isDelivered }: DeliveryCountdownProps) {
  const target = estimatedDeliveryAt ? new Date(estimatedDeliveryAt) : null;
  const [timeLeft, setTimeLeft] = useState(() => (target ? getTimeLeft(target) : null));

  useEffect(() => {
    if (!target || isDelivered) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [estimatedDeliveryAt, isDelivered]);

  if (!estimatedDeliveryAt) return null;

  if (isDelivered || !timeLeft) {
    return (
      <div className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-tracking-success/10 p-3 text-tracking-success">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-semibold">Package Delivered</span>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="mb-4 rounded-lg border bg-gradient-to-br from-usps-blue/5 to-tracking-progress/5 p-4">
      <div className="mb-3 flex items-center justify-center gap-2 text-tracking-progress">
        <Timer className="h-4 w-4" />
        <span className="text-sm font-medium">Arriving in</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {units.map((u) => (
          <div key={u.label} className="rounded-md bg-card p-2 text-center border">
            <div className="text-2xl font-bold tabular-nums text-usps-blue">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
