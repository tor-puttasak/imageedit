export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const GEMINI_MODEL = "gemini-2.0-flash-exp";
export const APP_ID = import.meta.env.VITE_APP_ID || 'image-decorator-v2';

export const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export const FIRESTORE_COLLECTIONS = {
  ARTIFACTS: 'artifacts',
  PUBLIC: 'public',
  DATA: 'data',
  STYLES: 'styles',
  GALLERY: 'gallery',
};

export const STATUS_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const VIEWS = {
  HOME: 'home',
  CAMERA: 'camera',
  EDITOR: 'editor',
  ADMIN: 'admin',
  GALLERY: 'gallery',
};
