import { ClerkProvider } from '@clerk/nextjs'
import '@/components/ui/globals.css'

export const metadata = {
    title: 'Voctext — AI Audio Transcription',
    description: 'AI-powered audio transcription SaaS-like app with Stripe payments.',
    openGraph: {
        title: 'Voctext — AI Audio Transcription',
        description:
            'Upload audio files and get accurate AI transcriptions in seconds.',
        url: 'https://voctext.vercel.app',
        siteName: 'Voctext',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Voctext — AI Audio Transcription',
        description:
            'Upload audio files and get accurate AI transcriptions in seconds.',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            appearance={{
                variables: {
                    colorPrimary: 'hsl(263.4, 70%, 50.4%)'
                },
            }}
        >
            <html lang="en">
                <head>
                    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                    <link rel="alternate icon" href="/favicon.svg" />
                    <link rel="mask-icon" href="/favicon.svg" color="#000000" />
                </head>
                <body>{children}</body>
            </html>
        </ClerkProvider>
    )
}
