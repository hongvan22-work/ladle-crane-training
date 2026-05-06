import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id
  const progress = await prisma.progress.findMany({ where: { userId } })
  return NextResponse.json(progress)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userId = (session.user as any).id
  const { chapterId, completed } = await req.json()

  const progress = await prisma.progress.upsert({
    where: { userId_chapterId: { userId, chapterId } },
    update: { completed, completedAt: completed ? new Date() : null },
    create: { userId, chapterId, completed, completedAt: completed ? new Date() : null },
  })

  return NextResponse.json(progress)
}
