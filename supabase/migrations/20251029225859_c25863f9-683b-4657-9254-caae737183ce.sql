-- Update tracking data for ES4567799907US with correct destination and today's date
UPDATE tracking 
SET events = '[
    {
      "date": "Oct 29, 2025",
      "time": "3:30 PM",
      "status": "current",
      "location": "223 16th Avenue apartment C Cochrane Ontario postal code POL-1C0",
      "description": "Package is on the way to destination",
      "icon": "plane"
    },
    {
      "date": "Oct 29, 2025",
      "time": "10:15 AM",
      "status": "completed",
      "location": "223 16th Avenue apartment C Cochrane Ontario postal code POL-1C0",
      "description": "Package departed from sorting facility"
    }
  ]'::jsonb,
  updated_at = now()
WHERE tracking_number = 'ES4567799907US';