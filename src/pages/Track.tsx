import { Header } from "@/components/Header";
import { TrackingDetails } from "@/components/TrackingDetails";
import { TrackingProgress } from "@/components/TrackingProgress";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

export default function Track() {
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const { data, error } = await supabase
          .from('tracking')
          .select('*')
          .eq('tracking_number', 'HE7801301585PQ')
          .single();

        if (error) {
          console.error('Error fetching tracking data:', error);
          return;
        }

        setTrackingData(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">Loading tracking data...</div>
        </main>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">Tracking data not found</div>
        </main>
      </div>
    );
  }
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
              trackingNumber={trackingData.tracking_number}
              status={trackingData.status}
              estimatedDelivery={trackingData.estimated_delivery}
              fromLocation={trackingData.from_location}
              toLocation={trackingData.to_location}
            />
            
            <TrackingProgress
              progress={trackingData.progress}
              fromLocation={trackingData.from_location}
              toLocation={trackingData.to_location}
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