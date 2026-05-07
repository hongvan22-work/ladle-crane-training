import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const partMeta: Record<string, { label: string; color: string; icon: string }> = {
  A: { label: 'Phần A – Tổng Quan Nhà Máy Thép', color: 'bg-blue-700', icon: '🏭' },
  B: { label: 'Phần B – Tiêu Chuẩn Thiết Kế', color: 'bg-blue-600', icon: '📐' },
  C: { label: 'Phần C – Ladle Crane Chuyên Sâu', color: 'bg-steel-600', icon: '⚙️' },
  D: { label: 'Phần D – Cơ Khí & Điện Đặc Thù', color: 'bg-blue-800', icon: '⚡' },
  E: { label: 'Phần E – Tự Động Hóa', color: 'bg-blue-900', icon: '🤖' },
  F: { label: 'Phần F – An Toàn & Bảo Trì', color: 'bg-blue-950', icon: '🛡️' },
  G: { label: 'Phần G – Chiến Lược Bán Hàng', color: 'bg-steel-700', icon: '📊' },
}

export default async function ChaptersPage({ searchParams }: { searchParams: { part?: string } }) {
  const session = await getServerSession(authOptions)
  const filterPart = searchParams.part

  const chapters = await prisma.chapter.findMany({
    where: filterPart ? { part: filterPart } : undefined,
    orderBy: [{ part: 'asc' }, { order: 'asc' }],
    include: { _count: { select: { quizzes: true } } },
  })

  let progressMap: Record<string, boolean> = {}
  if (session?.user) {
    const userId = (session.user as any).id
    const progresses = await prisma.progress.findMany({ where: { userId } })
    progresses.forEach(p => { progressMap[p.chapterId] = p.completed })
  }

  const grouped = chapters.reduce((acc, ch) => {
    if (!acc[ch.part]) acc[ch.part] = []
    acc[ch.part].push(ch)
    return acc
  }, {} as Record<string, typeof chapters>)

  const parts = Object.keys(grouped).sort()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Danh Sách Chuyên Đề</h1>
      <p className="text-gray-400 mb-8">Tổng cộng {chapters.length} chuyên đề từ giáo trình cầu trục rót thép.</p>

      {/* Filter by part */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link href="/chapters" className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!filterPart ? 'bg-steel-600 text-white' : 'bg-navy-800 text-gray-400 hover:text-white'}`}>
          Tất cả
        </Link>
        {Object.keys(partMeta).map(p => (
          <Link key={p} href={`/chapters?part=${p}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterPart === p ? 'bg-steel-600 text-white' : 'bg-navy-800 text-gray-400 hover:text-white'}`}>
            Phần {p}
          </Link>
        ))}
      </div>

      <div className="space-y-10">
        {parts.map(part => (
          <div key={part}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{partMeta[part]?.icon || '📚'}</span>
              <h2 className="text-xl font-bold text-white">{partMeta[part]?.label || `Phần ${part}`}</h2>
            </div>
            <div className="space-y-3">
              {grouped[part].map(chapter => {
                const done = progressMap[chapter.id]
                return (
                  <Link key={chapter.id} href={`/chapters/${chapter.id}`}
                    className="flex items-start gap-4 card hover:border-steel-600 transition-all group">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${done ? 'bg-green-500' : 'bg-navy-700'}`}>
                      {done ? '✓' : <span className="text-gray-400 text-sm font-bold">{chapter.order}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold group-hover:text-steel-400 transition-colors leading-snug">
                        Chuyên Đề {chapter.order}: {chapter.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{chapter.summary}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded ${partMeta[chapter.part]?.color || 'bg-navy-700'} text-white`}>
                          Phần {chapter.part}
                        </span>
                        {chapter._count.quizzes > 0 && (
                          <span className="text-xs text-gray-500">{chapter._count.quizzes} câu hỏi</span>
                        )}
                        {done && <span className="text-xs text-green-400">Đã hoàn thành</span>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
