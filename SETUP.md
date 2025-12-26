# คู่มือการติดตั้งและตั้งค่า

## สารบัญ
1. [ข้อกำหนดเบื้องต้น](#ข้อกำหนดเบื้องต้น)
2. [การติดตั้ง Node.js และ npm](#การติดตั้ง-nodejs-และ-npm)
3. [การติดตั้ง PostgreSQL](#การติดตั้ง-postgresql)
4. [การตั้งค่า Google Cloud Services](#การตั้งค่า-google-cloud-services)
5. [การตั้งค่าโปรเจค](#การตั้งค่าโปรเจค)
6. [การแก้ปัญหาที่พบบ่อย](#การแก้ปัญหาที่พบบ่อย)

## ข้อกำหนดเบื้องต้น

- Node.js 18.x หรือสูงกว่า
- npm หรือ yarn
- PostgreSQL 14.x หรือสูงกว่า
- Google Cloud Platform account
- Git

## การติดตั้ง Node.js และ npm

### Windows
1. ดาวน์โหลด installer จาก [nodejs.org](https://nodejs.org/)
2. รัน installer และทำตามขั้นตอน
3. ตรวจสอบการติดตั้ง:
```bash
node --version
npm --version
```

### macOS
```bash
# ใช้ Homebrew
brew install node

# หรือดาวน์โหลด installer จาก nodejs.org
```

### Linux (Ubuntu/Debian)
```bash
# ติดตั้ง Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# ตรวจสอบ
node --version
npm --version
```

## การติดตั้ง PostgreSQL

### Windows
1. ดาวน์โหลด installer จาก [postgresql.org](https://www.postgresql.org/download/windows/)
2. รัน installer
3. จดรหัสผ่าน superuser ที่ตั้งไว้
4. เปิด pgAdmin หรือ psql เพื่อสร้าง database

### macOS
```bash
# ใช้ Homebrew
brew install postgresql@14

# เริ่มต้นใช้งาน
brew services start postgresql@14

# สร้าง database
createdb imageedit
```

### Linux (Ubuntu/Debian)
```bash
# ติดตั้ง PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# เริ่มต้นใช้งาน
sudo systemctl start postgresql
sudo systemctl enable postgresql

# สร้าง database
sudo -u postgres createdb imageedit
sudo -u postgres psql
# ใน psql:
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE imageedit TO myuser;
\q
```

## การตั้งค่า Google Cloud Services

### 1. สร้าง Google Cloud Project

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com)
2. คลิก "Select a project" > "New Project"
3. ตั้งชื่อ project เช่น "imageedit"
4. คลิก "Create"

### 2. เปิดใช้งาน APIs

1. ไปที่ "APIs & Services" > "Library"
2. ค้นหาและเปิดใช้งาน APIs ต่อไปนี้:
   - Cloud Storage API
   - Google Picker API
   - Google Drive API

### 3. สร้าง Service Account สำหรับ Cloud Storage

1. ไปที่ "IAM & Admin" > "Service Accounts"
2. คลิก "Create Service Account"
3. ตั้งชื่อ เช่น "imageedit-storage"
4. คลิก "Create and Continue"
5. เลือก Role: "Storage Admin"
6. คลิก "Continue" > "Done"
7. คลิกที่ service account ที่สร้าง
8. ไปที่แท็บ "Keys"
9. คลิก "Add Key" > "Create new key"
10. เลือก JSON
11. ดาวน์โหลดไฟล์ JSON (เก็บไว้ในที่ปลอดภัย!)

### 4. สร้าง Cloud Storage Bucket

1. ไปที่ "Cloud Storage" > "Buckets"
2. คลิก "Create Bucket"
3. ตั้งชื่อ bucket (ต้องไม่ซ้ำกับใครในโลก) เช่น "imageedit-images-unique123"
4. เลือก Location type: "Region" (เลือก region ใกล้ผู้ใช้)
5. เลือก Storage class: "Standard"
6. Access control: "Uniform"
7. คลิก "Create"

### 5. สร้าง API Key สำหรับ Google Picker

1. ไปที่ "APIs & Services" > "Credentials"
2. คลิก "Create Credentials" > "API Key"
3. คัดลอก API key
4. (Optional) คลิก "Edit API key" เพื่อจำกัดการใช้งาน
5. ใน "API restrictions" เลือก "Restrict key"
6. เลือก:
   - Google Drive API
   - Google Picker API

### 6. สร้าง OAuth 2.0 Client ID

1. ยังอยู่ที่ "APIs & Services" > "Credentials"
2. คลิก "Create Credentials" > "OAuth client ID"
3. เลือก Application type: "Web application"
4. ตั้งชื่อ เช่น "ImageEdit Web Client"
5. ใน "Authorized JavaScript origins" เพิ่ม:
   - `http://localhost:3000` (สำหรับ development)
   - `https://yourdomain.com` (สำหรับ production)
6. คลิก "Create"
7. คัดลอก Client ID

### 7. หา App ID

App ID คือ Project Number ของ Google Cloud Project:
1. ไปที่ Dashboard ของ Google Cloud Console
2. ดู "Project Info"
3. คัดลอก "Project number" นี่คือ App ID

### 8. สร้าง Gemini API Key

1. ไปที่ [Google AI Studio](https://makersuite.google.com/app/apikey)
2. คลิก "Get API key"
3. เลือก "Create API key in new project" หรือใช้ project ที่มี
4. คัดลอก API key

## การตั้งค่าโปรเจค

### 1. Clone และติดตั้ง dependencies

```bash
git clone <your-repository-url>
cd imageedit
npm install
```

### 2. สร้างไฟล์ .env

```bash
cp .env.example .env
```

### 3. แก้ไขไฟล์ .env

เปิดไฟล์ `.env` และกรอกข้อมูลทั้งหมด:

```bash
# Database - แก้ไขตาม PostgreSQL ที่คุณติดตั้ง
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/imageedit?schema=public"

# NextAuth - สร้าง secret ใหม่
NEXTAUTH_URL="http://localhost:3000"
# สร้าง secret ด้วย: openssl rand -base64 32
NEXTAUTH_SECRET="ใส่ secret ที่สร้างได้ที่นี่"

# Google Gemini API
GEMINI_API_KEY="ใส่ Gemini API key"

# Google Cloud Storage
GCS_PROJECT_ID="ใส่ project id ของคุณ"
GCS_BUCKET_NAME="ใส่ชื่อ bucket ที่สร้างไว้"
# วางเนื้อหาทั้งหมดของ service account JSON file ลงที่นี่ (ในบรรทัดเดียว)
GCS_CREDENTIALS_JSON='{"type":"service_account","project_id":"...เนื้อหาทั้งหมด..."}'

# Google Drive Picker API
NEXT_PUBLIC_GOOGLE_API_KEY="ใส่ API key ที่สร้างไว้"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="ใส่ OAuth Client ID"
NEXT_PUBLIC_GOOGLE_APP_ID="ใส่ Project Number"
```

**Tips สำหรับ GCS_CREDENTIALS_JSON:**
```bash
# วิธีแปลงไฟล์ JSON เป็น string ในบรรทัดเดียว:
# Linux/macOS:
cat service-account-key.json | jq -c

# หรือใช้ text editor แทนที่ newline ทั้งหมด
```

### 4. สร้าง NEXTAUTH_SECRET

```bash
# Linux/macOS:
openssl rand -base64 32

# Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

คัดลอกผลลัพธ์ไปใส่ใน `NEXTAUTH_SECRET`

### 5. ตั้งค่า Database

```bash
# Push schema ไปยัง database
npm run db:push

# Seed ข้อมูลเริ่มต้น (admin user + 5 styles)
npm run db:seed
```

### 6. รัน Development Server

```bash
npm run dev
```

เปิด browser ที่ http://localhost:3000

### 7. ทดสอบการ Login Admin

1. ไปที่ http://localhost:3000/admin/login
2. Login ด้วย:
   - Email: `admin@example.com`
   - Password: `admin123`
3. ถ้า login สำเร็จ คุณจะเห็น admin dashboard

## การแก้ปัญหาที่พบบ่อย

### ปัญหา: Database connection failed

**สาเหตุ:**
- PostgreSQL ไม่ได้เปิดทำงาน
- DATABASE_URL ไม่ถูกต้อง
- User/password ผิด

**วิธีแก้:**
```bash
# ตรวจสอบว่า PostgreSQL ทำงานหรือไม่
# macOS:
brew services list | grep postgresql

# Linux:
sudo systemctl status postgresql

# ทดสอบเชื่อมต่อด้วย psql
psql -h localhost -U myuser -d imageedit
```

### ปัญหา: Prisma Client not generated

**วิธีแก้:**
```bash
npx prisma generate
```

### ปัญหา: Google Picker ไม่ทำงาน

**ตรวจสอบ:**
1. ตรวจสอบว่าใส่ API key และ Client ID ถูกต้อง
2. ตรวจสอบว่า origin ถูกเพิ่มใน OAuth credentials
3. เปิด browser console ดู error
4. ตรวจสอบว่า APIs ถูกเปิดใช้งานแล้ว

### ปัญหา: การอัพโหลดรูปล้มเหลว

**ตรวจสอบ:**
1. ตรวจสอบ GCS_CREDENTIALS_JSON ว่าถูกต้อง
2. ตรวจสอบว่า Service Account มี permission Storage Admin
3. ตรวจสอบว่า bucket name ถูกต้อง
4. ตรวจสอบ console logs เพื่อดู error message

### ปัญหา: Gemini API error

**ตรวจสอบ:**
1. ตรวจสอบ API key ว่าถูกต้อง
2. ตรวจสอบว่ามี quota เหลืออยู่
3. ตรวจสอบว่า API ถูกเปิดใช้งาน

### ปัญหา: NextAuth session ไม่ทำงาน

**วิธีแก้:**
1. ตรวจสอบว่าตั้ง NEXTAUTH_SECRET แล้ว
2. ลบ cookies ในเบราว์เซอร์
3. ตรวจสอบว่า NEXTAUTH_URL ถูกต้อง

## การ Deploy Production

### Vercel

1. Push โค้ดไป GitHub
2. Import project ใน Vercel
3. เพิ่ม Environment Variables ทั้งหมดจาก .env
4. Deploy!

**หมายเหตุ:**
- อย่าลืมเปลี่ยน NEXTAUTH_URL เป็น production URL
- เพิ่ม production domain ใน OAuth credentials
- ตั้งค่า Production database (อย่าใช้ local database)

### สำหรับ Production Database

แนะนำใช้:
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)

## การอัพเดทข้อมูล Admin

หลังจาก deploy แล้ว ควรเปลี่ยนรหัสผ่าน admin:

1. เข้า Prisma Studio:
```bash
npm run db:studio
```

2. หรือสร้าง script เพื่อเปลี่ยนรหัสผ่าน
3. หรือสร้างหน้า change password ในระบบ

## ติดต่อและสนับสนุน

หากมีปัญหาหรือข้อสงสัย:
1. ตรวจสอบ error messages ใน console
2. ดู logs ใน terminal
3. เปิด issue ใน GitHub repository
