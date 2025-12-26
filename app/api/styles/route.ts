import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET all active styles (public)
export async function GET() {
  try {
    const styles = await prisma.style.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        prompt: true,
        order: true,
      },
    })

    return NextResponse.json(styles)
  } catch (error) {
    console.error('Error fetching styles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch styles' },
      { status: 500 }
    )
  }
}

// POST create new style (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, prompt, order } = body

    if (!name || !prompt) {
      return NextResponse.json(
        { error: 'Name and prompt are required' },
        { status: 400 }
      )
    }

    const style = await prisma.style.create({
      data: {
        name,
        prompt,
        order: order || 0,
      },
    })

    return NextResponse.json(style)
  } catch (error) {
    console.error('Error creating style:', error)
    return NextResponse.json(
      { error: 'Failed to create style' },
      { status: 500 }
    )
  }
}
