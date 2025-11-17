// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Portfolio Andri | Creative Developer';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// Page component
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0f172a',
                    color: 'white',
                    fontFamily: 'Arial',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Animated Background Effect */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        bottom: -150,
                        left: -150,
                        width: 500,
                        height: 500,
                        background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                {/* Grid Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                />

                <div
                    style={{
                        fontSize: 76,
                        fontWeight: 'bold',
                        marginBottom: 25,
                        background: 'linear-gradient(45deg, #60a5fa, #a855f7)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        textAlign: 'center',
                    }}
                >
                    ANDRI
                </div>

                <div
                    style={{
                        fontSize: 38,
                        marginBottom: 20,
                        color: '#cbd5e1',
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    Building Digital Experiences
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: 15,
                        marginBottom: 30,
                    }}
                >
                    <div style={{
                        padding: '8px 16px',
                        backgroundColor: 'rgba(255, 45, 32, 0.2)',
                        color: '#FF2D20',
                        borderRadius: 8,
                        fontSize: 18,
                        fontWeight: '600',
                        border: '1px solid rgba(255, 45, 32, 0.3)'
                    }}>
                        Laravel
                    </div>
                    <div style={{ padding: '8px 16px', backgroundColor: 'rgba(59,130,246,0.2)', borderRadius: 8, fontSize: 18 }}>
                        React
                    </div>
                    <div style={{ padding: '8px 16px', backgroundColor: 'rgba(139,92,246,0.2)', borderRadius: 8, fontSize: 18 }}>
                        Next.js
                    </div>
                    <div style={{ padding: '8px 16px', backgroundColor: 'rgba(16,185,129,0.2)', borderRadius: 8, fontSize: 18 }}>
                        Node.js
                    </div>
                </div>

                <div
                    style={{
                        fontSize: 26,
                        color: '#94a3b8',
                        backgroundColor: 'rgba(30,41,59,0.8)',
                        padding: '15px 30px',
                        borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    🌐 andri.biz.id
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}