# Image/Video Upload Guide

## ✨ No Setup Required!

The admin panel now supports **direct device uploads** without any backend configuration!

Files are converted to base64 and stored directly in your browser's local storage along with your other site data. No Supabase storage bucket needed!

## How It Works

1. **Upload File Tab** (Default) - Upload directly from your device
   - Max size: 5MB
   - Supports: Images (JPG, PNG, GIF, WebP) and Videos (MP4, WebM)
   - Files are converted to base64 and saved with your site data
   - ✅ No permissions needed
   - ✅ No backend setup required

2. **URL Tab** - Paste external URLs
   - For files larger than 5MB
   - Use free hosting: Imgur, Cloudinary, GitHub
   - Supports any publicly accessible image/video URL

## Optional: Supabase Storage (Advanced)

If you need to handle larger files (>5MB) or prefer cloud storage, you can optionally set up Supabase Storage:

## Steps to Create the Storage Bucket

1. **Go to your Supabase Dashboard**
   - Navigate to https://app.supabase.com
   - Select your project

2. **Create Storage Bucket**
   - Click on "Storage" in the left sidebar
   - Click "New bucket"
   - Enter the following details:
     - **Name**: `media`
     - **Public bucket**: Toggle ON (enabled)
     - **File size limit**: 52428800 (50MB)
   - Click "Create bucket"

3. **Set Storage Policies (Important!)**
   After creating the bucket, you need to set up policies to allow uploads:

   - Click on the `media` bucket
   - Go to "Policies" tab
   - Click "New Policy"
   - Create the following policies:

   **Policy 1: Allow Public Read**
   ```sql
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'media' );
   ```

   **Policy 2: Allow Authenticated Upload**
   ```sql
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   WITH CHECK ( bucket_id = 'media' );
   ```

   **Policy 3: Allow Authenticated Update**
   ```sql
   CREATE POLICY "Authenticated users can update"
   ON storage.objects FOR UPDATE
   USING ( bucket_id = 'media' );
   ```

   **Policy 4: Allow Authenticated Delete**
   ```sql
   CREATE POLICY "Authenticated users can delete"
   ON storage.objects FOR DELETE
   USING ( bucket_id = 'media' );
   ```

4. **Alternative: Allow Anonymous Uploads (Less Secure)**
   If you want to allow uploads without authentication:
   ```sql
   CREATE POLICY "Anyone can upload"
   ON storage.objects FOR INSERT
   WITH CHECK ( bucket_id = 'media' );
   ```

## Supported File Types

The upload component supports:
- **Images**: .jpg, .jpeg, .png, .gif, .webp, .svg
- **Videos**: .mp4, .webm, .mov, .avi, .mkv

## File Size Limit

- Maximum file size: **50MB**

## Troubleshooting

### Error: "Bucket not found"
- Make sure you created the bucket with the exact name `media`
- Check that the bucket is set to "Public"

### Error: "Access denied" or "Permission denied"
- Verify that you've set up the storage policies correctly
- Make sure RLS (Row Level Security) policies are configured

### Files upload but cannot be accessed
- Ensure the bucket is set to "Public"
- Check the public URL format in your Supabase project settings

## Alternative: Using URL Input

If you don't want to set up Supabase storage, you can:
1. Upload your images/videos to a service like:
   - Imgur
   - Cloudinary
   - Google Drive (with public sharing)
   - GitHub (raw URLs)
2. Use the "URL" tab in the upload component
3. Paste the direct URL to your image/video

---

**Note**: For production use, consider implementing proper authentication and file validation on the backend.
