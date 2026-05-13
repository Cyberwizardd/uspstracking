UPDATE public.tracking
SET events = (
  SELECT jsonb_agg(elem)
  FROM jsonb_array_elements(events) elem
  WHERE elem->>'description' NOT ILIKE '%delivered%'
),
updated_at = now()
WHERE tracking_number = 'ES9885768587US';