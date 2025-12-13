'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import Dashboard from '@/components/dashboard'
import { Transcription } from '@/lib/definitions'
import { fetchTranscriptions } from '@/lib/api'

export default function DashboardPage() {
    const { userId } = useAuth()
    const [transcriptions, setTranscriptions] = useState<Transcription[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadTranscriptions() {
            if (userId) {
                try {
                    const data = await fetchTranscriptions()
                    setTranscriptions(data)
                } catch (error) {
                    console.error('Failed to load transcriptions:', error)
                }
                setIsLoading(false)
            }
        }

        loadTranscriptions()
    }, [userId])

    const handleTranscriptionsUpdate = (updatedTranscriptions: Transcription[]) => {
        setTranscriptions(updatedTranscriptions)
    }

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }

    return <Dashboard transcriptions={transcriptions} onTranscriptionsUpdate={handleTranscriptionsUpdate} />
}
