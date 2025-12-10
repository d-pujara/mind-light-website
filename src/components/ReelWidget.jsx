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

    // Converted to CSS class-based styling for better responsive control
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="reel-widget"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onOpen}
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
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.1)',
                            transition: 'background 0.3s'
                        }} />
                    </motion.div>
                    <div className="reel-text-overlay">
                        <span>Director's Reel 2025</span>
                    </div>
                </div>
            </motion.div>
            <style jsx>{`
                .reel-widget {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    /* Desktop Default (Large Screens) */
                    width: 500px;
                    height: 281px;
                    z-index: 900; /* Lower than Map Drawer (1002) */
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    background: #000;
                }

                .reel-text-overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center; justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    pointer-events: none;
                    transition: opacity 0.3s;
                }

                .reel-widget:hover .reel-text-overlay {
                    opacity: 0;
                }

                /* Laptop Breakpoint (1440px and down) */
                @media (max-width: 1440px) {
                    .reel-widget {
                        width: 400px;
                        height: 225px;
                    }
                }

                /* Mobile/Tablet Breakpoint (768px and down) */
                @media (max-width: 768px) {
                    .reel-widget {
                        width: 160px; /* Much smaller on phone */
                        height: 90px;
                        bottom: 6rem; /* Moved up to avoid covering bottom drawer */
                        right: 1rem;
                        border-radius: 8px;
                    }
                    .reel-text-overlay {
                        font-size: 0.7rem; /* Smaller text */
                    }
                }
            `}</style>
        </>
    );
};

export default ReelWidget;
