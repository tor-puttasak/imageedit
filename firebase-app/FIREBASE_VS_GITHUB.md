# Firebase Hosting vs GitHub Pages

## ทำไมควรใช้ Firebase Hosting?

### ✅ Firebase Hosting (แนะนำสำหรับ app นี้)
- ✅ รองรับ Firebase Authentication
- ✅ รองรับ Firestore Database
- ✅ SSL/HTTPS ฟรี
- ✅ CDN ทั่วโลก (เร็วกว่า)
- ✅ Custom domain ฟรี
- ✅ ใช้งาน Gemini API ได้เต็มที่

### ⚠️ GitHub Pages
- ⚠️ เป็น static hosting เท่านั้น
- ⚠️ ไม่รองรับ Firebase features
- ⚠️ API keys อาจมีปัญหา CORS
- ⚠️ ไม่มี server-side features

## วิธี Deploy ไปที่ Firebase (แนะนำ)

```bash
cd /home/user/imageedit/firebase-app
firebase login
./deploy.sh
```

URL: https://imageedit-f1e2d.web.app

## ถ้ายังต้องการใช้ GitHub Pages

ดูวิธีด้านล่าง ↓
