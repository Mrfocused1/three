# 🛡️ How to Prevent Image Upload Data Loss

## What Caused the Bug

The bug occurred because:
1. **Placeholder images in `initialData`** - The code had default image URLs in the `initialData` object
2. **Incorrect merge logic** - When loading saved data, it was merging incorrectly and overwriting user uploads with these defaults
3. **No data validation** - There was no check to prevent empty values from overwriting real data

## ✅ What's Already Fixed

### 1. **Deep Merge Function** (Lines 216-230 in `DataContext.jsx`)
```javascript
const deepMerge = (initial, saved) => {
  const result = { ...initial }

  for (const key in saved) {
    if (saved[key] && typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
      result[key] = deepMerge(initial[key] || {}, saved[key])
    } else {
      // For arrays and primitives, prefer saved data
      result[key] = saved[key]  // ← This prioritizes YOUR data
    }
  }

  return result
}
```

**This ensures:** Saved data ALWAYS takes priority over default values.

### 2. **Empty Default Images** (Lines 27-46)
```javascript
heroCards: [
  {
    id: 'work',
    title: 'WORK WITH US',
    type: 'work-card',
    image: ''  // ← Empty string instead of placeholder URL
  },
  // ...
]
```

**This ensures:** No placeholder images can overwrite your uploads.

### 3. **Dual Backup System** (Lines 256-257, 308-312)
- Every save goes to **both** Supabase and localStorage
- If one fails, you have a backup
- Automatic fallback to localStorage if Supabase is unreachable

### 4. **Extensive Logging** (Lines 236, 249, 253)
- Console logs show exactly what data is being loaded
- Makes debugging much easier
- You can see if data is being overwritten

## 🚨 Rules to Follow to Prevent This Forever

### **Rule #1: NEVER Add Placeholder Images to `initialData`**

❌ **BAD:**
```javascript
const initialData = {
  heroCards: [
    {
      id: 'work',
      image: 'https://example.com/default.jpg'  // ← DON'T DO THIS
    }
  ]
}
```

✅ **GOOD:**
```javascript
const initialData = {
  heroCards: [
    {
      id: 'work',
      image: ''  // ← Empty string or null only
    }
  ]
}
```

### **Rule #2: Always Test Image Uploads After Code Changes**

After ANY change to `DataContext.jsx`:
1. Upload a test image
2. Refresh the page
3. Verify the image is still there
4. Check browser console for errors

### **Rule #3: Never Modify the `deepMerge` Function**

The `deepMerge` function (lines 217-230) is critical. If you need to change it:
1. Create a backup of the file first
2. Test thoroughly with real data
3. Verify saved data still takes priority

### **Rule #4: Keep Dual Backups Enabled**

The code saves to both Supabase AND localStorage. Don't remove either backup system:
```javascript
// Both of these are critical:
localStorage.setItem('siteData', JSON.stringify(data))  // Local backup
await supabase.from('site_data').upsert(...)  // Cloud backup
```

### **Rule #5: Monitor Console Logs**

The code logs important events. Check browser console (F12) to see:
- `=== LOADING DATA ===` - When data is being loaded
- `Loaded from Supabase:` - What data was loaded
- `Merged data:` - The final merged result

If you see images disappearing, these logs will show where.

## 🔧 Additional Prevention Measures

### 1. **Create Regular Backups**

Download a backup of your data monthly:

1. Visit `/restore` page
2. Open browser console (F12)
3. Run:
```javascript
const data = localStorage.getItem('siteData')
console.log(data)
// Copy this and save to a file
```

### 2. **Use Version Control for Data Structure**

If you add new fields to `initialData`, document them:
```javascript
const initialData = {
  // Version: 1.0
  // Last updated: 2025-01-15
  // Changes: Added new heroCards structure
  heroCards: [...]
}
```

### 3. **Add Data Validation in Admin Panel**

Consider adding validation before saving:
```javascript
const validateImage = (imageUrl) => {
  if (!imageUrl || imageUrl.trim() === '') {
    console.warn('Warning: Saving empty image')
    // Maybe show a warning to the user
  }
  return imageUrl
}
```

### 4. **Test Before Deploying**

Before pushing to production:
1. Test locally with `npm run dev`
2. Upload test images
3. Refresh and verify images persist
4. Check both localStorage and Supabase have the data

## 📝 Quick Checklist Before Deploying Changes

- [ ] No placeholder image URLs in `initialData`
- [ ] `deepMerge` function is unchanged (or thoroughly tested)
- [ ] Dual backup system is intact
- [ ] Tested image uploads locally
- [ ] Verified data persists after refresh
- [ ] Checked console logs for errors
- [ ] Backed up current data before deploying

## 🆘 If Data Loss Happens Again

1. **Don't panic** - Your images are in Supabase storage
2. **Visit** `/restore` on your website
3. **Click** the restore button
4. **Check** the console logs to identify the issue
5. **Review** `DataContext.jsx` for recent changes

## 🎯 Key Takeaway

**The golden rule:** Saved user data should ALWAYS take priority over default values. The `deepMerge` function ensures this, but only if you:
- Keep `initialData` free of placeholder images
- Don't modify the merge logic
- Maintain the dual backup system

Follow these rules, and this bug will never happen again! 🛡️
