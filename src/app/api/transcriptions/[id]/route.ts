import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { deleteTranscription, updateTranscriptionTitle } from '@/lib/data'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const transcription = await prisma.transcription.findFirst({
            where: { id, userId }
        })

        if (!transcription) {
            return NextResponse.json({ error: 'Transcription not found' }, { status: 404 })
        }

        await deleteTranscription(transcription)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting transcription:', error)
        return NextResponse.json({ error: 'Failed to delete transcription' }, { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { title } = await request.json()

        if (!title || typeof title !== 'string') {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 })
        }

        const existingTranscription = await prisma.transcription.findFirst({
            where: { id, userId }
        })

        if (!existingTranscription) {
            return NextResponse.json({ error: 'Transcription not found' }, { status: 404 })
        }

        const updatedTranscription = await updateTranscriptionTitle(existingTranscription, title)

        return NextResponse.json({ data: updatedTranscription })
    } catch (error) {
        console.error('Error updating transcription:', error)
        return NextResponse.json({ error: 'Failed to update transcription' }, { status: 500 })
    }
}
