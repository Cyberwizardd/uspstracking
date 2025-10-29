-- Update tracking data for ES4567799907US with new events and package image
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
      "time": "2:00 PM",
      "status": "completed",
      "location": "NEW YORK, NY",
      "description": "Package departed from sorting facility"
    }
  ]'::jsonb,
  image_url = '/lovable-uploads/money-package.jpg',
  updated_at = now()
WHERE tracking_number = 'ES4567899907US';