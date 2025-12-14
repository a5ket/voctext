'use client'

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Transcription } from '@/lib/definitions'
import { AudioWaveformIcon as Waveform, Trash2, Check, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export interface DashboardSidebarItemProps {
    transcription: Transcription
    isSelected: boolean
    onClick: () => void
    onDelete: (id: string) => void
}

export default function DashboardSidebarItem({ transcription, isSelected, onClick, onDelete }: DashboardSidebarItemProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleDelete = async () => {
        if (!isDeleting) {
            setIsDeleting(true)
            return
        }

        if (isProcessing) {
            return
        }

        setIsProcessing(true)

        try {
            console.log('Attempting to delete transcription:', transcription.id)
            onDelete(transcription.id)  // Let parent handle the API call
            console.log('Successfully triggered delete for transcription:', transcription.id)
        } catch (error) {
            console.error('Failed to delete transcription:', transcription.id, error)
            setIsDeleting(false)
            setIsProcessing(false)
        }
    }

    const handleCancel = () => {
        setIsDeleting(false)
    }

    return (
        <SidebarMenuItem>
            <div className="group relative border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 hover:shadow-sm bg-white">
                <SidebarMenuButton
                    isActive={isSelected}
                    onClick={onClick}
                    className={`pr-12 h-auto py-2.5 px-3 rounded-lg border-0 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50 hover:bg-blue-50 text-blue-900' : 'bg-transparent'
                        }`}
                >
                    <Waveform className={`h-4 w-5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span className={`font-medium truncate text-sm ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                            {transcription.title}
                        </span>
                        <span className={`text-xs ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                            {formatDate(transcription.createdAt)}
                        </span>
                    </div>
                </SidebarMenuButton>

                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {isDeleting ? (
                        <>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 hover:bg-green-100 hover:text-green-600 bg-white border border-green-300 shadow-sm rounded-md"
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation()
                                    handleDelete()
                                }}
                                disabled={isProcessing}
                            >
                                <Check className="h-3 w-3" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 hover:bg-gray-100 bg-white border border-gray-300 shadow-sm rounded-md"
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation()
                                    handleCancel()
                                }}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </>
                    ) : (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600 text-gray-400 border border-gray-200 bg-white shadow-sm rounded-md"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation()
                                handleDelete()
                            }}
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    )}
                </div>

            </div>
        </SidebarMenuItem>
    )
}
