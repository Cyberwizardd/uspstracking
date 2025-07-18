import { Package, Clock, MapPin, Building2, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrackingDetailsProps {
  trackingNumber: string;
  status: string;
  estimatedDelivery: string;
  fromLocation: string;
  toLocation: string;
  imageUrl?: string;
}

export function TrackingDetails({ 
  trackingNumber, 
  status, 
  estimatedDelivery, 
  fromLocation, 
  toLocation,
  imageUrl 
}: TrackingDetailsProps) {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Package Details</h2>
        <Badge className="bg-tracking-success text-white">
          {status}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-6 mb-4">
          <div className="w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Package Item" 
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <div className="bg-tracking-success text-white p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span className="font-medium">Tracking Number:</span>
              </div>
              <div className="mt-1 text-lg font-bold">{trackingNumber}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>From:</span>
            </div>
            <p className="font-medium">{fromLocation}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <span>To:</span>
            </div>
            <p className="font-medium">{toLocation}</p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-tracking-progress" />
            <span className="font-medium text-tracking-progress">Estimated Delivery</span>
          </div>
          <p className="text-lg font-semibold">{estimatedDelivery}</p>
        </div>
      </div>
    </div>
  );
}