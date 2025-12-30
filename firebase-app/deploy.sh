#!/bin/bash
# Firebase Deployment Script for Decor.ai
# Run this script from the firebase-app directory

set -e  # Exit on error

echo "🚀 Starting Firebase Deployment..."
echo ""

# Check if logged in
echo "📋 Step 1: Checking Firebase authentication..."
if ! firebase projects:list > /dev/null 2>&1; then
    echo "❌ Not logged in to Firebase"
    echo "Please run: firebase login"
    echo "Then run this script again"
    exit 1
fi

echo "✅ Firebase authentication confirmed"
echo ""

# Verify project
echo "📋 Step 2: Verifying project configuration..."
firebase use imageedit-f1e2d
echo "✅ Project set to: imageedit-f1e2d"
echo ""

# Deploy Firestore rules
echo "📋 Step 3: Deploying Firestore security rules..."
firebase deploy --only firestore
echo "✅ Firestore rules deployed"
echo ""

# Build application
echo "📋 Step 4: Building application..."
npm run build
echo "✅ Build completed"
echo ""

# Deploy to hosting
echo "📋 Step 5: Deploying to Firebase Hosting..."
firebase deploy --only hosting
echo ""

echo "🎉 Deployment Complete!"
echo ""
echo "📱 Your app is live at: https://imageedit-f1e2d.web.app"
echo "🔧 Console: https://console.firebase.google.com/project/imageedit-f1e2d"
echo ""
echo "⚠️  Don't forget to:"
echo "  1. Enable Anonymous & Email/Password authentication in Firebase Console"
echo "  2. Create an admin user in Authentication > Users"
echo ""
