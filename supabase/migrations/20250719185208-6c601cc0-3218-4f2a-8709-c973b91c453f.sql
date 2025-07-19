UPDATE tracking SET events = '[
  {
    "date": "2025-07-19",
    "time": "14:30", 
    "location": "New York",
    "description": "Package is on the way to destination",
    "status": "current"
  },
  {
    "date": "2025-07-18",
    "time": "08:15",
    "location": "New York", 
    "description": "Package departed from sorting facility",
    "status": "completed"
  }
]'::jsonb WHERE tracking_number = 'ES456395197US';