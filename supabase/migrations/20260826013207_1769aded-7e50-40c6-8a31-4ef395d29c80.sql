ALTER TABLE public.tracking ADD COLUMN IF NOT EXISTS image_data TEXT;

-- One-time backfill: existing rows keep NULL image_data and continue to use image_url
UPDATE public.tracking SET image_data = NULL WHERE image_data IS NOT NULL;