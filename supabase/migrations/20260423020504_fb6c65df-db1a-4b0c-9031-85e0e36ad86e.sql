-- Insert new tracking record for ES6694768927US
INSERT INTO tracking (
  tracking_number,
  status,
  estimated_delivery,
  from_location,
  to_location,
  progress,
  events,
  image_url
) VALUES (
  'ES6694768927US',
  'In Transit',
  'Monday, 27-04-2026 12:00 PM',
  'Sorting Facility',
  '701 US HIGHWAY 46 KENVIL NEW JERSEY 07847',
  50,
  '[
    {
      "date": "2026-04-27",
      "time": "12:30 PM",
      "location": "New Jersey, US",
      "description": "Package is on the way to destination",
      "status": "current"
    },
    {
      "date": "2026-04-23",
      "time": "17:20",
      "location": "New Jersey, US",
      "description": "Package departed from sorting facility",
      "status": "completed"
    }
  ]'::jsonb,
  '/src/assets/package-es6694768927us.png'
);