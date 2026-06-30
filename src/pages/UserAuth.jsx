import React from 'react'
import '../App.css'

const UserAuth = () => {

    const authenticateViaGoogle = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`;
    };

    const photos = [
        { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", span: "col-6" },
        { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80", span: "col-6" },
        { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80", span: "col-4" },
        { src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80", span: "col-4" },
        { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80", span: "col-4" },
        { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80", span: "col-7" },
        { src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80", span: "col-5" },
    ];

    return (
        <div
            className="min-vh-100 d-flex flex-column flex-lg-row"
            style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#0a0a0a' }}
        >

            {/* Left Panel - Collage (desktop only) */}
            <div
                className="position-relative overflow-hidden d-none d-lg-block"
                style={{ width: '55%', minHeight: '100vh', flexShrink: 0 }}
            >
                <div className="row g-2 h-100 p-2" style={{ margin: 0 }}>
                    {photos.map((photo, i) => (
                        <div key={i} className={photo.span} style={{ height: i < 2 ? '48%' : '26%' }}>
                            <div
                                className="w-100 h-100 rounded-3"
                                style={{
                                    backgroundImage: `url(${photo.src})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient overlay - right edge */}
                <div
                    className="position-absolute top-0 end-0 h-100"
                    style={{
                        width: '120px',
                        background: 'linear-gradient(to right, transparent, #0a0a0a)',
                        pointerEvents: 'none',
                    }}
                />
                {/* Gradient overlay - bottom */}
                <div
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{
                        height: '80px',
                        background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            {/* Mobile background */}
            <div
                className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.25)',
                    zIndex: 0,
                }}
            />

            {/* Right Panel - Auth */}
            <div
                className="d-flex flex-column justify-content-center align-items-center position-relative flex-grow-1"
                style={{
                    minHeight: '100vh',
                    zIndex: 1,
                    padding: '3rem 2rem',
                }}
            >
                {/* Logo & Brand */}
                <div className="text-center mb-5">
                    <div
                        className="d-inline-flex align-items-center justify-content-center rounded-3 mb-4"
                        style={{
                            width: 64, height: 64,
                            background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 75%, #EA4335 100%)',
                            boxShadow: '0 8px 32px rgba(66,133,244,0.35)',
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white" opacity="0.9"/>
                            <rect x="13" y="3" width="8" height="8" rx="1.5" fill="white" opacity="0.7"/>
                            <rect x="3" y="13" width="8" height="8" rx="1.5" fill="white" opacity="0.7"/>
                            <rect x="13" y="13" width="8" height="8" rx="1.5" fill="white" opacity="0.5"/>
                        </svg>
                    </div>

                    <h1 className="fw-bold mb-2" style={{ color: '#ffffff', fontSize: '2rem', letterSpacing: '-0.5px' }}>
                        Albumix
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', margin: 0 }}>
                        Turn ideas into stunning visuals.
                    </p>
                </div>

                <p className="mb-4 text-center" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Get started for free
                </p>

                {/* Google Sign In */}
                <button
                    onClick={authenticateViaGoogle}
                    className="d-flex align-items-center justify-content-center gap-2 border-0"
                    style={{
                        width: '100%',
                        maxWidth: 320,
                        padding: '13px 24px',
                        borderRadius: '12px',
                        background: '#ffffff',
                        color: '#1a1a1a',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                        transition: 'all 0.2s ease',
                        letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
                    }}
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google"
                        width="20"
                        height="20"
                    />
                    <span>Continue with Google</span>
                </button>

                {/* Footer note */}
                <p className="mt-5 text-center" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', maxWidth: 280 }}>
                    By continuing, you agree to our{' '}
                    <span style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer', textDecoration: 'underline' }}>Terms</span>
                    {' '}and{' '}
                    <span style={{ color: 'rgba(255,255,255,0.4)', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}

export default UserAuth