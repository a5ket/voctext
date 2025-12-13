import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { fetchUserTranscriptionCounter, checkIsUserSupporter } from '@/lib/data'

export async function GET() {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const transcriptionCount = await fetchUserTranscriptionCounter(userId)
        const isUserSupporter = await checkIsUserSupporter(userId)
        const maxTranscriptions = isUserSupporter ? 4 : 2
        const remainingTranscriptions = Math.max(0, maxTranscriptions - transcriptionCount)

        return NextResponse.json({
            transcriptionCount,
            maxTranscriptions,
            isUserSupporter,
            remainingTranscriptions
        })
    } catch (error) {
        console.error('Error fetching user stats:', error)
        return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 })
    }
}
