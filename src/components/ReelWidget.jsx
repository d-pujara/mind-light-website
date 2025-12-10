import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ReelWidget = ({ onOpen }) => {
    const videoRef = React.useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(e => console.log("Play failed", e));
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset or keep paused? "Partially start playing" implies from start or just playing. Resetting feels cleaner for "hover preview".
        }
    };

    // Use a specific start time or just 0.
    // User asked "partially start playing".

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="reel-widget"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onOpen}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                // Responsive Widths:
                // Mobile (<768px): 90vw
                // Laptop (768px - 1440px): 400px (Smaller to save space)
                // Desktop (>1440px): 500px (Full glory)
                width: 'clamp(300px, 90vw, 500px)',
                maxWidth: window.innerWidth < 1440 ? '400px' : '500px', // Force smaller on laptops
                height: window.innerWidth < 1440 ? '225px' : '281px', // Maintain aspect ratio
                zIndex: 2000,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                background: '#000'
            }}
        >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(https://img.youtube.com/vi/o1BlPAvSJ3o/maxresdefault.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                >
                    {/* Optional: Add a subtle overlay or play icon if needed, but keeping it clean for now */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.1)', // Slight tint
                        transition: 'background 0.3s'
                    }} />
                </motion.div>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    pointerEvents: 'none', // Allow hover to trigger on parent
                    transition: 'opacity 0.3s'
                }}
                    className="hover-text-overlay" // Use CSS to hide on hover if desired? Or keep text overlay?
                // User said "video in the corner make it a hoverable link to yotube... get the video to partially start playing... when you hover".
                // Usually preview playing means text goes away.
                >
                    <span style={{ opacity: 1, transition: 'opacity 0.3s' }}>Director's Reel 2025</span>
                </div>
            </div>
            <style jsx>{`
                .reel-widget:hover .hover-text-overlay {
                    opacity: 0 !important;
                }
            `}</style>
        </motion.div>
    );
};

export default ReelWidget;
