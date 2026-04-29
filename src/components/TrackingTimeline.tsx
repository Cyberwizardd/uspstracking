import { useState } from "react";
import { Calendar, Clock, MapPin, Plane, Building2, Home, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

function isStreetAddress(location: string): boolean {
  if (!location) return false;
  // Starts with a number (e.g., "701 US highway 46 ...")
  if (/^\s*\d+\s+\S+/.test(location)) return true;
  // Contains a street number anywhere (e.g., "David Dempsey, 701 US Highway 46, ...")
  if (/(?:^|[\s,])\d{1,6}\s+[A-Za-z]/.test(location)) return true;
  // US state + ZIP pattern
  if (/,\s*[A-Za-z ]+\s+\d{5}(?:-\d{4})?/.test(location)) return true;
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

function getStatusBadge(event: TimelineEvent): { label: string; className: string } {
  const desc = (event.description || "").toLowerCase();
  const loc = (event.location || "").toLowerCase();

  if (desc.includes("delivered")) {
    return { label: "Delivered", className: "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30" };
  }
  if (desc.includes("scheduled") || event.status === "upcoming") {
    return { label: "Scheduled", className: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30" };
  }
  if (desc.includes("out for delivery")) {
    return { label: "Out for Delivery", className: "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30" };
  }
  if (desc.includes("departed") || event.icon === "plane") {
    return { label: "Departed", className: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/30" };
  }
  if (desc.includes("on the way") || desc.includes("in transit") || loc === "in transit") {
    return { label: "In Transit", className: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30" };
  }
  if (desc.includes("processed") || desc.includes("sorting")) {
    return { label: "Processed", className: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30" };
  }
  if (desc.includes("picked up") || desc.includes("pickup")) {
    return { label: "Picked Up", className: "bg-teal-500/15 text-teal-700 dark:text-teal-400 border-teal-500/30" };
  }
  if (event.status === "current") {
    return { label: "Current", className: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30" };
  }
  return { label: "Update", className: "bg-muted text-muted-foreground border-border" };
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
        {allEvents.map((event, index) => (
          <TimelineRow
            key={index}
            event={event}
            isLast={index === allEvents.length - 1}
            allDelivered={!!allDelivered}
          />
        ))}
      </div>
    </div>
  );
}

interface TimelineRowProps {
  event: TimelineEvent;
  isLast: boolean;
  allDelivered: boolean;
}

function TimelineRow({ event, isLast, allDelivered }: TimelineRowProps) {
  const [open, setOpen] = useState(false);
  const isCompleted = allDelivered || event.status === 'completed' || event.status === 'current';
  const isStreet = isStreetAddress(event.location);
  const formattedDate = formatEventDate(event.date);
  const formattedTime = formatEventTime(event.time);

  return (
    <div className="flex items-start space-x-4 relative">
      {/* Connecting line */}
      {!isLast && (
        <div className={`
          absolute left-[5px] top-[20px] w-0.5 h-full
          ${isCompleted ? 'bg-green-500' : 'bg-gray-400'}
        `} />
      )}

      <div className={`
        w-3 h-3 rounded-full mt-2 flex-shrink-0 relative z-10
        ${isCompleted ? 'bg-green-500' : 'bg-gray-400'}
      `} />

      <Collapsible open={open} onOpenChange={setOpen} className="flex-1 min-w-0">
        <CollapsibleTrigger className="w-full text-left rounded-md px-2 py-2 -mx-2 hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-4 min-w-0">
              {event.icon === 'plane' && (
                <Plane className="h-5 w-5 text-primary font-bold flex-shrink-0" strokeWidth={2.5} />
              )}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formattedTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${badge.className}`}>
                {badge.label}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-1">
            <MapPin className={`h-4 w-4 ${event.location === 'Local Facility' ? 'text-red-500' : 'text-primary'}`} />
            {isStreet ? (
              <>
                <Home className="h-4 w-4 text-primary" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">Home</span>
              </>
            ) : (
              <>
                <Building2 className="h-4 w-4 text-usps-blue" />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">Facility</span>
              </>
            )}
            <span className="font-medium truncate">{event.location}</span>
          </div>

          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="mt-2 ml-2 rounded-md border bg-muted/30 p-3 text-sm space-y-2">
            <div className="grid grid-cols-[110px_1fr] gap-y-1">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{formattedDate}</span>

              <span className="text-muted-foreground">Time</span>
              <span className="font-medium">{formattedTime}</span>

              <span className="text-muted-foreground">Location type</span>
              <span className="font-medium">{isStreet ? 'Home' : 'Facility'}</span>

              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{event.location}</span>

              <span className="text-muted-foreground">Status</span>
              <span className="font-medium capitalize">{event.status}</span>

              <span className="text-muted-foreground">Details</span>
              <span className="font-medium">{event.description}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}