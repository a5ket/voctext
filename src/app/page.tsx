import Footer from '@/components/footer'
import MainNav from '@/components/main-nav'
import MainNavSkeleton from '@/components/main-nav-skeleton'
import PaymentSuccessBanner from '@/components/payment-success-banner'
import SupportForm from '@/components/support/form'
import UploadSection from '@/components/upload/upload-section'
import { Suspense } from 'react'

export default function Page() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Voctext',
        description: 'AI-powered audio transcription tool for interviews, meetings, podcasts, and notes.',
        url: 'https://voctext.vercel.app',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free tier available'
        },
        creator: {
            '@type': 'Person',
            name: 'Maksym Kotsiuruba'
        }
    }

    return (
        <main className="flex justify-center">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PaymentSuccessBanner />

            <div className="max-w-3xl w-full p-6 space-y-8">
                <header className="text-center space-y-3">
                    <div className="flex justify-end mb-2">
                        <Suspense fallback={<MainNavSkeleton />}>
                            <MainNav />
                        </Suspense>
                    </div>

                    <h1 className="text-4xl font-bold">
                        Voctext — AI Audio Transcription
                    </h1>

                    <p className="text-base text-muted-foreground max-w-xl mx-auto">
                        Convert audio to accurate text in seconds.
                        Perfect for interviews, meetings, podcasts, and personal notes.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        No setup required. Free tier available.
                    </p>
                </header>

                <UploadSection />

                <section className="space-y-3 flex flex-col items-center pt-4">
                    <h2 className="text-xl font-semibold">
                        Why Voctext?
                    </h2>

                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground text-left max-w-lg text-sm">
                        <li>Fast AI-powered transcription with high accuracy</li>
                        <li>Upload common audio formats (MP3, WAV, M4A)</li>
                        <li>Free tier with clear usage limits</li>
                        <li>Secure authentication and personal dashboard</li>
                    </ul>
                </section>

                <section className="pt-8 border-t">
                    <SupportForm />
                </section>

                <Footer />
            </div>
        </main>
    )
}