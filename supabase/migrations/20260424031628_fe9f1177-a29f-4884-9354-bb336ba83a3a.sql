INSERT INTO public.tracking (tracking_number, status, estimated_delivery, from_location, to_location, progress, events)
VALUES (
  'ES6875768547US',
  'In Transit',
  'Monday, 27-04-2026 12:00 PM',
  'Sorting Facility',
  '21 Pertwood Road, Elizabeth North, South Australia, 5113 (Kenneth David Leeks)',
  50,
  '[
    {"date": "2026-04-24", "time": "13:02", "location": "Australia", "description": "Package is on the way to destination", "status": "current", "icon": "plane"},
    {"date": "2026-04-24", "time": "13:13", "location": "Australia", "description": "Package departed from sorting facility", "status": "completed"}
  ]'::jsonb
);