
import { Package, Clock, MapPin, Building2, Home, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDeliveryDateTime } from "@/lib/formatDelivery";
import { EtaCountdown } from "./EtaCountdown";

interface TrackingDetailsProps {
  trackingNumber: string;
  ownerName?: string | null;
  status: string;
  estimatedDelivery: string;
  estimatedDeliveryAt?: string | null;
  fromLocation: string;
  toLocation: string;
  imageUrl?: string;
}


export function TrackingDetails({ 
  trackingNumber,
  ownerName,
  status, 
  estimatedDelivery, 
  estimatedDeliveryAt,

  fromLocation, 
  toLocation,
  imageUrl 
}: TrackingDetailsProps) {
  console.log('TrackingDetails imageUrl:', imageUrl);
  
  // Fix the image URL to use the correct absolute path
  const getImageUrl = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/lovable-uploads/')) {
      return `${window.location.origin}${url}`;
    }
    return url;
  };

  // Use the specific image for different tracking numbers
  const finalImageUrl = trackingNumber === "ES310199481US" 
    ? "/lovable-uploads/d93f30ba-d077-4fcf-8c38-4165e08bf22f.png"
    : trackingNumber === "ES456395197US"
    ? "/lovable-uploads/3f24deac-9720-47d0-9beb-b2fbe73606a6.png"
    : trackingNumber === "ES6694768927US"
    ? new URL("@/assets/package-es6694768927us.jpg", import.meta.url).href
    : trackingNumber === "ES6875768547US"
    ? new URL("@/assets/package-es6875768547us.jpeg", import.meta.url).href
    : (imageUrl ? getImageUrl(imageUrl) : null);
  console.log('Final image URL:', finalImageUrl);

  return (
    <div className="bg-card rounded-lg p-6 border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Package Details</h2>
        <Badge className="bg-tracking-success text-white">
          {status}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex-1">
          <div className="bg-tracking-success text-white p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span className="font-medium">Tracking Number:</span>
            </div>
            <div className="mt-1 text-lg font-bold">{trackingNumber}</div>
          </div>
        </div>

        {ownerName && (
          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <UserRound className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Package Owner</p>
              <p className="font-semibold">{ownerName}</p>
            </div>
          </div>
        )}
        
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
          <p className="text-lg font-semibold">{formatDeliveryDateTime(estimatedDelivery) || estimatedDelivery}</p>
          <EtaCountdown
            estimatedDeliveryAt={estimatedDeliveryAt ?? estimatedDelivery}
            isDelivered={status === "Delivered"}
          />
        </div>


        {/* Package Item section - only show title "Package Item" for ES310199481US */}
        <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">
              {trackingNumber === "ES310199481US" ? "Package Item" : "Package Details"}
            </span>
          </div>
          <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
            {finalImageUrl ? (
              <div className="space-y-3">
                <img 
                  src={finalImageUrl} 
                  alt="Package Item" 
                  className="w-full h-48 object-cover rounded-lg border"
                  onError={(e) => {
                    console.error('Image failed to load:', finalImageUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => console.log('Image loaded successfully:', finalImageUrl)}
                />
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Package Item Image</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No package image available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
