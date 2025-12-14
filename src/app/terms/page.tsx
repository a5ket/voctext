import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
                    <p className="text-gray-600 mt-2">Last updated: December 2025</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By accessing and using Voctext, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Service Description</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Voctext is an audio transcription service that converts audio files to text using OpenAI&apos;s Whisper technology.
                            We provide both free and paid tiers of service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Responsibilities</h2>
                        <ul className="text-gray-700 leading-relaxed space-y-2">
                            <li>• You must provide accurate information when creating an account</li>
                            <li>• You are responsible for maintaining the security of your account</li>
                            <li>• You must not upload illegal, harmful, or copyrighted content</li>
                            <li>• You must comply with all applicable laws and regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Service Limitations</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Free accounts are limited to 2 transcriptions. Paid accounts receive 4 transcriptions.
                            File size is limited to 25MB per upload. Supported formats include MP3, WAV, and M4A.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Privacy and Data</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Your uploaded audio files are processed through OpenAI&apos;s services and are not stored permanently on our servers.
                            Please refer to our Privacy Policy for detailed information about data handling.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Voctext is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from the use of our service,
                            including but not limited to transcription accuracy or service availability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
                            Continued use of the service constitutes acceptance of modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            For questions about these Terms of Service, please contact us through our support channels.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
