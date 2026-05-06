import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id
  const { chapterId, answers } = await req.json()

  const quizzes = await prisma.quiz.findMany({ where: { chapterId } })
  const results: Record<string, boolean> = {}

  for (const quiz of quizzes) {
    const userAnswer = answers[quiz.id]
    if (userAnswer === undefined) continue

    const isCorrect = userAnswer === quiz.correctAnswer
    results[quiz.id] = isCorrect

    await prisma.quizResult.upsert({
      where: { userId_quizId: { userId, quizId: quiz.id } },
      update: { answer: userAnswer, isCorrect, answeredAt: new Date() },
      create: { userId, quizId: quiz.id, answer: userAnswer, isCorrect },
    })
  }

  return NextResponse.json({ results })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id
  const chapterId = req.nextUrl.searchParams.get('chapterId')

  const results = await prisma.quizResult.findMany({
    where: { userId, quiz: chapterId ? { chapterId } : undefined },
    include: { quiz: true },
  })

  return NextResponse.json(results)
}
