import '@/components/ui/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { type Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Voctext — AI Audio Transcription',
    description: 'Convert audio to text using AI. Upload your audio file and receive an accurate transcription in seconds.',

    metadataBase: new URL('https://voctext.vercel.app'),

    openGraph: {
        title: 'Voctext — AI Audio Transcription',
        description:
            'AI-powered audio transcription tool for interviews, meetings, podcasts, and notes.',
        url: '/',
        siteName: 'Voctext',
        type: 'website',
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Voctext — AI Audio Transcription',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Voctext — AI Audio Transcription',
        description:
            'AI-powered audio transcription tool for interviews, meetings, podcasts, and notes.',
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Voctext — AI Audio Transcription',
            },
        ],
    },

    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
    },

    verification: {
        google: 'o9LR6eO9ZEMPfcVpA5KD81BeC8u9juatpkTAQgpIXCk',
    },

    alternates: {
        canonical: 'https://voctext.vercel.app/',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            appearance={{
                variables: {
                    colorPrimary: 'hsl(263.4, 70%, 50.4%)',
                },
            }}
        >
            <html lang="en">
                <body>
                    {children}
                    <SpeedInsights />
                </body>
            </html>
        </ClerkProvider>
    )
}