
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Real Data from User - Configured for "Offcenter" & "Varied Sizes"
// "Same Shape" = All 16:9 Landscape
const SELECTED_WORKS = [
    {
        id: 1,
        title: "East Meets West Parent Education Club",
        youtubeId: "Wm03Vdj-d4Q",
        // Large Size, Standard Position
        gridClass: { gridColumn: 'span 2', gridRow: 'span 2' },
        style: {}
    },
    {
        id: 2,
        title: "Culver Palms Meals on Wheels",
        youtubeId: "mNX-xocPyPQ",
        // Normal Size, Pushed down for "Offcenter" look
        gridClass: { gridColumn: 'span 1', gridRow: 'span 1' },
        style: { marginTop: '4rem' }
    },
    {
        id: 3,
        title: "All People's Community Center",
        youtubeId: "PJaC9n3i1Nw",
        // Normal Size, Pushed Right slightly? 
        // Actually, let's make this one Large but offset?
        // Or just Normal adjacent to the previous one
        gridClass: { gridColumn: 'span 1', gridRow: 'span 1' },
        style: { marginLeft: '2rem', marginTop: '-2rem' } // Overlap/Offset
    },
    {
        id: 4,
        title: "Camp Joe Ide 2025",
        youtubeId: "H7I2r0tsHlc",
        // Large Size, Centered?
        gridClass: { gridColumn: 'span 2', gridRow: 'span 2' },
        style: { transform: 'translateX(5%)' }
    },
];

const Work = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            padding: '8rem 2rem 4rem 2rem',
            color: '#1a1a1a' // Switch text to dark
        }}>
            {/* Background Image Fixed */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/mountains.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -2
            }} />

            {/* Faded White Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.65)', // "White faded out"
                backdropFilter: 'blur(3px)',
                zIndex: -1
            }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <h1 style={{
                    color: '#4E3629', // Mind Light Brown
                    fontFamily: '"Georgia", serif',
                    fontSize: '3rem',
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}>
                    Selected Works
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px', // Increased gap for airy feel
                    gridAutoFlow: 'dense',
                    alignItems: 'start' // Important for offcenter margins to work
                }}>
                    {SELECTED_WORKS.map((video) => (
                        <motion.div
                            key={video.id}
                            style={{
                                ...video.gridClass,
                                ...video.style,
                                position: 'relative',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: '#111',
                                aspectRatio: '16/9', // Strict Landscape
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}
                            whileHover={{ scale: 1.02, zIndex: 10 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedVideo(video)}
                        >
                            {/* Cover Image from YouTube */}
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.8 }}
                            />

                            {/* Hover Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                            >    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center', padding: '1rem' }}>
                                    {video.title}
                                </span>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{ width: 0, height: 0, borderLeft: '10px solid white', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', marginLeft: '4px' }} />
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Reusing Modal Logic locally for now */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 5000
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ width: '90%', maxWidth: '1000px', aspectRatio: '16/9', background: '#000', position: 'relative' }}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                style={{
                                    position: 'absolute', top: '-40px', right: 0, color: 'white', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Work;
