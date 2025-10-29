-- Insert new tracking data for ES4567799907US
INSERT INTO tracking (
  tracking_number,
  status,
  estimated_delivery,
  from_location,
  to_location,
  progress,
  image_url,
  events
) VALUES (
  'ES4567799907US',
  'In Transit',
  'Tomorrow, 30-10-2025 at 10:20 AM',
  'Sorting Facility',
  '223 16th Avenue apartment C Cochrane Ontario postal code POL-1C0',
  80,
  null,
  '[
    {
      "date": "Oct 29, 2025",
      "time": "3:30 PM",
      "status": "current",
      "location": "New Jersey, US",
      "description": "Package is on the way to destination",
      "icon": "plane"
    },
    {
      "date": "Jul 11, 2025",
      "time": "10:15 AM",
      "status": "completed",
      "location": "New Jersey, US",
      "description": "Package departed from sorting facility"
    }
  ]'::jsonb
)
ON CONFLICT (tracking_number) 
DO UPDATE SET
  status = EXCLUDED.status,
  estimated_delivery = EXCLUDED.estimated_delivery,
  from_location = EXCLUDED.from_location,
  to_location = EXCLUDED.to_location,
  progress = EXCLUDED.progress,
  events = EXCLUDED.events,
  updated_at = now();