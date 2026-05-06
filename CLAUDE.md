# CLAUDE.md – Hướng Dẫn Cho Claude Code

## Tổng Quan Dự Án

**Ladle Crane Training Portal** – Web app full-stack đào tạo kỹ thuật cầu trục rót thép lỏng.

- **Stack:** Next.js 14 + TypeScript + Tailwind CSS + Prisma + PostgreSQL + NextAuth.js
- **Deploy:** Railway (Web service + PostgreSQL service)
- **Repo:** https://github.com/hongvan22-work/ladle-crane-training

## Kiến Trúc Quan Trọng

### Database Models (prisma/schema.prisma)
- `User` – Người dùng (STUDENT | ADMIN)
- `Chapter` – Chuyên đề học (part A-G, order 1-N)
- `Progress` – Tiến độ học của user theo chapter
- `Quiz` – Câu hỏi trắc nghiệm (options là JSON array)
- `QuizResult` – Kết quả làm quiz của user

### API Routes (src/app/api/)
- `POST /api/auth/register` – Đăng ký user mới
- `GET/POST /api/auth/[...nextauth]` – NextAuth handler
- `GET /api/chapters` – Danh sách chapters (filter by ?part=A)
- `GET/POST /api/progress` – Đọc/lưu tiến độ học
- `GET/POST /api/quiz` – Đọc/chấm quiz

### Auth Flow
- NextAuth với Credentials Provider
- JWT session strategy
- Session chứa `user.id` và `user.role` (thêm qua callbacks)
- Truy cập `id`: `(session.user as any).id`

## Quy Tắc Khi Sửa Code

### Khi thêm chapter mới
1. Thêm vào mảng `chapters` trong `prisma/seed.ts`
2. Chạy `npm run db:seed` để cập nhật database

### Khi thêm API route mới
- Đặt trong `src/app/api/[route-name]/route.ts`
- Luôn kiểm tra session trước khi truy cập database
- Trả về NextResponse.json()

### Khi thêm component mới
- Client components: thêm `'use client'` ở đầu file
- Server components: không có `'use client'`, có thể dùng async/await
- Components trong `src/components/`

### Styling
- Dùng Tailwind CSS classes
- Custom color: `steel-*` (định nghĩa trong tailwind.config.ts)
- Dark theme: bg-gray-950/900/800 cho nền, text-white/gray-*
- Component shortcuts: `.btn-primary`, `.btn-secondary`, `.card`, `.prose-dark`

## Lưu Ý Đặc Biệt

### Nội dung tiếng Việt
- Tất cả nội dung UI và chuyên đề bằng tiếng Việt
- Đảm bảo font Inter hỗ trợ Unicode (đã cấu hình)

### Railway Deploy
- `next.config.js` cần `output: 'standalone'` cho Railway
- Biến môi trường bắt buộc: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- Sau deploy: chạy `prisma migrate deploy && npm run db:seed` qua Railway Shell

### Prisma
- Client singleton trong `src/lib/prisma.ts` (tránh hot-reload tạo nhiều connections)
- Seed data trong `prisma/seed.ts` dùng `upsert` (idempotent)
- Schema change: `npx prisma db push` (dev) hoặc `npx prisma migrate dev` (production)

## Commands Thường Dùng

```bash
npm run dev          # Dev server
npm run build        # Build production
npm run db:push      # Sync schema với DB (dev)
npm run db:seed      # Nhập dữ liệu mẫu
npm run db:studio    # Prisma Studio GUI
```
