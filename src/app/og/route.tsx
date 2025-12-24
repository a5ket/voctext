import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 64,
          background: '#0f0f0f',
          color: '#ffffff',
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        <div>Voctext</div>
        <div style={{ fontSize: 28, opacity: 0.8, marginTop: 16 }}>
          AI Audio Transcription
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}