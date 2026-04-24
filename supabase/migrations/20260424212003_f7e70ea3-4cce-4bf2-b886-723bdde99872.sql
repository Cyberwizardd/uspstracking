-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Add a real timestamp column for the estimated delivery (keeps the formatted string for display)
ALTER TABLE public.tracking
ADD COLUMN IF NOT EXISTS estimated_delivery_at TIMESTAMPTZ;

-- Backfill existing packages with delivery time of Monday, 27-04-2026 12:00 PM
-- US packages use US Eastern time, AU package uses Sydney time
UPDATE public.tracking
SET estimated_delivery_at = '2026-04-27 12:00:00-04'::timestamptz
WHERE tracking_number IN ('ES4277791169US', 'ES6694768927US');

UPDATE public.tracking
SET estimated_delivery_at = '2026-04-27 12:00:00+09:30'::timestamptz
WHERE tracking_number = 'ES6875768547US';

-- Create the function that marks overdue packages as delivered
CREATE OR REPLACE FUNCTION public.auto_mark_delivered()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  pkg RECORD;
  delivered_event jsonb;
  delivery_date_str text;
  delivery_time_str text;
BEGIN
  FOR pkg IN
    SELECT tracking_number, to_location, events, estimated_delivery_at
    FROM public.tracking
    WHERE status <> 'Delivered'
      AND estimated_delivery_at IS NOT NULL
      AND estimated_delivery_at <= now()
  LOOP
    delivery_date_str := to_char(pkg.estimated_delivery_at, 'YYYY-MM-DD');
    delivery_time_str := to_char(pkg.estimated_delivery_at, 'HH24:MI');

    delivered_event := jsonb_build_object(
      'date', delivery_date_str,
      'time', delivery_time_str,
      'location', pkg.to_location,
      'description', 'Package delivered to ' || pkg.to_location,
      'status', 'completed',
      'icon', 'check'
    );

    UPDATE public.tracking
    SET status = 'Delivered',
        progress = 100,
        events = COALESCE(events, '[]'::jsonb) || delivered_event,
        updated_at = now()
    WHERE tracking_number = pkg.tracking_number;
  END LOOP;
END;
$$;

-- Unschedule any existing job with the same name (safe re-run)
DO $$
BEGIN
  PERFORM cron.unschedule('auto-mark-delivered-job')
  WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'auto-mark-delivered-job');
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Schedule the job to run every 5 minutes
SELECT cron.schedule(
  'auto-mark-delivered-job',
  '*/5 * * * *',
  $$SELECT public.auto_mark_delivered();$$
);