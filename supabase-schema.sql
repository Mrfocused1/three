-- Create table for site data
CREATE TABLE IF NOT EXISTS site_data (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial row for main site data
INSERT INTO site_data (id, data) VALUES ('main', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to images bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow public insert access to images bucket
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Allow public update access to images bucket
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

-- Allow public delete access to images bucket
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');
