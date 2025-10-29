-- Update tracking ES4773951917US to delivered status
UPDATE tracking 
SET 
  status = 'Delivered',
  progress = 100,
  events = jsonb_build_array(
    jsonb_build_object(
      'date', 'Mar 25, 2024',
      'time', '8:45 AM',
      'location', 'New York, NY 10001',
      'description', 'Package delivered',
      'status', 'completed'
    ),
    jsonb_build_object(
      'date', 'Mar 25, 2024',
      'time', '6:30 AM',
      'location', 'New York, NY Distribution Center',
      'description', 'Out for delivery',
      'status', 'completed'
    ),
    jsonb_build_object(
      'date', 'Mar 24, 2024',
      'time', '11:20 PM',
      'location', 'Newark, NJ Sorting Facility',
      'description', 'Package processed',
      'status', 'completed'
    ),
    jsonb_build_object(
      'date', 'Mar 24, 2024',
      'time', '3:15 PM',
      'location', 'Philadelphia, PA Distribution Center',
      'description', 'In transit',
      'status', 'completed'
    ),
    jsonb_build_object(
      'date', 'Mar 23, 2024',
      'time', '9:00 AM',
      'location', 'Los Angeles, CA 90001',
      'description', 'Package picked up',
      'status', 'completed'
    )
  ),
  updated_at = now()
WHERE tracking_number = 'ES4773951917US';