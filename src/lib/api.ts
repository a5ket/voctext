import axios, { AxiosError } from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
})

export async function uploadFileTranscription(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await api.post('/api/transcriptions', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error || 'Upload error')
        }
        throw error
    }
}

export async function fetchTranscriptions() {
    try {
        const response = await api.get('/api/transcriptions')
        return response.data.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error || 'Fetch error')
        }
        throw error
    }
}

export async function deleteTranscription(id: string) {
    try {
        const response = await api.delete(`/api/transcriptions/${id}`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error || 'Delete error')
        }
        throw error
    }
}

export async function updateTranscriptionTitle(id: string, title: string) {
    try {
        const response = await api.patch(`/api/transcriptions/${id}`, { title })
        return response.data.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error || 'Update error')
        }
        throw error
    }
}

export async function fetchUserStats() {
    try {
        const response = await api.get('/api/user-stats')
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error || 'Stats error')
        }
        throw error
    }
}
