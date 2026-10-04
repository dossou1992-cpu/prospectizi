import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#0B132B',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00D4FF',
          borderRadius: 8,
          fontWeight: 900,
          border: '2px solid #00B4D8',
          fontFamily: 'sans-serif',
        }}
      >
        P
      </div>
    ),
    {
      ...size,
    }
  );
}
