import { CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SupportPaymentNotificationProps {
    onDismiss?: () => void
}

export function SupportPaymentNotification({ onDismiss }: SupportPaymentNotificationProps) {
    return (
        <div className="w-full max-w-md mx-auto mb-6">
            <div className="relative bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">
                            Thank you for your support!
                        </p>
                    </div>
                    {onDismiss && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onDismiss}
                            className="h-6 w-6 p-0 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-sm"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
