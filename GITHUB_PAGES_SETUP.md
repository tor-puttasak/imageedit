# 🚀 Setup GitHub Pages สำหรับ Decor.ai

## ⚠️ คำแนะนำสำคัญ

**แนะนำให้ใช้ Firebase Hosting แทน GitHub Pages** เพราะ:
- ✅ รองรับ Firebase Authentication & Firestore
- ✅ ไม่มีปัญหา CORS กับ API
- ✅ เร็วกว่าและมี CDN ครอบคลุมทั่วโลก
- ✅ Setup ง่ายกว่า (แค่รัน `./deploy.sh`)

แต่ถ้ายังต้องการใช้ GitHub Pages ทำตามขั้นตอนด้านล่าง:

---

## 📋 ขั้นตอนการ Setup GitHub Pages

### **Step 1: เปิดใช้งาน GitHub Pages**

1. ไปที่ GitHub repository: `https://github.com/tor-puttasak/imageedit`
2. คลิก **Settings** (ด้านบน)
3. เลือก **Pages** (เมนูด้านซ้าย)
4. ในส่วน **Source**:
   - เลือก **GitHub Actions**
5. Save

### **Step 2: ตั้งค่า Secrets (สำคัญมาก!)**

ไปที่ **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

เพิ่ม Secrets ทั้งหมดนี้:

```
VITE_FIREBASE_API_KEY = AIzaSyCJpBsxX2fGmch1eQZzJvXCzUOklhaDcrI
VITE_FIREBASE_AUTH_DOMAIN = imageedit-f1e2d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = imageedit-f1e2d
VITE_FIREBASE_STORAGE_BUCKET = imageedit-f1e2d.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 401063870366
VITE_FIREBASE_APP_ID = 1:401063870366:web:0999032a6366988672608f
VITE_FIREBASE_MEASUREMENT_ID = G-NMB760T4ZS
VITE_GEMINI_API_KEY = AIzaSyBg83WjzvgEqg9y5mclZRxmnpIUlovlYN0
VITE_APP_ID = image-decorator-v2
```

**วิธีเพิ่ม Secret:**
1. คลิก **New repository secret**
2. Name: `VITE_FIREBASE_API_KEY`
3. Secret: `AIzaSyCJpBsxX2fGmch1eQZzJvXCzUOklhaDcrI`
4. คลิก **Add secret**
5. ทำซ้ำสำหรับทุก secrets

### **Step 3: Push Code และรอ Deploy**

```bash
cd /home/user/imageedit

# Add ไฟล์ที่สร้างใหม่
git add .github/workflows/deploy-github-pages.yml
git add docs/
git add GITHUB_PAGES_SETUP.md

# Commit
git commit -m "Add GitHub Pages deployment workflow and docs folder"

# Push
git push
```

### **Step 4: ตรวจสอบ Deployment**

1. ไปที่ repository → **Actions** tab
2. จะเห็น workflow "Deploy to GitHub Pages" กำลังรัน
3. รอจนเสร็จ (ประมาณ 2-3 นาที)
4. เมื่อเสร็จจะมี ✅ สีเขียว

### **Step 5: เข้าใช้งาน**

URL: `https://tor-puttasak.github.io/imageedit/`

---

## 🔄 วิธี Update เว็บ (ทุกครั้งที่แก้ไข)

### วิธีที่ 1: Automatic (GitHub Actions)

แค่ push code ไป GitHub:
```bash
git add .
git commit -m "Update app"
git push
```

GitHub Actions จะ build และ deploy ให้อัตโนมัติ!

### วิธีที่ 2: Manual (Build เอง)

```bash
# Build app
cd /home/user/imageedit/firebase-app
npm run build

# Copy ไปที่ docs
cd /home/user/imageedit
rm -rf docs/*
cp -r firebase-app/dist/* docs/
touch docs/.nojekyll

# Commit และ push
git add docs/
git commit -m "Update build"
git push
```

---

## 🎯 เปรียบเทียบ: Firebase vs GitHub Pages

| Feature | Firebase Hosting | GitHub Pages |
|---------|-----------------|--------------|
| **ความเร็ว** | ⚡ เร็วมาก (Global CDN) | 🐌 ปานกลาง |
| **Firebase Features** | ✅ ใช้ได้ทั้งหมด | ❌ ไม่รองรับ |
| **SSL/HTTPS** | ✅ ฟรี | ✅ ฟรี |
| **Custom Domain** | ✅ ฟรี | ✅ ฟรี |
| **API Integration** | ✅ ไม่มีปัญหา | ⚠️ อาจมีปัญหา CORS |
| **Setup** | 🟢 ง่าย (1 คำสั่ง) | 🟡 ปานกลาง (หลายขั้นตอน) |
| **Cost** | 💰 ฟรี (10GB/month) | 💰 ฟรี (1GB storage) |

---

## 🚀 แนะนำ: Deploy ด้วย Firebase

```bash
cd /home/user/imageedit/firebase-app
firebase login
./deploy.sh
```

เสร็จแล้ว! URL: `https://imageedit-f1e2d.web.app`

---

## ❓ Troubleshooting

### ไม่เห็น web app บน GitHub Pages
- ตรวจสอบว่า GitHub Actions รันเสร็จแล้ว (ไปดูที่ Actions tab)
- ตรวจสอบว่าตั้ง Secrets ครบทุกตัว
- รอ 5-10 นาที (GitHub Pages อาจช้า)

### API ไม่ทำงาน
- GitHub Pages เป็น static hosting อาจมีปัญหา CORS
- แนะนำให้ใช้ Firebase Hosting แทน

### Build ล้มเหลว
- ตรวจสอบ Secrets ว่าครบและถูกต้อง
- ดู error ใน Actions log

---

## 📞 ต้องการความช่วยเหลือ?

ถ้ามีปัญหา:
1. ดู error ใน Actions tab
2. ตรวจสอบ Secrets ให้ครบ
3. ลองใช้ Firebase Hosting แทน (แนะนำ!)

---

**สรุป:** แนะนำให้ใช้ Firebase Hosting เพราะ setup ง่ายกว่าและ app จะทำงานได้เต็มที่! 🎉
