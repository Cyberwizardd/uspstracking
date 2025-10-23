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
  'ES4773951917US',
  'In Transit',
  'Tomorrow, 2025-10-24 at 08:30 AM',
  'Sorting Facility',
  '1206 11th Street SE St. Cloud MN 56304',
  65,
  '/lovable-uploads/suntrust-card.jpg',
  jsonb_build_array(
    jsonb_build_object(
      'date', '2025-10-24',
      'time', '08:30 AM',
      'location', 'MINNESOTA, US',
      'description', 'Package processed at sorting facility',
      'status', 'upcoming'
    ),
    jsonb_build_object(
      'date', '2025-10-23',
      'time', '10:30',
      'location', 'ILLINOIS, US',
      'description', 'Package is on the way to destination',
      'status', 'current'
    ),
    jsonb_build_object(
      'date', '2025-10-23',
      'time', '10:30',
      'location', 'ILLINOIS, US',
      'description', 'Package departed from sorting facility',
      'status', 'completed'
    )
  )
);