import { Building2, Home, CheckCircle, Building } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TrackingProgressProps {
  progress: number;
  fromLocation: string;
  toLocation: string;
}

export function TrackingProgress({ progress, fromLocation, toLocation }: TrackingProgressProps) {
  return (
    <div className="bg-card rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-4">Package Journey</h3>
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {fromLocation === "Sorting Facility" ? (
            <Building className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Building2 className="h-4 w-4 text-usps-blue" />
          )}
          <span className="text-sm font-medium">{fromLocation}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Home className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{toLocation}</span>
        </div>
      </div>
      
      <div className="relative">
        <Progress value={progress} className="h-3 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Origin</span>
          <span className="font-medium text-tracking-progress">{progress}% Complete</span>
          <span>Destination</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-2 text-tracking-progress">
        <span className="text-sm font-medium">In Transit</span>
      </div>
    </div>
  );
}