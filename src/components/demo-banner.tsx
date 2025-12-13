'use client'

import { useState } from 'react'
import { X, CreditCard, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DemoBanner() {
    const [isVisible, setIsVisible] = useState(true)

    const isDemo = process.env.NEXT_PUBLIC_IS_DEMO === 'true'

    if (!isVisible || !isDemo) return null

    return (
        <div className="w-full max-w-md mx-auto mt-4 p-6 bg-red-50 border-2 border-dashed border-red-300 rounded-lg relative">
            <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-bold text-lg">DEMO MODE</span>
                    <AlertTriangle className="w-5 h-5" />
                </div>

                <div className="space-y-2 text-red-800">
                    <p className="font-medium">This is a demonstration version</p>
                    <div className="flex items-center justify-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span className="text-sm">Use Stripe test card:</span>
                    </div>
                    <div className="bg-white border border-red-200 rounded p-2 font-mono text-sm">
                        4242 4242 4242 4242
                    </div>
                    <p className="text-xs text-red-600">Any future expiry date and any CVC</p>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-red-600 hover:bg-red-100 p-1 h-auto"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
