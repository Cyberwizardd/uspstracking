import { Header } from "@/components/Header";
import { TrackingDetails } from "@/components/TrackingDetails";
import { TrackingProgress } from "@/components/TrackingProgress";
import { TrackingTimeline } from "@/components/TrackingTimeline";

const trackingData = {
  trackingNumber: "ES789645123US",
  status: "Delivered",
  estimatedDelivery: "Tuesday, 2025-07-15 16:30 PM",
  fromLocation: "Sorting Facility",
  toLocation: "707 US highway 46, Kenvil, New Jersey, 07847",
  progress: 100,
  events: [
    {
      date: "2025-07-15",
      time: "16:30 PM",
      location: "New Jersey, US",
      description: "Package has been delivered",
      status: "current" as const
    },
    {
      date: "2025-07-04",
      time: "10:30 AM",
      location: "Texas, US",
      description: "Package is on the way to destination",
      status: "completed" as const
    },
    {
      date: "2025-06-04",
      time: "10:15 AM", 
      location: "Texas, US",
      description: "Package departed from sorting facility",
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