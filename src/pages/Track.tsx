import { Header } from "@/components/Header";
import { TrackingDetails } from "@/components/TrackingDetails";
import { TrackingProgress } from "@/components/TrackingProgress";
import { TrackingTimeline } from "@/components/TrackingTimeline";

const trackingData = {
  trackingNumber: "HE7801301585PQ",
  status: "In Transit",
  estimatedDelivery: "Saturday, 13:00 PM",
  fromLocation: "Sorting Facility",
  toLocation: "4251 Bonner Dr Olive Branch,Ms 38654",
  progress: 56,
  events: [
    {
      date: "2025-07-18",
      time: "08:30",
      location: "Texas, US",
      description: "Package is on the way to destination",
      status: "current" as const
    },
    {
      date: "2025-07-18",
      time: "08:15",
      location: "Texas, US",
      description: "Package departed from sorting facility",
      status: "completed" as const
    },
    {
      date: "2025-07-17",
      time: "10:20",
      location: "Texas, US",
      description: "Package processed at sorting facility",
      status: "completed" as const
    },
    {
      date: "2025-07-17",
      time: "09:20",
      location: "Package picked up from sender (Travis)",
      description: "Package picked up from sender (Travis)",
      status: "completed" as const
    }
  ]
};

export default function Track() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Package Tracking</h1>
          <p className="text-center text-muted-foreground">
            Track your package in real-time with detailed updates
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <TrackingDetails
              trackingNumber={trackingData.trackingNumber}
              status={trackingData.status}
              estimatedDelivery={trackingData.estimatedDelivery}
              fromLocation={trackingData.fromLocation}
              toLocation={trackingData.toLocation}
            />
            
            <TrackingProgress
              progress={trackingData.progress}
              fromLocation={trackingData.fromLocation}
              toLocation={trackingData.toLocation}
            />
          </div>
          
          <div>
            <TrackingTimeline events={trackingData.events} />
          </div>
        </div>
      </main>
    </div>
  );
}