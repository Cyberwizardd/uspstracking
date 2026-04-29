import { Calendar, Clock, MapPin, Plane, Building2, Home } from "lucide-react";

function isStreetAddress(location: string): boolean {
  if (!location) return false;
  // A street address typically starts with a number (e.g., "701 US highway 46 ...")
  // or contains a comma with a state/zip pattern.
  if (/^\s*\d+\s+\S+/.test(location)) return true;
  if (/,\s*[A-Z]{2}\s*\d{5}/.test(location)) return true;
  return false;
}

function formatEventDate(dateStr: string): string {
  if (!dateStr) return "";
  const iso = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const d = new Date(Date.UTC(+iso[1], +iso[2] - 1, +iso[3], 12, 0, 0));
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "America/New_York",
    });
  }
  return dateStr;
}

function formatEventTime(timeStr: string): string {
  if (!timeStr) return "";
  const m = timeStr.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return timeStr;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${min} ${period} ET`;
}

interface TimelineEvent {
  date: string;
  time: string;
  location: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  icon?: string;
}

interface TrackingTimelineProps {
  events: TimelineEvent[];
  allDelivered?: boolean;
  deliveryAddress?: string;
  estimatedDeliveryAt?: string | null;
}

function buildDeliveryEntry(
  address: string,
  estimatedAt: string,
  isDelivered: boolean
): TimelineEvent {
  const d = new Date(estimatedAt);
  const date = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "America/New_York",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
  return {
    date,
    time: `${time} ET`,
    location: address,
    description: isDelivered
      ? `Package delivered to ${address}`
      : `Scheduled delivery to ${address}`,
    status: isDelivered ? "completed" : "upcoming",
  };
}

export function TrackingTimeline({
  events,
  allDelivered,
  deliveryAddress,
  estimatedDeliveryAt,
}: TrackingTimelineProps) {
  const baseEvents = Array.isArray(events) ? events : [];
  const hasDeliveryEntry = baseEvents.some(
    (e) => e.description?.toLowerCase().includes("delivered to") ||
           e.description?.toLowerCase().includes("scheduled delivery")
  );
  const allEvents =
    deliveryAddress && estimatedDeliveryAt && !hasDeliveryEntry
      ? [...baseEvents, buildDeliveryEntry(deliveryAddress, estimatedDeliveryAt, !!allDelivered)]
      : baseEvents;

  return (
    <div className="bg-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
      
      <div className="space-y-4">
        {allEvents.map((event, index) => {
          const isCompleted = allDelivered || event.status === 'completed' || event.status === 'current';
          return (
            <div key={index} className="flex items-start space-x-4 relative">
              {/* Connecting line */}
              {index < allEvents.length - 1 && (
                <div className={`
                  absolute left-[5px] top-[20px] w-0.5 h-8 
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-400'}
                `} />
              )}
              
              <div className={`
                w-3 h-3 rounded-full mt-2 flex-shrink-0 relative z-10
                ${isCompleted ? 'bg-green-500' : 'bg-gray-400'}
              `} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-4 mb-1">
                  {event.icon === 'plane' && (
                    <Plane className="h-5 w-5 text-primary font-bold" strokeWidth={2.5} />
                  )}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatEventDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatEventTime(event.time)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className={`h-4 w-4 ${event.location === 'Local Facility' ? 'text-red-500' : 'text-primary'}`} />
                  {isStreetAddress(event.location) ? (
                    <>
                      <Home className="h-4 w-4 text-primary" />
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">Street address</span>
                    </>
                  ) : (
                    <>
                      <Building2 className="h-4 w-4 text-usps-blue" />
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">Facility</span>
                    </>
                  )}
                  <span className="font-medium">{event.location}</span>
                </div>
                
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}