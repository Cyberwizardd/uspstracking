-- Update estimated delivery date for ES4267701927US to Today
UPDATE tracking 
SET estimated_delivery = REPLACE(estimated_delivery, 'Tomorrow', 'Today')
WHERE tracking_number = 'ES4267701927US';