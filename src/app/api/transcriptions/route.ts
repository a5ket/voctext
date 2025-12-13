import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { fetchTranscriptions, createTranscription, createCompletedTranscriptionRequest } from '@/lib/data'

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

        const transcription = await createTranscription({
            userId,
            title: file.name.replace(/\.[^/.]+$/, ""),
            text: "This is a mock transcription. In a real application, this would be the actual transcribed text from the audio file.",
            language: "en",
            duration: 120,
        })

        await createCompletedTranscriptionRequest(userId)

        return NextResponse.json({ data: transcription })
    } catch (error) {
        console.error('Error processing transcription:', error)
        return NextResponse.json({ error: 'Failed to process transcription' }, { status: 500 })
    }
}
