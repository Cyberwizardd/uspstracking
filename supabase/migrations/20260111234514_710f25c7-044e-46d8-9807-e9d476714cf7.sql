-- Insert new tracking record for ES4267701927US
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
  'ES4267701927US',
  'In Transit',
  'Sorting Facility',
  '1618 Scenic Loop, Fairbanks, AK 99709',
  'Tomorrow, 12-01-2026 05:20 PM',
  85,
  '/lovable-uploads/usps_d.jpg',
  '[
    {
      "date": "Jan 12, 2026",
      "time": "5:30 PM",
      "status": "current",
      "location": "Alaska, US",
      "description": "Package is on the way to destination",
      "icon": "plane"
    },
    {
      "date": "Jan 12, 2026",
      "time": "6:15 PM",
      "status": "completed",
      "location": "Alaska, US",
      "description": "Package departed from sorting facility"
    }
  ]'::jsonb
);