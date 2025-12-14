'use client'

import { useState, useEffect, useCallback } from 'react'
import Upload from '../components/upload/upload'
import TranscriptionViewer from '../components/upload/viewer'
import { Transcription } from '@/lib/definitions'
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Text } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { uploadFileTranscription } from '@/lib/api'
import Head from './head'
import SupportForm from '@/components/support/form'
import { SupportPaymentNotification } from '@/components/support/notification'
import UploadLimits from '@/components/upload-limits'
import Footer from '@/components/footer'

export default function Page() {
    const router = useRouter()
    const { userId } = useAuth()
    const [isSuccessfulPayment, setIsSuccessfulPayment] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [isLoadingTranscription, setIsLoadingTranscription] = useState(false)
    const [transcription, setTranscription] = useState<null | Transcription>(null)
    const [uploadLimits, setUploadLimits] = useState<{
        transcriptionCount: number
        maxTranscriptions: number
        remainingTranscriptions: number
        isUserSupporter: boolean
    } | null>(null)
    const [uploadLimitsLoading, setUploadLimitsLoading] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const fetchUploadLimits = useCallback(async () => {
        if (userId) {
            setUploadLimitsLoading(true)
            try {
                const response = await fetch('/api/user-stats')
                const data = await response.json()
                setUploadLimits(data)
            } catch (error) {
                console.error('Failed to fetch upload limits:', error)
            } finally {
                setUploadLimitsLoading(false)
            }
        }
    }, [userId])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const sessionId = urlParams.get('payment_session_id')

        if (sessionId) {
            const shownKey = `payment_notification_shown_${sessionId}`
            const hasBeenShown = localStorage.getItem(shownKey)

            if (!hasBeenShown) {
                setIsSuccessfulPayment(true)
                localStorage.setItem(shownKey, 'true')

                window.history.replaceState({}, '', window.location.pathname)
            }
        }

        fetchUploadLimits()
    }, [userId, fetchUploadLimits])

    async function onAudioFileUpload(file: File) {
        if (!userId) {
            router.push('/sign-in?message=Please sign in to upload audio files')
            return
        }

        if (uploadLimits && uploadLimits.remainingTranscriptions <= 0) {
            setUploadError('Upload limit reached. Please upgrade to continue uploading.')
            return
        }

        setUploadError(null)
        setTranscription(null)
        setIsLoadingTranscription(true)

        try {
            const newTranscription = await uploadFileTranscription(file)
            setTranscription(newTranscription)
            await fetchUploadLimits()
            setRefreshTrigger(prev => prev + 1)
        } catch (error) {
            if ((error as Error).message) {
                setUploadError((error as Error).message)
            } else {
                throw error
            }
        }

        setIsLoadingTranscription(false)
    }

    function handlerDashboardRedirect() {
        router.push('/dashboard')
    }

    return (
        <>
            <Head />
            {isSuccessfulPayment ? <SupportPaymentNotification onDismiss={() => setIsSuccessfulPayment(false)} /> : null}
            <div className="flex justify-center">
                <div className="p-5">
                    <header className="flex justify-center flex-col">
                        <nav className="flex flex-1 justify-end gap-3">
                            <SignedOut>
                                <SignInButton>
                                    <Button size="default">Sign In</Button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <Button
                                    size="default"
                                    variant="outline"
                                    onClick={handlerDashboardRedirect}
                                    className="flex items-center gap-2"
                                >
                                    <Text className="w-4 h-4" />
                                    Dashboard
                                </Button>
                                <UserButton />
                            </SignedIn>
                        </nav>
                        <h1 className="text-4xl font-bold p-5 mx-auto">Voctext</h1>
                        <h2 className="text-3xl mx-auto">Audio Transcription</h2>
                    </header>
                    <main className="flex flex-col items-center space-y-6">
                        <UploadLimits refreshTrigger={refreshTrigger} loading={uploadLimitsLoading} />

                        <div className="w-full max-w-md px-4">
                            <Upload
                                onFileUploadAction={onAudioFileUpload}
                                onUploadError={setUploadError}
                                uploadError={uploadError}
                                disabled={uploadLimits ? uploadLimits.remainingTranscriptions <= 0 : false}
                                disabledMessage="Upload limit reached. Please upgrade to continue uploading."
                                loading={uploadLimitsLoading}
                                processing={isLoadingTranscription}
                            />
                        </div>

                        {transcription && (
                            <div className="w-full max-w-[600px] px-4">
                                <TranscriptionViewer transcription={transcription} />
                            </div>
                        )}
                        <SupportForm />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}
