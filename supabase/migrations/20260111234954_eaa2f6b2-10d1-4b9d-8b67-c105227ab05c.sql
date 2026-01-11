-- Insert new tracking record for ES4265801629US
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
  'ES4265801629US',
  'In Transit',
  'Sorting Facility',
  '245 Main Street Manchester, New Hampshire 03102',
  'Tomorrow, 12-01-2026 05:00 PM',
  85,
  '/lovable-uploads/dollars-2.jpg',
  '[
    {
      "date": "Jan 12, 2026",
      "time": "5:30 PM",
      "status": "current",
      "location": "New Hampshire, US",
      "description": "Package is on the way to destination",
      "icon": "plane"
    },
    {
      "date": "Jan 12, 2026",
      "time": "6:15 PM",
      "status": "completed",
      "location": "New Hampshire, US",
      "description": "Package departed from sorting facility"
    }
  ]'::jsonb
);