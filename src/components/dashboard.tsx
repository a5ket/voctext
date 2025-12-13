'use client'

import { useState } from 'react'
import { Transcription } from '@/lib/definitions'
import DashboardSidebar from './dashboard-sidebar'
import DashboardTranscription from './dashboard-transcription'
import { SidebarProvider } from '@/components/ui/sidebar'
import { deleteTranscription, updateTranscriptionTitle } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function Dashboard({
    transcriptions: initialTranscriptions,
    onTranscriptionsUpdate
}: {
    transcriptions: Transcription[]
    onTranscriptionsUpdate?: (transcriptions: Transcription[]) => void
}) {
    const [transcriptions, setTranscriptions] = useState<Transcription[]>(initialTranscriptions)
    const [selectedTranscription, setSelectedTranscription] = useState<Transcription | undefined>(undefined)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleDelete = async (id: string) => {
        try {
            await deleteTranscription(id)
            const updatedTranscriptions = transcriptions.filter(t => t.id !== id)
            setTranscriptions(updatedTranscriptions)
            onTranscriptionsUpdate?.(updatedTranscriptions)
            if (selectedTranscription?.id === id) {
                setSelectedTranscription(undefined)
            }
        } catch (error) {
            console.error('Failed to delete transcription:', error)
        }
    }

    const handleUpdate = async (id: string, title: string) => {
        try {
            await updateTranscriptionTitle(id, title)
            const updatedTranscriptions = transcriptions.map(t => t.id === id ? { ...t, title } : t)
            setTranscriptions(updatedTranscriptions)
            onTranscriptionsUpdate?.(updatedTranscriptions)
            if (selectedTranscription?.id === id) {
                setSelectedTranscription(prev => prev ? { ...prev, title } : prev)
            }
        } catch (error) {
            console.error('Failed to update transcription:', error)
        }
    }

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full flex-col md:flex-row relative">
                <header className="md:hidden flex items-center justify-between p-4 border-b bg-background relative z-60">
                    <Button
                        variant="ghost"
                        size="default"
                        className="h-10 w-10 p-0"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <div className="w-10" />
                </header>

                {isMobileMenuOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 mt-16"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                <div className={`
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:relative fixed left-0 z-50 w-80 transition-transform duration-300 ease-in-out
                    md:inset-y-auto md:h-full
                    top-16 bottom-0 md:top-0
                `}>
                    <DashboardSidebar
                        transcriptions={transcriptions}
                        onSelect={(transcription: Transcription) => {
                            setSelectedTranscription(transcription)
                            setIsMobileMenuOpen(false)
                        }}
                        selectedTranscription={selectedTranscription}
                        onDelete={handleDelete}
                    />
                </div>

                <div className="flex-1 flex flex-col min-w-0">
                    {selectedTranscription ? (
                        <DashboardTranscription transcription={selectedTranscription} onUpdate={handleUpdate} />
                    ) : (
                        <div className="flex-1 flex items-center justify-center p-4">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Select a transcription</h1>
                                <p className="text-sm text-muted-foreground">
                                    Choose a file from the sidebar to view its transcription
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SidebarProvider>
    )
}
