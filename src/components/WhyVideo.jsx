import React, { useEffect } from 'react';
import ProcessScroll from './ProcessScroll';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Services = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const services = [
        {
            title: "Documentary Production",
            content: <p>Full-scale documentary production telling the untold stories of your impact. From concept to final cut, we handle everything with a cinematic approach that honors your subjects.</p>
        },
        {
            title: "Campaign Strategy",
            content: <p>We don't just make videos; we build movements. We help you design a rollout strategy that ensures your content reaches the right audience and drives tangible action.</p>
        },
        {
            title: "Social Media Micro-Content",
            content: <p>In the age of attention economy, we create bite-sized, high-impact reels and shorts derived from larger projects to keep your community engaged daily.</p>
        },
        {
            title: "Impact Reporting",
            content: <p>Turn your annual report into a visual journey. We visualize your data and success stories into compelling video narratives that donors actually want to watch.</p>
        },
        {
            title: "Event Coverage",
            content: <p>Capture the energy of your galas, fundraisers, and community events. We create highlight reels that serve as powerful FOMO-inducing marketing for next year.</p>
        }
    ];

    return (
        <div className="services-page" style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)', // Clean gradient background since image is missing
            position: 'relative',
        }}>
            {/* Soft White Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.4)', // "Soft white overlay with low opacity"
                backdropFilter: 'blur(5px)',
                zIndex: 1
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
                <Navbar />

                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '8rem 2rem 4rem 2rem' }}>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        style={{ marginBottom: '4rem', textAlign: 'center' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                            marginBottom: '1rem',
                            fontFamily: 'serif',
                            color: '#1a1a1a', // Dark text on light overlay
                            textShadow: '0 2px 20px rgba(255,255,255,0.8)'
                        }}>Our Services</h1>
                        <p style={{
                            fontSize: '1.2rem',
                            color: '#333',
                            maxWidth: '600px',
                            margin: '0 auto',
                            fontWeight: '500'
                        }}>
                            Amplifying the voice of those doing good through world-class storytelling.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Custom styling wrapper for Process Scroll */}
                        <div className="process-scroll-wrapper">
                            <ProcessScroll />
                        </div>
                    </motion.div>

                    <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                        <button
                            onClick={() => navigate('/contact')}
                            style={{
                                padding: '1.2rem 3rem',
                                background: '#1a1a1a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}
                        >
                            Start a Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;

