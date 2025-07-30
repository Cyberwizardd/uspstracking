UPDATE tracking SET 
  estimated_delivery = 'Estimated Delivery Due',
  status = 'caution icon',
  progress = 100,
  events = jsonb_build_array(
    jsonb_build_object(
      'date', '2025-07-24',
      'time', '19:30',
      'location', 'Local Facility',
      'description', 'Package return to facilities because Agent met with an accident',
      'status', 'current'
    ),
    jsonb_build_object(
      'date', '2025-07-24',
      'time', '14:15',
      'location', 'Sorting Facility',
      'description', 'Package processed at sorting facility',
      'status', 'completed'
    ),
    jsonb_build_object(
      'date', '2025-07-24',
      'time', '08:00',
      'location', 'Origin Facility',
      'description', 'Package picked up from sender',
      'status', 'completed'
    )
  )
WHERE tracking_number = 'ES310199481US';