import { ClerkProvider } from '@clerk/nextjs'
import '@/components/ui/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voctext — AI Audio Transcription',
  description: 'AI-powered audio transcription SaaS-like app with Stripe payments.',

  metadataBase: new URL('https://voctext.vercel.app'),

  openGraph: {
    title: 'Voctext — AI Audio Transcription',
    description: 'Upload audio files and get accurate AI transcriptions in seconds.',
    url: '/',
    siteName: 'Voctext',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Voctext AI Audio Transcription',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Voctext — AI Audio Transcription',
    description: 'Upload audio files and get accurate AI transcriptions in seconds.',
    images: ['/og.png'],
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
    canonical: '/'
  }
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
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}