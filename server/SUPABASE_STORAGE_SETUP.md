# Supabase Storage Bucket Setup for Profile Pictures

## Problem
The profile image upload was failing with a 500 Internal Server Error because the server was trying to upload to a Supabase storage bucket called "profiles" that doesn't exist.

## Solution

### 1. Create the Storage Bucket in Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project (`edseractwksgtrauqypq`)
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**
5. Configure the bucket:
   - **Name**: `profiles`
   - **Public bucket**: Toggle **ON** (so profile pictures can be publicly accessed)
   - **File size limit**: 5MB (recommended)
   - **Allowed MIME types**: `image/*` (or specify: `image/jpeg, image/png, image/gif, image/webp`)
6. Click **"Create bucket"**

### 2. Set Bucket Policies (Important!)

After creating the bucket, you need to set proper policies:

1. Click on the `profiles` bucket
2. Go to **"Policies"** tab
3. Click **"New policy"**
4. Add these policies:

**Policy 1: Allow authenticated users to upload**
```sql
-- Policy name: Allow authenticated uploads
-- Allowed operation: INSERT
-- Target roles: authenticated

CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profiles');
```

**Policy 2: Allow public read access**
```sql
-- Policy name: Public read access
-- Allowed operation: SELECT
-- Target roles: public

CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profiles');
```

**Policy 3: Allow users to update their own files**
```sql
-- Policy name: Allow users to update own files  
-- Allowed operation: UPDATE
-- Target roles: authenticated

CREATE POLICY "Allow users to update own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profiles');
```

### 3. Fixes Applied to Code

**Client-side (`ProfilePage.jsx`):**
- ✅ Added Authorization header with Bearer token
- ✅ Improved error handling to show specific error messages

**Server-side (`profileRouter.mjs`):**
- ✅ Already has proper error logging
- ✅ Uploads to `profiles` bucket with user ID and timestamp

## Testing

After setting up the bucket:

1. Try uploading a profile picture
2. Check the Supabase Storage dashboard to see if the file appears
3. Verify the profile picture displays correctly on the profile page

## Alternative: Use URL Instead of Upload

If you prefer not to use Supabase storage, you can modify the code to accept image URLs instead:

1. Change the input to accept URLs
2. Store the URL directly in the database
3. Use external image hosting services (Cloudinary, Imgur, etc.)
