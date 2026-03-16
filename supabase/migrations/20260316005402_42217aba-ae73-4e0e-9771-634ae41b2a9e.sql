UPDATE tracking SET events = '[
  {"date": "2026-03-16", "time": "05:50 PM", "location": "", "description": "Package will be on the way to destination", "status": "current"},
  {"date": "2026-03-15", "time": "03:45 PM", "location": "Texas, US", "description": "Package departed from sorting facility", "status": "completed", "icon": "plane"}
]'::jsonb WHERE tracking_number = 'ES4265791169US';