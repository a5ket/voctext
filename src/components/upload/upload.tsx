'use client'

import { useCallback } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'
import { UploadError } from './error'

export interface FileDropzoneProps {
    onFileUploadAction: (file: File) => void
    onUploadError: (error: string) => void
    uploadError?: string | null
    disabled?: boolean
    disabledMessage?: string
    loading?: boolean
}

export default function Upload({ onFileUploadAction, onUploadError, uploadError, disabled = false, disabledMessage, loading = false }: FileDropzoneProps) {
    const onDrop = useCallback(
        <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[]) => {
            if (fileRejections.length > 0) {
                const error = fileRejections[0].errors[0]
                let errorMessage = 'Upload error'

                if (error.code === 'file-invalid-type') {
                    errorMessage = 'Invalid file type. Please upload MP3, WAV, or M4A files only.'
                } else if (error.code === 'file-too-large') {
                    errorMessage = 'File is too large. Please upload a file smaller than 25MB.'
                } else if (error.code === 'too-many-files') {
                    errorMessage = 'Please upload only one file at a time.'
                }

                onUploadError(errorMessage)

                return
            }

            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0]

                onFileUploadAction(file)
            }
        },
        [onFileUploadAction, onUploadError]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/mpeg': ['.mp3'],
            'audio/wav': ['.wav'],
            'audio/x-wav': ['.wav'],
            'audio/mp4': ['.m4a'],
            'audio/x-m4a': ['.m4a'],
        },
        maxSize: 25 * 1024 * 1024,
        multiple: false,
        disabled: disabled,
    })

    if (loading) {
        return (
            <div className="w-full max-w-[600px] space-y-4">
                <div className="w-full border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50 space-y-3">
                    <div className="animate-pulse space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-5 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-[600px] space-y-4">
            <div
                {...getRootProps()}
                className={`w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors space-y-3
                    ${disabled ? 'cursor-not-allowed bg-gray-100 border-gray-200' : 'cursor-pointer hover:border-primary'}
                    ${isDragActive && !disabled ? 'border-primary bg-primary/5' : ''}
                    ${uploadError ? 'border-red-300 bg-red-50/50' : disabled ? 'border-gray-200' : 'border-gray-300'}`}
            >
                <input {...getInputProps()} />
                {disabled ? (
                    <>
                        <p className="text-gray-400">Upload Disabled</p>
                        <p className="text-gray-400 text-sm">{disabledMessage || 'Upload limit reached'}</p>
                    </>
                ) : (
                    <>
                        <p className="text-muted-foreground">Drag and drop an audio file here, or click to select</p>
                        <p className="text-muted-foreground">Supported formats: MP3, WAV, M4A (max 25MB)</p>
                    </>
                )}
            </div>
            {uploadError && (
                <div className="mt-4">
                    <UploadError error={uploadError} />
                </div>
            )}
        </div>
    )
}
