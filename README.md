# AI Image Style Transfer

เว็บแอปพลิเคชันสำหรับแปลงสไตล์รูปภาพด้วย AI โดยใช้ Google Gemini API

## คุณสมบัติหลัก

### สำหรับผู้ใช้ทั่วไป
- **อัพโหลดรูปภาพ** จาก 3 วิธี:
  - อัพโหลดจากเครื่อง
  - ถ่ายรูปด้วยกล้อง
  - เลือกจาก Google Drive (Google Picker API)

- **เลือกสไตล์** จาก 5 สไตล์ที่ admin ตั้งไว้ หรือสร้าง prompt ของตัวเอง

- **ใส่ข้อความ** (ตัวอักษรภาษาอังกฤษ) เพื่อให้ AI ใส่ลงในรูป

- **ดาวน์โหลด & แชร์** ผลลัพธ์ไปยัง:
  - ดาวน์โหลดเก็บไว้
  - Facebook
  - Twitter
  - LINE

- **ดูแกลเลอรี่** รูปภาพทั้งหมดที่ผู้ใช้สร้าง

### สำหรับ Admin
- **จัดการสไตล์**:
  - สร้างสไตล์ใหม่
  - แก้ไข prompt ของสไตล์
  - ลบสไตล์
  - จัดลำดับการแสดงผล

- **ระบบ Authentication** สำหรับ admin เท่านั้น

## เทคโนโลยีที่ใช้

### Frontend & Backend
- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components

### Database & ORM
- **PostgreSQL** - Database
- **Prisma** - ORM

### Authentication
- **NextAuth.js** - Admin authentication

### AI & Cloud Services
- **Google Gemini API** - AI image generation
- **Google Cloud Storage** - Image storage
- **Google Picker API** - Google Drive integration

## การติดตั้ง

### 1. Clone โปรเจค

```bash
git clone <repository-url>
cd imageedit
```

### 2. ติดตั้ง dependencies

```bash
npm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` และกรอกข้อมูลตามตัวอย่าง `.env.example`:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/imageedit?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google Gemini API
GEMINI_API_KEY="your-gemini-api-key"

# Google Cloud Storage
GCS_PROJECT_ID="your-project-id"
GCS_BUCKET_NAME="your-bucket-name"
GCS_CREDENTIALS_JSON='{"type":"service_account",...}'

# Google Drive Picker API
NEXT_PUBLIC_GOOGLE_API_KEY="your-google-api-key"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
NEXT_PUBLIC_GOOGLE_APP_ID="your-google-app-id"
```

### 4. ตั้งค่า Database

```bash
# Push schema to database
npm run db:push

# Seed initial data (admin user & default styles)
npm run db:seed
```

### 5. รัน development server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

## ข้อมูล Admin เริ่มต้น

หลังจาก seed database แล้ว จะมี admin user เริ่มต้น:

- **Email**: `admin@example.com`
- **Password**: `admin123`

⚠️ **สำคัญ**: เปลี่ยนรหัสผ่านทันทีในการใช้งานจริง!

## การตั้งค่า Google Cloud Services

### 1. Google Gemini API

1. ไปที่ [Google AI Studio](https://makersuite.google.com/app/apikey)
2. สร้าง API key
3. ใส่ใน `GEMINI_API_KEY`

### 2. Google Cloud Storage

1. สร้าง project ใน [Google Cloud Console](https://console.cloud.google.com)
2. เปิดใช้งาน Cloud Storage API
3. สร้าง bucket
4. สร้าง Service Account และ download JSON key
5. ใส่ข้อมูลใน environment variables

### 3. Google Picker API

1. เปิดใช้งาน Google Picker API ใน Google Cloud Console
2. สร้าง OAuth 2.0 credentials
3. เพิ่ม authorized JavaScript origins: `http://localhost:3000`
4. ใส่ API key และ Client ID ใน environment variables

## Scripts ที่มีให้ใช้

```bash
npm run dev          # รัน development server
npm run build        # Build สำหรับ production
npm run start        # รัน production server
npm run lint         # รัน ESLint
npm run db:push      # Push Prisma schema ไปยัง database
npm run db:seed      # Seed initial data
npm run db:studio    # เปิด Prisma Studio (database GUI)
```

## โครงสร้างโปรเจค

```
imageedit/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── generate/     # Image generation
│   │   ├── images/       # Gallery images
│   │   └── styles/       # Style management
│   ├── admin/            # Admin pages
│   │   ├── login/
│   │   ├── dashboard/
│   │   └── styles/
│   ├── gallery/          # Public gallery
│   └── page.tsx          # Home page (main creation UI)
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── AuthProvider.tsx
│   ├── ImageUpload.tsx
│   └── StyleSelection.tsx
├── lib/
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # NextAuth config
│   ├── gemini.ts         # Gemini API helpers
│   ├── storage.ts        # Google Cloud Storage helpers
│   └── utils.ts          # Utility functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
└── public/               # Static files
```

## Database Schema

### AdminUser
- เก็บข้อมูลผู้ดูแลระบบ
- Email & hashed password

### Style
- เก็บสไตล์ต่างๆ ที่ admin สร้าง
- ชื่อสไตล์ และ prompt

### GeneratedImage
- เก็บรูปภาพที่ AI สร้าง
- URL ของรูปต้นฉบับและรูปที่สร้าง
- ข้อมูล style และ user text

## การ Deploy

### Vercel (แนะนำ)

1. Push โค้ดไปยัง GitHub
2. Import ไปยัง Vercel
3. ตั้งค่า Environment Variables
4. Deploy!

### Docker

```bash
# สร้าง image
docker build -t imageedit .

# รัน container
docker run -p 3000:3000 --env-file .env imageedit
```

## การพัฒนาต่อ

### เพิ่ม Style ใหม่

1. ไปที่ `/admin/login`
2. Login ด้วย admin account
3. ไปที่ `/admin/styles`
4. คลิก "เพิ่มสไตล์ใหม่"
5. ใส่ชื่อและ prompt
6. บันทึก

### ปรับแต่ง UI

- Components อยู่ใน `components/` และ `components/ui/`
- ใช้ Tailwind CSS สำหรับ styling
- shadcn/ui components สามารถ customize ได้

## License

MIT License

## Support

หากมีปัญหาหรือข้อสงสัย กรุณาเปิด issue ใน GitHub repository
