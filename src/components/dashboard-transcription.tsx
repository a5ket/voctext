'use client'

import { Download, Edit2, Check, X } from 'lucide-react'
import { useState } from 'react'
import { Transcription } from '@/lib/definitions'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { downloadTranscription } from '@/lib/download'
import { formatDuration } from '@/lib/utils'
import { updateTranscriptionTitle } from '@/lib/api'

export interface TranscriptionViewerProps {
    transcription: Transcription
    onUpdate?: (id: string, title: string) => void
}

export default function DashboardTranscription({ transcription, onUpdate }: TranscriptionViewerProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(transcription.title)
    const wordsCount = transcription.text.split(' ').length

    const handleDownload = downloadTranscription.bind(null, transcription)

    const handleEdit = async () => {
        if (isEditing && editTitle.trim() && editTitle !== transcription.title) {
            try {
                await updateTranscriptionTitle(transcription.id, editTitle.trim())
                onUpdate?.(transcription.id, editTitle.trim())
            } catch (error) {
                console.error('Failed to update title:', error)
                setEditTitle(transcription.title)
            }
        }
        setIsEditing(!isEditing)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditTitle(transcription.title)
    }

    return (
        <>
            <CardContent className="p-6 flex flex-col">
                <div className="flex pb-5 items-center gap-3">
                    <div className="flex-1 flex items-center gap-2">
                        {isEditing ? (
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="text-xl font-bold border-none p-0 h-auto focus-visible:ring-0"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleEdit()
                                    if (e.key === 'Escape') handleCancel()
                                }}
                                autoFocus
                            />
                        ) : (
                            <h1 className="text-xl font-bold">{transcription.title}</h1>
                        )}

                        {isEditing ? (
                            <div className="flex gap-1">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                                    onClick={handleEdit}
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                    onClick={handleCancel}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    <Button
                        variant="default"
                        onClick={handleDownload}
                        className="bg-blue-500 hover:bg-blue-600"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download Transcription
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Language</h3>
                        <p className="mt-1 font-semibold font-mono">{transcription.language}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                        <p className="mt-1 font-semibold font-mono">{formatDuration(transcription.duration)}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Words</h3>
                        <p className="mt-1 font-semibold font-mono">{wordsCount.toLocaleString()}</p>
                    </div>
                </div>

                <div className="space-y-4 relative">
                    <div className="relative max-h-72 overflow-y-auto">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{transcription.text}</p>
                    </div>
                </div>
            </CardContent>
        </>
    )
}
