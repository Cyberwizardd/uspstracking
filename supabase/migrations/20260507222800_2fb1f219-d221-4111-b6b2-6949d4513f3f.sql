
-- 1. Drop overly permissive INSERT and UPDATE policies
DROP POLICY IF EXISTS "Anyone can create tracking data" ON public.tracking;
DROP POLICY IF EXISTS "Anyone can update tracking data" ON public.tracking;

-- 2. Fix search_path on update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 3. Revoke public/anon execute on auto_mark_delivered (it's called server-side only)
REVOKE EXECUTE ON FUNCTION public.auto_mark_delivered() FROM anon;
REVOKE EXECUTE ON FUNCTION public.auto_mark_delivered() FROM authenticated;
