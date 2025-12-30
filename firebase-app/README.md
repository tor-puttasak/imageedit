# Decor.ai - AI Image Style Transfer

A modern, refactored React application for transforming images using AI-powered style transfer with Google Gemini API.

## Features

### For Users
- **Upload Images**: Upload from your device or capture with camera
- **Style Selection**: Choose from preset styles or create custom prompts
- **AI Processing**: Transform images using Google Gemini 2.0 Flash
- **Download**: Save your transformed artworks

### For Administrators
- **Style Management**: Create, edit, and delete style presets
- **Gallery Management**: View and manage all generated images
- **Firestore Integration**: Real-time synchronization of styles and gallery

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS 3
- **Backend**: Firebase (Firestore + Authentication)
- **AI**: Google Gemini API
- **Icons**: Lucide React

## Project Structure

```
firebase-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AuthErrorBanner.jsx
│   │   ├── LoginModal.jsx
│   │   ├── Navigation.jsx
│   │   └── StatusToast.jsx
│   ├── views/            # Page views
│   │   ├── AdminView.jsx
│   │   ├── CameraView.jsx
│   │   ├── EditorView.jsx
│   │   ├── GalleryView.jsx
│   │   └── HomeView.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useFirestore.js
│   ├── utils/            # Utility functions
│   │   ├── camera.js
│   │   └── gemini.js
│   ├── config/           # Configuration files
│   │   ├── constants.js
│   │   └── firebase.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── firebase.json         # Firebase hosting configuration
├── .firebaserc           # Firebase project configuration
├── firestore.rules       # Firestore security rules
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

## Setup Instructions

### 1. Clone and Install

```bash
cd firebase-app
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Gemini API
VITE_GEMINI_API_KEY=your-gemini-api-key

# App Configuration
VITE_APP_ID=image-decorator-v2
```

### 3. Firebase Setup

#### Enable Firebase Authentication
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (`imageedit-f1e2d`)
3. Navigate to **Authentication** > **Sign-in method**
4. Enable **Anonymous** authentication
5. Enable **Email/Password** authentication (for admin)

#### Create Admin User
1. Go to **Authentication** > **Users**
2. Click **Add user**
3. Enter admin email (e.g., `admin@admin.com`) and password
4. Save the user

#### Set up Firestore
1. Navigate to **Firestore Database**
2. Click **Create database**
3. Choose production mode
4. Select a location
5. Deploy the firestore rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### 4. Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an API key
3. Add it to your `.env.local` file

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
# Login to Firebase (first time only)
firebase login

# Deploy
firebase deploy
```

Or use the combined command:

```bash
npm run deploy
```

Your app will be available at: `https://imageedit-f1e2d.web.app`

## Code Improvements

This refactored version includes:

### ✅ Modular Architecture
- Split monolithic component into 20+ smaller, focused files
- Separated concerns: components, views, hooks, utils, config

### ✅ Better State Management
- Custom hooks for auth (`useAuth`) and Firestore (`useFirestore`, `useStyles`, `useGallery`)
- Cleaner separation of business logic from UI

### ✅ Enhanced Security
- API keys moved to environment variables
- Firestore security rules implemented
- No hardcoded sensitive data

### ✅ Improved Code Quality
- Consistent naming conventions
- Better error handling
- Retry logic for API calls
- Loading states

### ✅ Developer Experience
- Vite for faster builds (vs Create React App)
- Clear project structure
- Comprehensive documentation

## Admin Access

Default admin login:
- **Email**: `admin@admin.com` (or username: `admin`)
- **Password**: Set during Firebase user creation

⚠️ **Security Note**: Change admin credentials in production!

## Firestore Collections Structure

```
artifacts/
  └── image-decorator-v2/
      └── public/
          └── data/
              ├── styles/        # Style presets
              │   └── {styleId}
              │       ├── name: string
              │       ├── icon: string
              │       ├── prompt: string
              │       └── timestamp: timestamp
              └── gallery/       # Generated images
                  └── {imageId}
                      ├── generatedUrl: string
                      ├── prompt: string
                      ├── styleName: string
                      ├── userId: string
                      └── timestamp: timestamp
```

## Common Issues & Solutions

### API Key Not Working
- Ensure `VITE_GEMINI_API_KEY` is set in `.env.local`
- Restart dev server after changing env variables
- Verify API key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Authentication Errors
- Enable Anonymous and Email/Password auth in Firebase Console
- Check Firestore rules are deployed
- Verify Firebase config in `.env.local`

### Camera Not Working
- Ensure browser has camera permissions
- Use HTTPS in production (required for camera access)
- Check if device has a camera

## Performance

- **Build size**: ~660KB (gzipped ~170KB)
- **Code splitting**: Separate chunks for React and Firebase
- **Lazy loading**: Views loaded on demand
- **Optimized assets**: Vite build optimization

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
