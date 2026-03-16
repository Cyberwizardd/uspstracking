INSERT INTO tracking (tracking_number, status, estimated_delivery, from_location, to_location, progress, image_url, events)
VALUES (
  'ES4265791169US',
  'In Transit',
  'Thursday, 19-03-2026 03:30 PM',
  'Sorting Facility',
  '1068 HWY 36 EAST HAMILTON,TX 76531',
  50,
  '/lovable-uploads/money-es4265791169us.jpeg',
  '[
    {"date": "2026-03-15", "time": "03:45 PM", "location": "Texas, US", "description": "Package departed from sorting facility", "status": "current", "icon": "plane"},
    {"date": "2026-01-24", "time": "12:50 PM", "location": "Sorting Facility", "description": "Package is on the way to destination", "status": "completed"}
  ]'::jsonb
);