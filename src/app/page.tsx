import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getStats() {
  const [chapterCount, userCount] = await Promise.all([
    prisma.chapter.count(),
    prisma.user.count({ where: { role: 'STUDENT' } }),
  ])
  return { chapterCount, userCount }
}

const parts = [
  { key: 'A', label: 'Phần A', title: 'Tổng Quan Nhà Máy Thép', color: 'from-blue-500 to-blue-700' },
  { key: 'B', label: 'Phần B', title: 'Tiêu Chuẩn Thiết Kế FEM', color: 'from-amber-500 to-amber-700' },
  { key: 'C', label: 'Phần C', title: 'Ladle Crane Chuyên Sâu', color: 'from-amber-600 to-orange-600' },
  { key: 'D', label: 'Phần D', title: 'Cơ Khí & Điện Đặc Thù', color: 'from-blue-600 to-blue-800' },
  { key: 'E', label: 'Phần E', title: 'Tự Động Hóa & Smart Crane', color: 'from-amber-500 to-yellow-600' },
  { key: 'G', label: 'Phần G', title: 'Chiến Lược Bán Hàng', color: 'from-amber-600 to-amber-800' },
]

export default async function HomePage() {
  const { chapterCount, userCount } = await getStats()

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-amber-100 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#f59e0b,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#3b82f6,transparent_60%)]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 leading-tight">
            Giáo Trình Đào Tạo<br />
            <span className="text-amber-600">Cầu Trục Rót Thép</span>
          </h1>
          <p className="text-stone-500 text-lg mb-8 max-w-2xl mx-auto">
            Hệ thống đào tạo kỹ thuật chuyên sâu về Ladle Crane – từ môi trường nhà máy thép đến tiêu chuẩn thiết kế quốc tế và chiến lược bán hàng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chapters" className="btn-primary text-base py-3 px-8">
              Xem Chuyên Đề
            </Link>
            <Link href="/auth/register" className="btn-secondary text-base py-3 px-8">
              Đăng Ký Học Ngay
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[
              { value: chapterCount, label: 'Chuyên đề' },
              { value: '61', label: 'Trang nội dung' },
              { value: userCount, label: 'Học viên' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-amber-600">{stat.value}</div>
                <div className="text-stone-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts Overview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">Nội Dung Chương Trình</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map(part => (
            <Link key={part.key} href={`/chapters?part=${part.key}`} className="group card hover:border-amber-400 hover:shadow-md transition-all">
              <div className={`inline-block bg-gradient-to-r ${part.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                {part.label}
              </div>
              <h3 className="text-stone-800 font-semibold text-lg group-hover:text-amber-600 transition-colors">
                {part.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Bắt Đầu Học Ngay Hôm Nay</h2>
          <p className="text-amber-100 mb-6">Theo dõi tiến độ, làm quiz cuối chương và nhận chứng nhận hoàn thành.</p>
          <Link href="/auth/register" className="bg-white text-amber-700 hover:bg-amber-50 font-semibold py-3 px-10 rounded-lg transition-colors inline-block text-base">
            Tạo Tài Khoản Miễn Phí
          </Link>
        </div>
      </section>
    </div>
  )
}
