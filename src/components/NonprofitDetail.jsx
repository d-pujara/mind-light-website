import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import VideoPlayer from './VideoPlayer';

const NonprofitDetail = ({ nonprofits }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const nonprofit = nonprofits.find(np => np.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!nonprofit) return <div>Nonprofit not found</div>;

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#121212' // Fallback
        }}>
            {/* Background Hero Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: nonprofit.executiveDirector.imageUrl ? `url(${nonprofit.executiveDirector.imageUrl})` : `url(${nonprofit.logoUrl})`, // Use logo or director image as fallback hero
                // Ideally we'd have a specific heroUrl. For now, try director or standard placeholder if needed.
                // Let's use a nice subtle placeholder filter if no hero image is explicit
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.8)',
                zIndex: 0
            }} />

            <Navbar />

            {/* Centered Overlay Card */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '1000px',
                height: '85vh',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Scrollable Content Area */}
                <div style={{
                    overflowY: 'auto',
                    padding: '3rem',
                    height: '100%',
                    color: '#1a1a1a'
                }}>

                    {/* Header: Name & Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontFamily: 'serif', fontSize: '3rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>{nonprofit.name}</h1>
                        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', color: '#666' }}>
                            {nonprofit.location} • Est. {nonprofit.foundedYear}
                        </p>
                    </div>

                    {/* Video Section */}
                    <div style={{
                        width: '100%',
                        aspectRatio: '16/9',
                        marginBottom: '3rem',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        <VideoPlayer
                            videoUrl={nonprofit.videoUrl}
                            logoUrl={nonprofit.logoUrl}
                        />
                    </div>

                    {/* Description Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                        <div>
                            <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid #D4C5A9', paddingBottom: '0.5rem', display: 'inline-block' }}>The Issue</h3>
                            <p style={{ lineHeight: '1.8', color: '#444' }}>
                                {nonprofit.issue || "Details on the community challenge being addressed."}
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid #D4C5A9', paddingBottom: '0.5rem', display: 'inline-block' }}>The Solution</h3>
                            <p style={{ lineHeight: '1.8', color: '#444' }}>
                                {nonprofit.solution || "Details on the organization's impactful approach."}
                            </p>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <a href={nonprofit.donationUrl} target="_blank" rel="noopener noreferrer" style={{
                                padding: '1rem 2.5rem',
                                backgroundColor: '#D4C5A9',
                                color: '#000',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                transition: 'transform 0.2s'
                            }}>
                                Donate Now
                            </a>
                            <a href={nonprofit.websiteUrl} target="_blank" rel="noopener noreferrer" style={{
                                padding: '1rem 2.5rem',
                                border: '1px solid #ccc',
                                color: '#555',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                borderRadius: '50px'
                            }}>
                                Visit Website
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Back Button (Fixed outside card) */}
            <div
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    color: 'white',
                    zIndex: 20,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '50px',
                    backdropFilter: 'blur(5px)'
                }}
            >
                &larr; Back to Map
            </div>
        </div>
    );
};

export default NonprofitDetail;
