# Firebase Setup Guide

Follow these steps to connect your website to Firebase Firestore:

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "three-buttons")
4. Disable Google Analytics (optional, not needed for this project)
5. Click **"Create project"** and wait for it to finish

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (</>) to add a web app
2. Give your app a nickname (e.g., "Three Buttons Website")
3. **DO NOT** check "Also set up Firebase Hosting"
4. Click **"Register app"**

## Step 3: Get Your Firebase Config

After registering, you'll see a code snippet with your Firebase configuration. It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 4: Update Your .env File

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

## Step 5: Set Up Firestore Database

1. In Firebase Console, go to **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll configure rules next)
4. Select a location closest to your users (e.g., "us-east1" or "europe-west1")
5. Click **"Enable"**

## Step 6: Configure Firestore Rules

1. Go to the **"Rules"** tab in Firestore Database
2. Replace the rules with this configuration:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /siteData/{document=**} {
      // Allow anyone to read the data
      allow read: if true;
      // Allow anyone to write (you may want to restrict this later)
      allow write: if true;
    }
  }
}
```

3. Click **"Publish"**

**⚠️ Important**: These rules allow public read/write access. For production, you should add authentication and restrict write access.

## Step 7: Test Your Connection

1. Save all your changes
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Open your website - it should now load data from Firebase!
4. Make an edit in the admin panel - it should save to Firebase automatically

## What Happens Now?

- **All data is stored in Firebase Firestore** in a collection called `siteData`
- **Changes sync automatically** - when you edit in admin panel, it saves to Firebase
- **localStorage is used as backup** - if Firebase fails, data still works locally
- **Data persists across devices** - anyone visiting your admin panel will see the same data

## Troubleshooting

### "Firebase not configured" error
- Check that all values in `.env` match your Firebase config
- Make sure there are no quotes or extra spaces in the `.env` file
- Restart your dev server after changing `.env`

### Data not saving
- Check Firestore Rules are set correctly (see Step 6)
- Check browser console for error messages
- Verify your Firebase project is active and not suspended

### Data not loading
- Check that Firestore database is enabled (Step 5)
- Make sure collection is named `siteData` (lowercase)
- Check browser network tab for Firebase requests

## Security Note

For production deployment, you should:
1. Add Firebase Authentication
2. Restrict Firestore rules to only allow authenticated admins to write
3. Keep your API keys in environment variables (never commit `.env` to git)
