# 🤖 Setup AI Course Generator

Fitur AI Course Generator menggunakan **Google Gemini API** untuk generate course secara otomatis.

## 📋 Langkah Setup

### 1. Install Dependencies
```bash
npm install
```

Package `@google/generative-ai` sudah ditambahkan ke `package.json`.

### 2. Dapatkan API Key Gratis

1. Buka: https://makersuite.google.com/app/apikey
2. Login dengan Google account
3. Klik "Create API Key"
4. Copy API key yang digenerate

**GRATIS** - Tidak perlu credit card!

### 3. Setup Environment Variable

1. Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

2. Edit file `.env` dan masukkan API key:
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

3. **PENTING**: Jangan commit file `.env` ke git!

### 4. Restart Development Server

```bash
npm run dev
```

## ✅ Cara Menggunakan

1. Buka halaman **Course Creator** (`/teacher/course-creator`)
2. Di bagian atas ada **AI Course Generator** dengan background hijau
3. Ketik deskripsi course yang ingin dibuat, contoh:
   - "A comprehensive web development course covering HTML, CSS, JavaScript, React, and Node.js"
   - "Advanced mathematics course focusing on calculus, linear algebra, and differential equations"
   - "Spanish language course for beginners with conversational practice and grammar"
4. Klik **"Generate with AI"**
5. Tunggu 3-5 detik
6. AI akan mengisi:
   - Course Title
   - Description
   - Category (auto-detected)
   - Duration
   - 4-6 Modules dengan lesson counts
7. Edit hasil jika perlu, lalu **Save Course**

## 🎯 Fitur AI

### Yang Di-Generate:
- ✅ **Course Title** - judul yang relevan dan menarik
- ✅ **Description** - deskripsi lengkap 2-3 kalimat
- ✅ **Category** - otomatis pilih dari: mathematics, science, language, technology, arts, history
- ✅ **Duration** - estimasi waktu course (weeks/months)
- ✅ **Modules** - 4-6 modules dengan:
  - Module title yang logis dan berurutan
  - Jumlah lessons per module (3-8 lessons)

### Contoh Prompt yang Bagus:
```
"Create a comprehensive Python programming course for beginners covering basics, data structures, OOP, web development with Flask, and final projects"

"Design an advanced digital marketing course including SEO, social media marketing, content strategy, analytics, and campaign management"

"Build a complete graphic design course teaching Adobe Photoshop, Illustrator, typography, color theory, and portfolio creation"
```

## 🔧 Troubleshooting

### Error: "API key not configured"
- Pastikan file `.env` ada di root folder
- Pastikan `VITE_GEMINI_API_KEY` sudah diisi dengan API key yang valid
- Restart development server (`npm run dev`)

### Error: "Failed to generate course"
- Cek koneksi internet
- Pastikan API key masih valid
- Coba prompt yang lebih spesifik
- Cek quota API (free tier: 60 requests/minute)

### AI Generate Lambat
- Normal 3-5 detik untuk response
- Jika lebih dari 10 detik, cek koneksi internet
- Free tier mungkin lebih lambat saat peak hours

## 💡 Tips

1. **Prompt yang Spesifik** - semakin detail, hasil semakin bagus
2. **Bahasa Inggris** - AI lebih akurat dengan bahasa Inggris
3. **Edit Hasil** - AI generate draft, Anda bisa edit sesuai kebutuhan
4. **Save API Calls** - hasil sudah bagus? langsung save, jangan generate ulang

## 🆓 Free Tier Limits

Google Gemini API Free Tier:
- **60 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

Lebih dari cukup untuk development dan testing!

## 🔐 Security

- ✅ API key disimpan di `.env` (tidak di-commit)
- ✅ `.env` sudah ada di `.gitignore`
- ✅ API call dari client-side (untuk demo)
- ⚠️ **Production**: pindahkan API call ke backend untuk keamanan

## 📚 Dokumentasi

- Google Gemini API: https://ai.google.dev/docs
- Get API Key: https://makersuite.google.com/app/apikey
- Pricing: https://ai.google.dev/pricing

---

**Selamat menggunakan AI Course Generator! 🚀**
