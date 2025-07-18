INSERT INTO tracking (
  tracking_number,
  status,
  progress,
  from_location,
  to_location,
  estimated_delivery,
  events
) VALUES (
  'ES310199481US',
  'In Transit',
  60,
  'Sorting Facility',
  '701 US Highway 46, Kenvil, New Jersey, 07847',
  'Monday 16:10 PM',
  '[
    {
      "date": "2025-07-12",
      "time": "10:45 AM",
      "location": "Texas, US",
      "description": "Package is on the way to destination",
      "status": "current"
    },
    {
      "date": "2025-07-11",
      "time": "09:15 AM", 
      "location": "Alaska, US",
      "description": "Package departed from sorting facility",
      "status": "completed"
    }
  ]'::jsonb
);