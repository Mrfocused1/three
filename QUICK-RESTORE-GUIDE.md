# 🚀 Quick Data Restoration Guide

## Your images are saved! Here's how to restore them:

### Option 1: Use the Automated Recovery Tool (EASIEST)

1. **Open the recovery page in your browser:**
   ```bash
   open restore-corrected-data.html
   ```
   Or manually navigate to: `/home/user/three/restore-corrected-data.html`

2. **Click the button** that says "Click Here to Restore Your Data"

3. **Refresh your website** at `http://localhost:5173`

4. **Done!** Your 12 images should be back:
   - 3 hero card images
   - 9 team member images

---

### Option 2: Manual Setup (If you need to configure .env)

If the above doesn't work, you might need to set up your Supabase environment variables:

1. **Create a `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file** and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://gxiqydbsvtirytqyzavj.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4aXF5ZGJzdnRpcnl0cXl6YXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTQyNTcsImV4cCI6MjA3NzE3MDI1N30.PQ3iv18d2BR_5RrFcc72pgnD1jf_hhUhbfTujuJoXMI
   ```

3. **Start your dev server:**
   ```bash
   npm run dev
   ```

4. **Then use the recovery tool** from Option 1

---

## What Was Fixed?

✅ **Root cause fixed**: Default images no longer overwrite your uploads
✅ **Deep merge implemented**: Saved data takes priority
✅ **Dual backup**: Everything saves to both Supabase AND localStorage
✅ **Recovery tools created**: Multiple ways to restore your data

## Verification

After restoration, verify your images are back:
- 3 hero cards should have images
- 9 team member cards should have images
- All images should be from Supabase storage (URLs starting with `gxiqydbsvtirytqyzavj.supabase.co`)

## Still Having Issues?

If the images don't restore:
1. Open browser console (F12 → Console)
2. Check for any error messages
3. Share the errors so I can help debug further
