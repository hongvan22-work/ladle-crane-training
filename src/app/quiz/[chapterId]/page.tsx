import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import QuizClient from '@/components/QuizClient'

export const dynamic = 'force-dynamic'

export default async function QuizPage({ params }: { params: { chapterId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/auth/login')

  const userId = (session.user as any).id

  const chapter = await prisma.chapter.findUnique({
    where: { id: params.chapterId },
    include: { quizzes: true },
  })

  if (!chapter || chapter.quizzes.length === 0) notFound()

  const existingResults = await prisma.quizResult.findMany({
    where: { userId, quizId: { in: chapter.quizzes.map(q => q.id) } },
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-2">
        Quiz: Chuyên Đề {chapter.order}
      </h1>
      <p className="text-gray-400 mb-8">{chapter.title}</p>
      <QuizClient
        quizzes={chapter.quizzes}
        chapterId={chapter.id}
        existingResults={existingResults}
      />
    </div>
  )
}
