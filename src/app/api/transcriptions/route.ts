import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { fetchTranscriptions, createTranscription, createCompletedTranscriptionRequest } from '@/lib/data'
import { fetchFileTranscription, fileUploadSchema } from '@/lib/transcription'

export async function GET() {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const transcriptions = await fetchTranscriptions(userId)

        return NextResponse.json({ data: transcriptions })
    } catch (error) {
        console.error('Error fetching transcriptions:', error)
        return NextResponse.json({ error: 'Failed to fetch transcriptions' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        // Validate file
        const validation = fileUploadSchema.safeParse({ file })
        if (!validation.success) {
            return NextResponse.json({
                error: validation.error.errors[0].message
            }, { status: 400 })
        }

        // Process actual transcription using OpenAI Whisper
        const transcriptionData = await fetchFileTranscription(file)

        const transcription = await createTranscription({
            userId,
            title: file.name.replace(/\.[^/.]+$/, ""),
            text: transcriptionData.text,
            language: transcriptionData.language,
            duration: transcriptionData.duration,
        })

        await createCompletedTranscriptionRequest(userId)

        return NextResponse.json({ data: transcription })
    } catch (error) {
        console.error('Error processing transcription:', error)
        return NextResponse.json({ error: 'Failed to process transcription' }, { status: 500 })
    }
}
