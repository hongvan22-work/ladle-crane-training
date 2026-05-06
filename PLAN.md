# PLAN.md — Ladle Crane Training Web App

> Tạo bởi Claude Code | Dự án BTVN SEONGON | 07/05/2026

---

## 1. TỔNG QUAN DỰ ÁN

**Mục tiêu:** Xây dựng web app full-stack đào tạo kỹ thuật cầu trục rót thép lỏng (Ladle Crane), dựa trên giáo trình PDF 61 trang.

**GitHub repo:** `https://github.com/hongvan22-work/ladle-crane-training`
**Deploy URL:** Railway (sẽ có sau khi deploy)
**Người dùng mục tiêu:** Kỹ sư, nhân viên kinh doanh ngành cầu trục / nhà máy thép

---

## 2. TIÊU CHÍ BẮT BUỘC (Checklist)

- [ ] Full-stack (Frontend + Backend API + Database)
- [ ] Code public trên GitHub: `hongvan22-work/ladle-crane-training`
- [ ] URL public ai cũng truy cập được (Railway deploy)
- [ ] File `README.md` trong repo
- [ ] File `CLAUDE.md` trong repo
- [ ] File `PLAN.md` trong repo (file này)
- [ ] File xuất cuộc trò chuyện với Claude (đính kèm vào repo)

---

## 3. TECH STACK

| Tầng | Công nghệ | Lý do chọn |
|------|-----------|------------|
| Frontend | Next.js 14 + TypeScript | SSR/SSG, routing tích hợp, phổ biến |
| Styling | Tailwind CSS | Nhanh, responsive, không cần CSS riêng |
| Backend | Next.js API Routes | Không cần server riêng, tích hợp sẵn |
| Database | PostgreSQL | Railway hỗ trợ native, mạnh, miễn phí |
| ORM | Prisma | Type-safe, migration dễ, phù hợp Next.js |
| Auth | NextAuth.js | Auth đơn giản, nhiều provider |
| Deploy | Railway | Hỗ trợ cả Web + PostgreSQL cùng platform |

---

## 4. CẤU TRÚC DỮ LIỆU (Database Schema)

```
User
- id, email, name, password (hash), role (admin/student), createdAt

Chapter (Chuyên đề)
- id, part (A/B/C), order, title, content (text dài), summary

Progress (Tiến độ học)
- id, userId, chapterId, completed (boolean), completedAt

Quiz (Câu hỏi)
- id, chapterId, question, options (JSON), correctAnswer, explanation

QuizResult (Kết quả quiz)
- id, userId, quizId, answer, isCorrect, answeredAt
```

---

## 5. TÍNH NĂNG (Features)

### 5.1 Trang công khai (không cần đăng nhập)
- **Trang chủ:** Giới thiệu khóa học, danh sách chuyên đề, CTA đăng ký
- **Trang preview chương:** Xem nội dung chương đầu miễn phí

### 5.2 Trang cần đăng nhập (Student)
- **Dashboard:** Tiến độ học tổng quan (bao nhiêu % hoàn thành)
- **Trang bài học:** Đọc nội dung từng chuyên đề, đánh dấu hoàn thành
- **Quiz cuối chương:** Làm bài kiểm tra, xem điểm
- **Lịch sử quiz:** Xem lại kết quả các lần làm bài

### 5.3 Admin (role = admin)
- **Quản lý chương:** Xem danh sách chapters
- **Thống kê:** Số user đăng ký, tiến độ trung bình

---

## 6. CẤU TRÚC THƯ MỤC DỰ ÁN

```
ladle-crane-training/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Dữ liệu mẫu từ PDF
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Trang chủ
│   │   ├── chapters/
│   │   │   ├── page.tsx       # Danh sách chuyên đề
│   │   │   └── [id]/page.tsx  # Nội dung chuyên đề
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Dashboard học viên
│   │   ├── quiz/
│   │   │   └── [chapterId]/page.tsx
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── api/               # Backend API Routes
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── chapters/route.ts
│   │       ├── progress/route.ts
│   │       └── quiz/route.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ChapterCard.tsx
│   │   ├── ProgressBar.tsx
│   │   └── QuizQuestion.tsx
│   └── lib/
│       ├── prisma.ts          # Prisma client
│       └── auth.ts            # NextAuth config
├── public/
├── README.md
├── CLAUDE.md
├── PLAN.md
├── lich_su_tro_chuyen.txt     # File xuất trò chuyện Claude
├── .env.example
├── package.json
└── next.config.js
```

---

## 7. NỘI DUNG TỪ PDF → DATABASE

**Tổng: 61 trang → 9+ chuyên đề theo cấu trúc:**

| # | Chuyên đề | Phần |
|---|-----------|------|
| 1 | Môi trường nhà máy thép - "Địa ngục" thiết bị | A |
| 2 | Bản đồ cầu trục trong nhà máy thép | A |
| 3 | Giải mã tiêu chuẩn FEM 1.001 | B |
| 4 | Giải mã cấu trúc dầm (Girder Layout) | C |
| 5 | Cơ cấu nâng hạ dự phòng (Redundant Kinematics) | C |
| 6 | Hệ thống phanh an toàn tuyệt đối | C |
| ... | (các chuyên đề còn lại từ PDF) | C |

---

## 8. QUY TRÌNH TRIỂN KHAI (Step-by-step)

### Bước 1: Chuẩn bị (Bạn cần làm)
- [ ] Tạo tài khoản GitHub: github.com
- [ ] Tạo repo public: `ladle-crane-training`
- [ ] Tạo tài khoản Railway: railway.app (login bằng GitHub)

### Bước 2: Xây dựng code (Claude Code làm)
- [ ] Khởi tạo Next.js project
- [ ] Cài đặt dependencies (Prisma, NextAuth, Tailwind...)
- [ ] Tạo database schema
- [ ] Nhập nội dung PDF vào seed data
- [ ] Xây dựng UI các trang
- [ ] Xây dựng API routes
- [ ] Tạo README.md, CLAUDE.md, PLAN.md
- [ ] Copy file lich_su_tro_chuyen.txt vào repo

### Bước 3: Push lên GitHub (Bạn + Claude)
- [ ] `git init` → `git add .` → `git commit`
- [ ] `git remote add origin https://github.com/hongvan22-work/ladle-crane-training.git`
- [ ] `git push -u origin main`

### Bước 4: Deploy lên Railway (Bạn làm trên Railway dashboard)
- [ ] Tạo project mới trên Railway
- [ ] Add service: PostgreSQL database
- [ ] Add service: GitHub repo (chọn `ladle-crane-training`)
- [ ] Set environment variables (DATABASE_URL, NEXTAUTH_SECRET...)
- [ ] Railway tự động build và deploy
- [ ] Copy URL public từ Railway

---

## 9. BIẾN MÔI TRƯỜNG CẦN THIẾT (.env)

```env
DATABASE_URL="postgresql://..."    # Railway cung cấp
NEXTAUTH_SECRET="random-secret"    # Tự tạo
NEXTAUTH_URL="https://your-app.railway.app"
```

---

## 10. LƯU Ý QUAN TRỌNG

### Kỹ thuật:
- Railway free tier: 5$ credit/tháng miễn phí → đủ cho demo
- Prisma cần chạy `npx prisma migrate deploy` sau khi deploy
- Next.js cần biến `NEXTAUTH_URL` đúng với domain Railway

### Nội dung:
- PDF có công thức toán học (FEM) → dùng `react-katex` để render đẹp
- Nội dung tiếng Việt → đảm bảo font hỗ trợ Unicode
- 61 trang → cần seed script tự động nhập data

### GitHub:
- Repo phải để **Public** (yêu cầu tiêu chí)
- Không commit file `.env` (chứa thông tin bảo mật)
- Commit file `.env.example` để hướng dẫn

---

## 11. PHÂN CHIA TRÁCH NHIỆM

| Việc | Ai làm |
|------|--------|
| Viết code, tạo file | Claude Code |
| Tạo GitHub account + repo | Bạn |
| Tạo Railway account | Bạn |
| Push code lên GitHub | Bạn (với hướng dẫn từ Claude) |
| Cấu hình Railway + set env vars | Bạn (với hướng dẫn từ Claude) |
| Chạy migration DB trên Railway | Railway tự động / Bạn |
