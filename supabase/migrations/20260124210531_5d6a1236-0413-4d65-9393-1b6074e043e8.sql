-- Create new package tracking for ES4265700169US
INSERT INTO tracking (
  tracking_number,
  status,
  progress,
  from_location,
  to_location,
  estimated_delivery,
  image_url,
  events
) VALUES (
  'ES4265700169US',
  'In Transit',
  75,
  'Sorting Facility',
  '1618 Scenic Loop, Fairbanks, AK 99709',
  'Tuesday, 27-01-2026 04:00 PM',
  '/lovable-uploads/money-es4265700169us.jfif',
  '[
    {
      "date": "2026-01-24",
      "time": "12:55",
      "location": "Fairbanks, US",
      "description": "Package departed from sorting facility",
      "status": "completed"
    },
    {
      "date": "2026-01-24",
      "time": "12:50",
      "location": "Fairbanks, US",
      "description": "Package is on the way to destination",
      "status": "current"
    }
  ]'::jsonb
);