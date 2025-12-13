import '@/components/ui/auth.css'

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Page() {
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
                <SignUp />
            </div>
        </div>
    )
}