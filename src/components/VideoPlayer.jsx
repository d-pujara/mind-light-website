import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoPlayer = ({ videoUrl, logoUrl, posterUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    // Helper to extract YouTube ID
    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = getYoutubeId(videoUrl);

    // 1. YouTube Player
    if (youtubeId) {
        return (
            <div
                className="video-player-container"
                style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '56.25%', // 16:9 Aspect Ratio
                    height: 0,
                    backgroundColor: '#000',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                }}
            >
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>
        );
    }

    // 2. Direct File Player (Fallback / Original)
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div
            className="video-player-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
        >
            <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={false}
                playsInline
            />

            {/* Logo Overlay - Visible when paused or hovered */}
            <AnimatePresence>
                {(!isPlaying || isHovered) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: isPlaying ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'none'
                        }}
                    >
                        {logoUrl && (
                            <motion.img
                                src={logoUrl}
                                alt="Logo"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.8 }}
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
                                    marginBottom: '1rem'
                                }}
                            />
                        )}

                        {!isPlaying && (
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.4)',
                                    pointerEvents: 'auto',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlay();
                                }}
                            >
                                <div style={{
                                    width: 0,
                                    height: 0,
                                    borderTop: '10px solid transparent',
                                    borderBottom: '10px solid transparent',
                                    borderLeft: '16px solid white',
                                    marginLeft: '4px'
                                }} />
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Controls Bar - Visible on Hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '1rem',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <button
                            onClick={togglePlay}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {isPlaying ? 'PAUSE' : 'PLAY'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideoPlayer;
