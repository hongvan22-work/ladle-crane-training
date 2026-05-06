import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const part = req.nextUrl.searchParams.get('part')

  const chapters = await prisma.chapter.findMany({
    where: part ? { part } : undefined,
    orderBy: [{ part: 'asc' }, { order: 'asc' }],
    select: { id: true, part: true, order: true, title: true, summary: true },
  })

  return NextResponse.json(chapters)
}
