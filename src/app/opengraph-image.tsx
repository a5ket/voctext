import { ImageResponse } from 'next/og'

export const alt = 'Voctext — AI Audio Transcription'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0b0b0b',
          color: '#ffffff',
          padding: 80,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800 }}>
          Voctext
        </div>

        <div style={{ fontSize: 36, opacity: 0.85, marginTop: 16 }}>
          AI Audio Transcription
        </div>

        <div style={{ fontSize: 24, opacity: 0.7, marginTop: 32 }}>
          Convert audio to accurate text in seconds
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}