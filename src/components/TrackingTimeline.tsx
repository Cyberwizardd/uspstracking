import { Calendar, Clock, MapPin, Plane } from "lucide-react";

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
}

export function TrackingTimeline({ events, allDelivered }: TrackingTimelineProps) {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start space-x-4 relative">
            {/* Connecting line */}
            {index < events.length - 1 && (
              <div className={`
                absolute left-[5px] top-[20px] w-0.5 h-8 
                ${event.status === 'current' ? 'bg-green-500' : 'bg-gray-400'}
              `} />
            )}
            
            <div className={`
              w-3 h-3 rounded-full mt-2 flex-shrink-0 relative z-10
              ${event.status === 'current' ? 'bg-green-500' : 'bg-gray-400'}
            `} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-4 mb-1">
                {event.icon === 'plane' && (
                  <Plane className="h-5 w-5 text-primary font-bold" strokeWidth={2.5} />
                )}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-1">
                <MapPin className={`h-4 w-4 ${event.location === 'Local Facility' ? 'text-red-500' : 'text-primary'}`} />
                <span className="font-medium">{event.location}</span>
              </div>
              
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}