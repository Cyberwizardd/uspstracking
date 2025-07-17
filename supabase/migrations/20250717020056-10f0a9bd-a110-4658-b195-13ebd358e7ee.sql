-- Create tracking table for package tracking data
CREATE TABLE public.tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL,
  estimated_delivery TEXT,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  events JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tracking ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for tracking lookup)
CREATE POLICY "Anyone can view tracking data" 
ON public.tracking 
FOR SELECT 
USING (true);

-- Create policy to allow public insert (for creating new tracking entries)
CREATE POLICY "Anyone can create tracking data" 
ON public.tracking 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow public update
CREATE POLICY "Anyone can update tracking data" 
ON public.tracking 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tracking_updated_at
BEFORE UPDATE ON public.tracking
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert the current tracking data
INSERT INTO public.tracking (
  tracking_number,
  status,
  estimated_delivery,
  from_location,
  to_location,
  progress,
  events
) VALUES (
  'HE7801301585PQ',
  'In Transit',
  'Saturday, 13:00 PM',
  'Sorting Facility',
  '4251 Bonner Dr Olive Branch,Ms 38654',
  56,
  '[
    {
      "date": "2025-07-18",
      "time": "08:30",
      "location": "Texas, US",
      "description": "Package is on the way to destination",
      "status": "current"
    },
    {
      "date": "2025-07-18",
      "time": "08:15",
      "location": "Texas, US",
      "description": "Package departed from sorting facility",
      "status": "completed"
    },
    {
      "date": "2025-07-17",
      "time": "10:20",
      "location": "Texas, US",
      "description": "Package processed at sorting facility",
      "status": "completed"
    },
    {
      "date": "2025-07-17",
      "time": "09:20",
      "location": "Package picked up from sender (Travis)",
      "description": "Package picked up from sender (Travis)",
      "status": "completed"
    }
  ]'::jsonb
);