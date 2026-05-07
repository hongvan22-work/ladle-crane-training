import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import MarkCompleteButton from '@/components/MarkCompleteButton'
import ReadingProgress from '@/components/ReadingProgress'
import BackToTop from '@/components/BackToTop'
import { renderMarkdown } from '@/lib/markdown'

export const dynamic = 'force-dynamic'

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: params.id },
    include: { quizzes: true },
  })

  if (!chapter) notFound()

  const session = await getServerSession(authOptions)
  let progress = null
  if (session?.user) {
    const userId = (session.user as any).id
    progress = await prisma.progress.findUnique({
      where: { userId_chapterId: { userId, chapterId: chapter.id } },
    })
  }

  const prevChapter = await prisma.chapter.findFirst({
    where: { order: chapter.order - 1 },
    select: { id: true, title: true, order: true },
  })
  const nextChapter = await prisma.chapter.findFirst({
    where: { order: chapter.order + 1 },
    select: { id: true, title: true, order: true },
  })

  const htmlContent = renderMarkdown(chapter.content)

  return (
    <>
    <ReadingProgress />
    <BackToTop />
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-300">Trang chủ</Link>
        <span>/</span>
        <Link href="/chapters" className="hover:text-gray-300">Chuyên đề</Link>
        <span>/</span>
        <span className="text-gray-300">Chuyên Đề {chapter.order}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-steel-600 text-white text-xs font-bold px-3 py-1 rounded-full">Phần {chapter.part}</span>
          {progress?.completed && (
            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">Đã hoàn thành</span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">
          Chuyên Đề {chapter.order}: {chapter.title}
        </h1>
        <p className="text-gray-400">{chapter.summary}</p>
      </div>

      {/* Content */}
      <div className="card mb-8">
        <div className="prose-dark" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {/* Actions */}
      {session ? (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <MarkCompleteButton
            chapterId={chapter.id}
            completed={progress?.completed ?? false}
          />
          {chapter.quizzes.length > 0 && (
            <Link href={`/quiz/${chapter.id}`} className="btn-secondary text-center">
              Làm Quiz ({chapter.quizzes.length} câu)
            </Link>
          )}
        </div>
      ) : (
        <div className="card mb-8 text-center">
          <p className="text-gray-400 mb-4">Đăng nhập để theo dõi tiến độ và làm quiz</p>
          <Link href="/auth/login" className="btn-primary">Đăng nhập ngay</Link>
        </div>
      )}

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-4">
        {prevChapter ? (
          <Link href={`/chapters/${prevChapter.id}`} className="card hover:border-gray-600 transition-all group">
            <div className="text-gray-500 text-xs mb-1">← Chuyên đề trước</div>
            <div className="text-white text-sm font-medium group-hover:text-steel-400 transition-colors">
              {prevChapter.order}. {prevChapter.title}
            </div>
          </Link>
        ) : <div />}
        {nextChapter ? (
          <Link href={`/chapters/${nextChapter.id}`} className="card hover:border-gray-600 transition-all group text-right">
            <div className="text-gray-500 text-xs mb-1">Chuyên đề tiếp →</div>
            <div className="text-white text-sm font-medium group-hover:text-steel-400 transition-colors">
              {nextChapter.order}. {nextChapter.title}
            </div>
          </Link>
        ) : <div />}
      </div>
    </div>
    </>
  )
}
