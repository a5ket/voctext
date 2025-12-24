'use client'

import UploadLimits from '@/components/upload-limits'
import Upload from '@/components/upload/upload'
import TranscriptionViewer from '@/components/upload/viewer'
import { useUploadLimits } from '@/hooks/useUploadLimits'
import { uploadFileTranscription } from '@/lib/api'
import { Transcription } from '@/lib/definitions'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UploadSection() {
  const router = useRouter()
  const { userId } = useAuth()

  const { limits, loading, refresh } = useUploadLimits(userId)

  const [uploadError, setUploadError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [transcription, setTranscription] = useState<Transcription | null>(null)

  async function onAudioFileUpload(file: File) {
    if (!userId) {
      router.push('/sign-in?message=Please sign in to upload audio files')
      return
    }

    if (limits?.remainingTranscriptions === 0) {
      setUploadError('Upload limit reached. Please upgrade to continue.')
      return
    }

    setUploadError(null)
    setProcessing(true)
    setTranscription(null)

    try {
      const result = await uploadFileTranscription(file)
      setTranscription(result)
      await refresh()
    } catch (e) {
      setUploadError((e as Error).message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <section className="space-y-4">
      <UploadLimits
        refreshTrigger={0}
        loading={loading}
      />

      <div className="flex justify-around">
        <Upload
          onFileUploadAction={onAudioFileUpload}
          onUploadError={setUploadError}
          uploadError={uploadError}
          disabled={limits?.remainingTranscriptions === 0}
          loading={loading}
          processing={processing}
        />
      </div>

      {transcription && (
        <TranscriptionViewer transcription={transcription} />
      )}
    </section>
  )
}