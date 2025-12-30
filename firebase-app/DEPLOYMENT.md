# Deployment Guide for Decor.ai

This guide will help you deploy the refactored Firebase application to Firebase Hosting.

## Prerequisites

1. **Firebase CLI** (already installed globally)
2. **Google Account** with access to the Firebase project `imageedit-f1e2d`
3. **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Step-by-Step Deployment

### 1. Configure Environment Variables

The `.env.local` file is already configured with your Firebase credentials, but you need to update the Gemini API key:

```bash
cd /home/user/imageedit/firebase-app
```

Edit `.env.local` and replace `YOUR_GEMINI_API_KEY` with your actual API key from Google AI Studio.

### 2. Firebase Authentication Setup

Before deploying, ensure Firebase Authentication is properly configured:

1. Go to [Firebase Console](https://console.firebase.google.com/project/imageedit-f1e2d/authentication)
2. Navigate to **Authentication** > **Sign-in method**
3. Enable these providers:
   - **Anonymous** (for regular users)
   - **Email/Password** (for admin users)

4. Create an admin user:
   - Go to **Authentication** > **Users**
   - Click **Add user**
   - Email: `admin@admin.com` (or your preferred admin email)
   - Password: Choose a strong password
   - **Remember these credentials for admin login!**

### 3. Firebase Login

Login to Firebase CLI (one-time setup):

```bash
firebase login
```

This will open a browser window for authentication. Login with your Google account that has access to the Firebase project.

### 4. Verify Firebase Project

Check that the project is correctly configured:

```bash
firebase projects:list
```

You should see `imageedit-f1e2d` in the list. If not, run:

```bash
firebase use imageedit-f1e2d
```

### 5. Deploy Firestore Rules and Indexes

Deploy the Firestore security rules and indexes:

```bash
firebase deploy --only firestore
```

This will deploy:
- `firestore.rules` - Security rules for data access
- `firestore.indexes.json` - Database indexes for queries

### 6. Build the Application

Build the optimized production version:

```bash
npm run build
```

Expected output:
```
✓ built in ~8s
dist/index.html                            0.75 kB
dist/assets/index-*.css                   35.17 kB
dist/assets/index-*.js                    39.23 kB
dist/assets/react-vendor-*.js            140.87 kB
dist/assets/firebase-vendor-*.js         445.22 kB
```

### 7. Deploy to Firebase Hosting

Deploy the built application to Firebase Hosting:

```bash
firebase deploy --only hosting
```

Or use the npm script:

```bash
npm run deploy
```

Expected output:
```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/imageedit-f1e2d/overview
Hosting URL: https://imageedit-f1e2d.web.app
```

### 8. Verify Deployment

1. Open the Hosting URL: https://imageedit-f1e2d.web.app
2. Test the application:
   - Upload an image
   - Try a style transformation (requires valid Gemini API key)
   - Test admin login

## Quick Deploy Script

For future deployments, you can use this one-liner:

```bash
npm run build && firebase deploy --only hosting
```

Or the predefined script:

```bash
npm run deploy
```

## Post-Deployment Checklist

- [ ] Verify app loads correctly
- [ ] Test image upload
- [ ] Test camera capture (requires HTTPS)
- [ ] Verify admin login works
- [ ] Check that Gemini API key is working
- [ ] Test style transformation
- [ ] Verify gallery functionality (admin only)

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Deployment Fails
```bash
# Re-authenticate
firebase logout
firebase login

# Try deploying again
firebase deploy --only hosting
```

### API Key Issues
- Ensure `.env.local` has the correct `VITE_GEMINI_API_KEY`
- Restart dev server after changing env variables
- In production, the env vars are baked into the build

### Authentication Issues
1. Check that Anonymous auth is enabled in Firebase Console
2. Verify Email/Password auth is enabled
3. Ensure admin user exists in Firebase Authentication

### Firestore Permission Denied
1. Deploy Firestore rules: `firebase deploy --only firestore:rules`
2. Check rules in Firebase Console
3. Verify collection paths match the app configuration

## Updating the App

To update the deployed app:

1. Make your code changes
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Deploy: `firebase deploy --only hosting`

## Environment Variables in Production

Important: In Vite, environment variables are embedded at build time. If you change `.env.local`, you must rebuild:

```bash
npm run build
firebase deploy --only hosting
```

## Monitoring

View deployment history and analytics:
```bash
firebase hosting:channel:list
```

Or visit the Firebase Console:
https://console.firebase.google.com/project/imageedit-f1e2d/hosting

## Support

For Firebase-specific issues, see:
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

For app-specific issues, refer to the main README.md.
