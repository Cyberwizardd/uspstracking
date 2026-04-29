INSERT INTO public.tracking (tracking_number, status, estimated_delivery, estimated_delivery_at, from_location, to_location, progress, events)
VALUES (
  'ES9885768587US',
  'In Transit',
  'Saturday, May 02, 2026 at 2:00 PM',
  '2026-05-02 14:00:00-04',
  'Sorting Facility',
  'David Dempsey, 701 US Highway 46, Kenvil, New Jersey 07847',
  45,
  '[
    {"date":"2026-04-29","time":"09:20","location":"Origin Facility","description":"Package picked up from sender","status":"completed"},
    {"date":"2026-04-29","time":"14:15","location":"Sorting Facility","description":"Package processed at sorting facility","status":"completed"},
    {"date":"2026-04-29","time":"18:30","location":"Sorting Facility","description":"Package departed from sorting facility","status":"completed","icon":"plane"},
    {"date":"2026-04-29","time":"20:00","location":"In Transit","description":"Package is on the way to destination","status":"current"}
  ]'::jsonb
);