import { useEffect, useState } from "react";
import { Timer } from "lucide-react";

interface EtaCountdownProps {
  estimatedDeliveryAt?: string | null;
  isDelivered?: boolean;
}

function format(target: Date): string | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

export function EtaCountdown({ estimatedDeliveryAt, isDelivered }: EtaCountdownProps) {
  const target = estimatedDeliveryAt ? new Date(estimatedDeliveryAt) : null;
  const valid = target && !isNaN(target.getTime());
  const [label, setLabel] = useState<string | null>(() => (valid ? format(target!) : null));

  useEffect(() => {
    if (!valid || isDelivered) return;
    setLabel(format(target!));
    const id = setInterval(() => setLabel(format(target!)), 30000);
    return () => clearInterval(id);
  }, [estimatedDeliveryAt, isDelivered]);

  if (!valid) return null;

  return (
    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-tracking-progress/10 px-3 py-1 text-sm font-medium text-tracking-progress">
      <Timer className="h-4 w-4" />
      {isDelivered || !label ? "Arrived" : `Arriving in ${label}`}
    </div>
  );
}
