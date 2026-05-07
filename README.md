# Ladle Crane Training Portal

Hệ thống đào tạo kỹ thuật chuyên sâu về **Cầu Trục Rót Thép Lỏng (Ladle Crane)** – từ môi trường nhà máy thép đến tiêu chuẩn thiết kế quốc tế và chiến lược bán hàng.

> Dự án BTVN – Sử dụng Claude Code để xây dựng | SEONGON 2026

## Demo

- **Live URL:** https://ladle-crane-training-production.up.railway.app
- **GitHub:** https://github.com/hongvan22-work/ladle-crane-training

## Tính Năng

- 9 chuyên đề từ giáo trình 61 trang về cầu trục luyện kim
- Hệ thống đăng ký / đăng nhập (NextAuth.js)
- Theo dõi tiến độ học theo từng chuyên đề
- Quiz cuối chương với chấm điểm tự động và giải thích đáp án
- Dashboard cá nhân hóa với thống kê học tập
- Giao diện responsive, light theme amber chuyên nghiệp

## Tech Stack

| Tầng | Công nghệ |
|------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Railway) |
| ORM | Prisma |
| Auth | NextAuth.js (Credentials) |
| Deploy | Railway |

## Cài Đặt Local

### Yêu cầu
- Node.js 18+
- PostgreSQL (local hoặc Railway)

### Bước 1: Clone & cài dependencies
```bash
git clone https://github.com/hongvan22-work/ladle-crane-training.git
cd ladle-crane-training
npm install
```

### Bước 2: Cấu hình môi trường
```bash
cp .env.example .env
```

Điền vào `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ladle_crane"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Bước 3: Setup database
```bash
npm run db:push
npm run db:seed
```

### Bước 4: Chạy dev server
```bash
npm run dev
```

Mở http://localhost:3000

### Tài khoản demo
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ladlecrane.com | admin123 |
| Student | student@ladlecrane.com | student123 |

## Deploy Lên Railway

1. Tạo PostgreSQL service trên Railway → copy `DATABASE_URL`
2. Tạo Web service → kết nối GitHub repo này
3. Set environment variables:
   - `DATABASE_URL` (từ PostgreSQL service)
   - `NEXTAUTH_SECRET` (random string)
   - `NEXTAUTH_URL` (URL Railway của bạn)
4. Build command: `npm run build`
5. Start command: `npm start`
6. Sau khi deploy: chạy seed qua Railway CLI hoặc Railway Console

## Cấu Trúc Dự Án

```
ladle-crane-training/
├── prisma/
│   ├── schema.prisma          # Database schema (5 models)
│   └── seed.ts                # 9 chuyên đề + quiz data từ PDF
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Trang chủ
│   │   ├── chapters/          # Danh sách & chi tiết chuyên đề
│   │   ├── dashboard/         # Dashboard học viên
│   │   ├── quiz/              # Quiz từng chương
│   │   ├── auth/              # Login & Register
│   │   └── api/               # REST API Routes
│   ├── components/            # React components
│   └── lib/                   # Prisma client, auth config
├── README.md
├── CLAUDE.md
├── PLAN.md
└── lich_su_tro_chuyen.txt     # Xuất trò chuyện với Claude Code
```

## Nội Dung Giáo Trình

| # | Chuyên Đề | Phần |
|---|-----------|------|
| 1 | Môi Trường Nhà Máy Thép – "Địa Ngục" | A |
| 2 | Bản Đồ Cầu Trục Trong Nhà Máy Thép | A |
| 3 | Giải Mã Tiêu Chuẩn FEM 1.001 | B |
| 4 | Giải Mã Cấu Trúc Dầm (Girder Layout) | C |
| 5 | Cơ Cấu Nâng Hạ Dự Phòng (Redundant Kinematics) | C |
| 6 | Hệ Thống Phanh An Toàn Tuyệt Đối | C |
| 7 | Hệ Thống Điện & Điều Khiển | D |
| 8 | Hệ Thống Chống Lắc (Anti-Sway) | E |
| 9 | Chiến Lược Bán Hàng & Đối Thủ Cạnh Tranh | G |

---

*Built with Claude Code (claude-sonnet-4-6) | Deployed on Railway*
