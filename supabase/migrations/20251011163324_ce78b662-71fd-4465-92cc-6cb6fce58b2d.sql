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
  'ES4563951907US',
  'In Transit',
  'Today, 11-10-2025 17:30 PM',
  'Sorting Facility',
  '21 Whitney Ave Portland Maine 04102',
  56,
  '/lovable-uploads/suntrust-card.jpg',
  jsonb_build_array(
    jsonb_build_object(
      'date', '2025-10-11',
      'time', '12:30',
      'location', 'New Jersey, US',
      'description', 'Package is on the way to destination',
      'status', 'current'
    ),
    jsonb_build_object(
      'date', '2025-07-11',
      'time', '10:15',
      'location', 'New Jersey, US',
      'description', 'Package departed from sorting facility',
      'status', 'completed'
    )
  )
);