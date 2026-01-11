-- Update package image for ES4267701927US
UPDATE tracking 
SET image_url = '/lovable-uploads/dollars.jpg',
    updated_at = now()
WHERE tracking_number = 'ES4267701927US';