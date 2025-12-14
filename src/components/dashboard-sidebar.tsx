'use client'

import DashboardSidebarItem from './dashboard-sidebar-item'
import { Button } from '@/components/ui/button'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import { Transcription } from '@/lib/definitions'
import { FileAudio, Upload } from 'lucide-react'
import Link from 'next/link'

export interface DashboardSidebarProps {
    transcriptions: Transcription[]
    selectedTranscription?: Transcription
    onSelect: (transcription: Transcription) => void
    onDelete: (id: string) => void
}

export default function DashboardSidebar({ transcriptions, selectedTranscription, onSelect, onDelete }: DashboardSidebarProps) {
    return (
        <Sidebar className="h-full w-full md:shadow-none shadow-2xl">
            <SidebarHeader className="flex flex-col gap-2 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <FileAudio className="h-6 w-6" />
                            <span className="font-semibold">Transcriptions</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <Link href="/">
                    <Button className="w-full justify-start">
                        <Upload className="mr-2 h-4 w-4" />
                        New Transcription
                    </Button>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Recent Files</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2">
                            {transcriptions.map((transcription) => (
                                <DashboardSidebarItem
                                    key={transcription.id}
                                    transcription={transcription}
                                    isSelected={transcription.id === selectedTranscription?.id}
                                    onClick={() => onSelect(transcription)}
                                    onDelete={onDelete}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
