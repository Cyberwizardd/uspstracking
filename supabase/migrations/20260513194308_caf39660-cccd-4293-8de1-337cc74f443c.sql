UPDATE public.tracking
SET 
  estimated_delivery = 'Friday, May 15, 2026',
  estimated_delivery_at = '2026-05-15 18:00:00+00',
  status = 'In Transit',
  progress = 86,
  updated_at = now()
WHERE tracking_number = 'ES9885768587US';