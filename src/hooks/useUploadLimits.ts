'use client'

import { useCallback, useEffect, useState } from 'react'

type UploadLimits = {
  transcriptionCount: number
  maxTranscriptions: number
  remainingTranscriptions: number
  isUserSupporter: boolean
}

export function useUploadLimits(userId: string | null | undefined) {
  const [limits, setLimits] = useState<UploadLimits | null>(null)
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!userId) return

    setLoading(true)
    try {
      const res = await fetch('/api/user-stats')
      const data = await res.json()
      setLimits(data)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh])

  return {
    limits,
    loading,
    refresh,
  }
}