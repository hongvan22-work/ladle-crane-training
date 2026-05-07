import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/auth/login')

  const userId = (session.user as any).id

  const [chapters, progresses, quizResults] = await Promise.all([
    prisma.chapter.findMany({ orderBy: [{ part: 'asc' }, { order: 'asc' }] }),
    prisma.progress.findMany({ where: { userId } }),
    prisma.quizResult.findMany({ where: { userId }, include: { quiz: { include: { chapter: true } } } }),
  ])

  const completedIds = new Set(progresses.filter(p => p.completed).map(p => p.chapterId))
  const completedCount = completedIds.size
  const totalCount = chapters.length
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const correctAnswers = quizResults.filter(r => r.isCorrect).length
  const quizAccuracy = quizResults.length > 0 ? Math.round((correctAnswers / quizResults.length) * 100) : 0

  const recentChapters = chapters.filter(c => !completedIds.has(c.id)).slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Xin chào, <span className="text-white">{session.user.name}</span>!</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card text-center">
          <div className="text-4xl font-bold text-steel-400 mb-1">{pct}%</div>
          <div className="text-gray-400 text-sm">Tiến độ hoàn thành</div>
          <div className="mt-3 bg-navy-800 rounded-full h-2">
            <div className="bg-steel-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-gray-500 text-xs mt-2">{completedCount}/{totalCount} chuyên đề</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-blue-400 mb-1">{quizResults.length}</div>
          <div className="text-gray-400 text-sm">Câu hỏi đã làm</div>
          <div className="text-gray-500 text-xs mt-2">{correctAnswers} câu đúng</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-green-400 mb-1">{quizAccuracy}%</div>
          <div className="text-gray-400 text-sm">Tỷ lệ trả lời đúng</div>
          <div className="text-gray-500 text-xs mt-2">Quiz accuracy</div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Tiếp Tục Học</h2>
        {recentChapters.length > 0 ? (
          <div className="space-y-3">
            {recentChapters.map(ch => (
              <Link key={ch.id} href={`/chapters/${ch.id}`}
                className="flex items-center gap-4 card hover:border-steel-600 transition-all group">
                <div className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center text-gray-400 font-bold flex-shrink-0">
                  {ch.order}
                </div>
                <div>
                  <div className="text-white font-medium group-hover:text-steel-400 transition-colors">
                    Chuyên Đề {ch.order}: {ch.title}
                  </div>
                  <div className="text-gray-500 text-sm">{ch.summary.slice(0, 80)}...</div>
                </div>
                <span className="ml-auto text-steel-400 text-sm flex-shrink-0">Học →</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="text-4xl mb-3">🎉</div>
            <div className="text-white font-semibold">Bạn đã hoàn thành tất cả chuyên đề!</div>
            <Link href="/chapters" className="btn-primary mt-4 inline-block">Xem lại chuyên đề</Link>
          </div>
        )}
      </div>

      {/* All Chapters Progress */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Tất Cả Chuyên Đề</h2>
        <div className="space-y-2">
          {chapters.map(ch => (
            <Link key={ch.id} href={`/chapters/${ch.id}`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-navy-900 hover:bg-navy-800 border border-navy-700 hover:border-navy-600 transition-all">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs
                ${completedIds.has(ch.id) ? 'bg-green-500 text-white' : 'bg-navy-700 text-gray-400'}`}>
                {completedIds.has(ch.id) ? '✓' : ch.order}
              </div>
              <span className={`text-sm ${completedIds.has(ch.id) ? 'text-gray-400 line-through' : 'text-gray-300'}`}>
                Phần {ch.part} – {ch.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
