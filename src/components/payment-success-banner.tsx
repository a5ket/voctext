'use client'

import { SupportPaymentNotification } from '@/components/support/notification'
import { usePaymentSuccess } from '@/hooks/usePaymentSuccess'

export default function PaymentSuccessBanner() {
  const { isSuccessful, dismiss } = usePaymentSuccess()

  if (!isSuccessful) return null

  return <SupportPaymentNotification onDismiss={dismiss} />
}