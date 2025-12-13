'use client'

import '@/components/ui/auth.css'

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function Page() {
    const searchParams = useSearchParams()
    const message = searchParams.get('message')

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="relative">
                <Link
                    href="/"
                    className="absolute -top-16 left-0 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>
                {message && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-blue-800 text-sm">{message}</p>
                    </div>
                )}
                <SignIn />
            </div>
        </div>
    )
}