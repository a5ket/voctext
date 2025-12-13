import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { deleteTranscription, updateTranscriptionTitle, fetchTranscriptions, findTranscriptionByIdAndUserId } from '@/lib/data'

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
        console.log('DELETE request - ID:', id, 'UserID:', userId)

        const transcription = await findTranscriptionByIdAndUserId(id, userId)

        console.log('Found transcription:', transcription)

        if (!transcription) {
            const allTranscriptionsForUser = await fetchTranscriptions(userId)
            console.log('All transcriptions for user:', allTranscriptionsForUser.map(t => ({ id: t.id, title: t.title, userId: t.userId })))
            console.log('Requested transcription ID:', id, 'not found for user:', userId)

            return NextResponse.json({
                error: 'Transcription not found',
                details: {
                    requestedId: id,
                    userId: userId,
                    availableTranscriptions: allTranscriptionsForUser.map(t => t.id)
                }
            }, { status: 404 })
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

        const existingTranscription = await findTranscriptionByIdAndUserId(id, userId)

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
