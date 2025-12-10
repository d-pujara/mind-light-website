import React, { useEffect, useState } from 'react';

const IntroAnimation = ({ onComplete }) => {
    const [visible, setVisible] = useState(true);

    const handleVideoEnd = () => {
        setVisible(false);
        setTimeout(onComplete, 2500); // Wait for the clean fade out
    };

    // Fallback: Force end after 8 seconds if video somehow fails to play/end
    useEffect(() => {
        const timer = setTimeout(() => {
            if (visible) handleVideoEnd();
        }, 8000);
        return () => clearTimeout(timer);
    }, [visible, onComplete]);

    if (!visible && false) return null; // Don't return null immediately/ever, let parent handle unmount or just hide via opacity

    return (
        <div className={`intro-container`} style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: visible ? 1 : 0,
            transition: 'opacity 2.5s ease-in-out', // Slow fade
            pointerEvents: visible ? 'auto' : 'none'
        }}>
            <video
                src="https://res.cloudinary.com/dr5fqw5yy/video/upload/v1765277422/Mind_Light_Films_3_1_esdwba.mp4"
                autoPlay
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onEnded={handleVideoEnd}
            />
        </div>
    );
};

export default IntroAnimation;
