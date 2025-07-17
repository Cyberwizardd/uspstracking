import { Header } from "@/components/Header";
import { TrackingDetails } from "@/components/TrackingDetails";
import { TrackingProgress } from "@/components/TrackingProgress";
import { TrackingTimeline } from "@/components/TrackingTimeline";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Track() {
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searched, setSearched] = useState(false);

  // Check for quick track data from homepage
  useEffect(() => {
    const quickTrackData = sessionStorage.getItem('quickTrackData');
    if (quickTrackData) {
      const data = JSON.parse(quickTrackData);
      setTrackingData(data);
      setTrackingNumber(data.tracking_number);
      setSearched(true);
      sessionStorage.removeItem('quickTrackData');
    }
  }, []);

  const handleSearch = async () => {
    if (!trackingNumber.trim()) return;
    
    setLoading(true);
    setSearched(true);
    setTrackingData(null);

    try {
      const { data, error } = await supabase
        .from('tracking')
        .select('*')
        .eq('tracking_number', trackingNumber.trim())
        .maybeSingle();

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
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

        {/* Search Section */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter tracking number..."
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading || !trackingNumber.trim()}
              className="px-4"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Searching for tracking information...</p>
          </div>
        )}

        {/* No Results State */}
        {searched && !loading && !trackingData && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tracking information found for "{trackingNumber}"</p>
            <p className="text-sm text-muted-foreground mt-2">Please check your tracking number and try again.</p>
          </div>
        )}

        {/* Results */}
        {trackingData && !loading && (
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
        )}
      </main>
    </div>
  );
}