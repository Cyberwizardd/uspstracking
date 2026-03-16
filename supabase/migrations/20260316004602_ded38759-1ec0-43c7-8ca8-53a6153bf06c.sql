UPDATE tracking 
SET events = '[
  {"date": "2026-03-16", "time": "05:50 PM", "location": "Texas, US", "description": "In Transit", "status": "current"},
  {"date": "2026-03-15", "time": "03:45 PM", "location": "Texas, US", "description": "Package departed from sorting facility", "status": "completed", "icon": "plane"},
  {"date": "2026-01-24", "time": "12:50 PM", "location": "Sorting Facility", "description": "Package is on the way to destination", "status": "completed"}
]'::jsonb
WHERE tracking_number = 'ES4265791169US';