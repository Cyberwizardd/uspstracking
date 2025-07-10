import { Calendar, Clock, MapPin } from "lucide-react";

interface TimelineEvent {
  date: string;
  time: string;
  location: string;
  description: string;
  status: "completed" | "current" | "upcoming";
}

interface TrackingTimelineProps {
  events: TimelineEvent[];
}

export function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`
              w-3 h-3 rounded-full mt-2 flex-shrink-0
              ${event.status === 'completed' ? 'bg-tracking-success' : 
                event.status === 'current' ? 'bg-tracking-progress' : 'bg-gray-300'}
            `} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-4 mb-1">
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
                <MapPin className="h-4 w-4 text-primary" />
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