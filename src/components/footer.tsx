import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 bg-white mt-16">
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="text-center space-y-6">
                    {/* Project Description */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">Voctext</h3>
                        <p className="text-gray-600 text-sm max-w-md mx-auto">
                            Fast and accurate audio transcription powered by OpenAI Whisper.
                            Convert your audio files to text in seconds.
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div className="flex items-center justify-center space-x-4 text-sm">
                        <Link
                            href="/terms"
                            className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                        >
                            Terms of Service
                        </Link>
                        <span className="text-gray-300">·</span>
                        <Link
                            href="/privacy"
                            className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Author Section */}
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                        <p className="text-gray-600 text-sm">
                            Built by <span className="font-medium text-gray-900">Maksym Kotsiuruba</span>
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm">
                            <Link
                                href="https://github.com/a5ket"
                                className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
                            >
                                GitHub
                            </Link>
                            <span className="text-gray-300">·</span>
                            <Link
                                href="https://www.upwork.com/freelancers/maksymkotsiuruba"
                                className="text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
                            >
                                Upwork Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
