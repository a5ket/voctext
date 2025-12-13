'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileAudio, Crown } from 'lucide-react'

interface UserStats {
    transcriptionCount: number
    maxTranscriptions: number
    isUserSupporter: boolean
    remainingTranscriptions: number
}

interface UploadLimitsProps {
    refreshTrigger?: number
    loading?: boolean
}

export default function UploadLimits({ refreshTrigger, loading: externalLoading }: UploadLimitsProps) {
    const { isSignedIn } = useAuth()
    const [stats, setStats] = useState<UserStats | null>(null)
    const [internalLoading, setInternalLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            if (isSignedIn) {
                try {
                    const response = await fetch('/api/user-stats')
                    const data = await response.json()
                    setStats(data)
                } catch (error) {
                    console.error('Failed to fetch user stats:', error)
                }
            }
            setInternalLoading(false)
        }

        fetchStats()
    }, [refreshTrigger, isSignedIn])

    if (!isSignedIn) {
        return (
            <Card className="w-full max-w-md mx-auto mb-6 mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                    <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                            <Crown className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-blue-900">Get Started with Voctext</h3>
                        </div>
                        <p className="text-sm text-blue-700">
                            Sign up to track your transcriptions and get free uploads to start!
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (externalLoading || internalLoading) {
        return (
            <Card className="w-full max-w-md mx-auto mb-6 mt-6">
                <CardContent className="p-6">
                    <div className="animate-pulse">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-32 mt-2"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!stats) return null

    const progressPercentage = (stats.transcriptionCount / stats.maxTranscriptions) * 100

    return (
        <Card className="w-full max-w-md mx-auto mb-6 mt-6">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <FileAudio className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-sm">Upload Limits</span>
                    </div>
                    {stats.isUserSupporter && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Crown className="w-3 h-3 mr-1" />
                            Supporter
                        </Badge>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Used: {stats.transcriptionCount}/{stats.maxTranscriptions}</span>
                        <span className="text-muted-foreground">
                            {stats.remainingTranscriptions} remaining
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${progressPercentage >= 100
                                ? 'bg-red-500'
                                : progressPercentage >= 75
                                    ? 'bg-yellow-500'
                                    : 'bg-blue-500'
                                }`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                    </div>

                    {stats.remainingTranscriptions === 0 && (
                        <p className="text-xs text-red-600 mt-2">
                            Upload limit reached
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
