'use client'

import { useEffect, useState } from 'react'

export function usePaymentSuccess() {
  const [isSuccessful, setIsSuccessful] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('payment_session_id')

    if (!sessionId) return

    const key = `payment_notification_${sessionId}`
    if (localStorage.getItem(key)) return

    setIsSuccessful(true)
    localStorage.setItem(key, '1')
    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  return {
    isSuccessful,
    dismiss: () => setIsSuccessful(false),
  }
}