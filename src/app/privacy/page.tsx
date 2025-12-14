import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
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
                    <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                    <p className="text-gray-600 mt-2">Last updated: December 2025</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p><strong>Account Information:</strong> When you create an account, we collect your email address and basic profile information through Clerk authentication.</p>
                            <p><strong>Audio Files:</strong> We temporarily process your uploaded audio files to provide transcription services.</p>
                            <p><strong>Usage Data:</strong> We collect information about how you use our service, including transcription history and usage limits.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                        <ul className="text-gray-700 leading-relaxed space-y-2">
                            <li>• To provide and improve our transcription services</li>
                            <li>• To manage your account and subscription</li>
                            <li>• To process payments through Stripe</li>
                            <li>• To send important service updates and notifications</li>
                            <li>• To ensure service security and prevent abuse</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Processing and Storage</h2>
                        <div className="text-gray-700 leading-relaxed space-y-3">
                            <p><strong>Audio Processing:</strong> Your audio files are sent to OpenAI&apos;s Whisper API for transcription. OpenAI processes these files according to their privacy policy.</p>
                            <p><strong>Transcription Storage:</strong> Completed transcriptions are stored in our database and associated with your account.</p>
                            <p><strong>File Retention:</strong> Original audio files are not permanently stored on our servers after processing.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Services</h2>
                        <div className="text-gray-700 leading-relaxed space-y-2">
                            <p><strong>Clerk:</strong> For authentication and user management</p>
                            <p><strong>OpenAI:</strong> For audio transcription processing</p>
                            <p><strong>Stripe:</strong> For payment processing</p>
                            <p><strong>Vercel:</strong> For hosting and deployment</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We implement appropriate security measures to protect your personal information against unauthorized access,
                            alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                        <ul className="text-gray-700 leading-relaxed space-y-2">
                            <li>• Access and review your personal information</li>
                            <li>• Request correction of inaccurate data</li>
                            <li>• Delete your account and associated data</li>
                            <li>• Export your transcription data</li>
                            <li>• Opt out of non-essential communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We retain your account information and transcriptions until you delete your account.
                            You can delete individual transcriptions at any time from your dashboard.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page
                            and updating the &quot;Last updated&quot; date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about this Privacy Policy or our data practices, please contact us through our support channels.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
