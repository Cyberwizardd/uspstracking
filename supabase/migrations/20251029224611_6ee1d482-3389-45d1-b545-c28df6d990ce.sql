-- Drop the existing id column and make tracking_number the primary key
ALTER TABLE tracking DROP CONSTRAINT tracking_pkey;
ALTER TABLE tracking DROP COLUMN id;
ALTER TABLE tracking ADD PRIMARY KEY (tracking_number);

-- Update existing records to ensure tracking_number is properly set (if needed)
-- This ensures all existing data maintains integrity