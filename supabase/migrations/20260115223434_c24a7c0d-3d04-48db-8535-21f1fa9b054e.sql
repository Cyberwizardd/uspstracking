-- Insert new tracking record for ES4264781927US
INSERT INTO tracking (
  tracking_number,
  status,
  from_location,
  to_location,
  estimated_delivery,
  progress,
  image_url,
  events
) VALUES (
  'ES4264781927US',
  'In Transit',
  'Sorting Facility',
  '701 US HIGHWAY 46 KENVIL NEW JERSEY 07847',
  'Tomorrow, 16-01-2026 04:30 PM',
  90,
  '/lovable-uploads/dollars-3.jpg',
  '[
    {
      "date": "2026-01-15",
      "time": "16:30",
      "location": "New Jersey, US",
      "description": "Package is on the way to destination",
      "status": "current"
    },
    {
      "date": "2026-01-15",
      "time": "17:20",
      "location": "New Jersey, US",
      "description": "Package departed from sorting facility",
      "status": "completed"
    }
  ]'::jsonb
);