# Data Recovery Instructions

## What Happened
The data was lost because the code merged `initialData` with saved data incorrectly, causing the default empty images to overwrite your uploaded image URLs.

## Recovery Options (Try in Order)

### Option 1: Supabase Recovery (MOST LIKELY)
**A new browser tab should have opened** showing the Supabase Data Recovery Tool.

1. **It will auto-check Supabase** when it loads
2. If you see "✓ Found data in Supabase!" - **YOUR DATA IS SAFE!**
3. Click the **"Restore from Supabase"** button
4. Then **refresh your website** at `http://localhost:5173`
5. Your images should be back!

### Option 2: Check Browser Developer Tools
If the Supabase tool didn't open:
1. Open Safari DevTools (Develop → Show JavaScript Console)
2. Go to the **Storage** or **Application** tab
3. Look for **IndexedDB** or **Supabase** entries
4. Check if there's any cached data

### Option 3: Recent Uploads in Supabase Storage
Your uploaded images are **likely still in Supabase Storage**, even if the database lost the references:

1. Go to: https://supabase.com/dashboard/project/amiwavztjjldikakrzis/storage/buckets/images
2. Log into your Supabase account
3. Check the **images** bucket
4. You should see your recently uploaded files (they have timestamps in filenames)
5. You can manually re-upload them in the admin panel

### Option 4: Browser Cache
Check if images are still cached:
1. Open Safari → Develop → Show Page Resources
2. Look in the **Images** section
3. Your uploaded images might still be there
4. You can download them and re-upload

### Option 5: Time Machine / Backups
If you have Time Machine or iCloud backups:
1. The localStorage data was at: `~/Library/Safari/LocalStorage/`
2. Restore from a recent backup

## Prevention Measures Implemented

✅ **Fixed the root cause**: Removed default images from initialData
✅ **Deep merge function**: Saved data now always takes precedence
✅ **Double backup**: Every save now goes to both Supabase AND localStorage
✅ **Recovery tools**: Created tools to check and restore from Supabase
✅ **Extensive logging**: Console now shows exactly what's being loaded/saved

## Next Steps After Recovery

1. **Download a backup** using the recovery tool
2. **Keep the backup file** safe on your computer
3. All future edits will be automatically backed up to both locations

## Support

If none of these options work:
1. Send me screenshots of:
   - The Supabase recovery tool output
   - Browser console (F12 → Console)
   - The images bucket in Supabase storage
2. I'll help you manually reconstruct the data

## File Locations
- Supabase Recovery Tool: `/Users/paulbridges/3/check-supabase.html`
- Basic Recovery Tool: `/Users/paulbridges/3/recover-data.html`
