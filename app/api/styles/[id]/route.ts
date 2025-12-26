import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PUT update style (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, prompt, isActive, order } = body

    const style = await prisma.style.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(prompt !== undefined && { prompt }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(style)
  } catch (error) {
    console.error('Error updating style:', error)
    return NextResponse.json(
      { error: 'Failed to update style' },
      { status: 500 }
    )
  }
}

// DELETE style (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.style.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting style:', error)
    return NextResponse.json(
      { error: 'Failed to delete style' },
      { status: 500 }
    )
  }
}
