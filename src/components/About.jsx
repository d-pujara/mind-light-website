import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', paddingBottom: '4rem' }}>

            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '8rem', paddingLeft: '2rem', paddingRight: '2rem' }}>

                {/* Hero Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '6rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <h1 style={{ fontFamily: '"Georgia", serif', fontSize: '3.5rem', marginBottom: '1rem', color: '#4E3629' }}>
                            Guiding Light
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                            Illuminating the stories that drive change.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        style={{
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            marginBottom: '3rem'
                        }}
                    >
                        <img
                            src="/dish_headshot.jpg"
                            alt="Dish Pujara"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{ textAlign: 'center', maxWidth: '800px' }}
                    >
                        <h2 style={{ fontFamily: '"Georgia", serif', fontSize: '2rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>
                            Dish Pujara
                        </h2>
                        <h3 style={{ fontSize: '1.1rem', color: '#4E3629', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem' }}>
                            Director & Storyteller
                        </h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
                            At Mind Light Films, we believe in the power of visual storytelling to amplify the voices of those doing good.
                            My journey began with a passion for cinema and a desire to make a tangible impact.
                            I founded Mind Light to bridge the gap between cinematic excellence and mission-driven advocacy,
                            helping nonprofits connect deeply with their communities through authentic, human-centered narratives.
                        </p>
                    </motion.div>
                </div>

                {/* Mission / Values Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '8rem' }}>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontFamily: '"Georgia", serif', fontSize: '1.5rem', marginBottom: '1rem', color: '#4E3629' }}>Authenticity</h3>
                        <p style={{ lineHeight: '1.6', color: '#555' }}>
                            We don't script your passion. We capture it. Our approach is documentary-first, finding the real moments that resonate.
                        </p>
                    </div>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontFamily: '"Georgia", serif', fontSize: '1.5rem', marginBottom: '1rem', color: '#4E3629' }}>Empathy</h3>
                        <p style={{ lineHeight: '1.6', color: '#555' }}>
                            Understanding the people behind the mission is our first step. We listen before we film.
                        </p>
                    </div>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontFamily: '"Georgia", serif', fontSize: '1.5rem', marginBottom: '1rem', color: '#4E3629' }}>Excellence</h3>
                        <p style={{ lineHeight: '1.6', color: '#555' }}>
                            Your cause deserves the highest quality. We bring feature-film standards to nonprofit storytelling.
                        </p>
                    </div>
                </div>

                {/* Team / Closing */}
                <div style={{ textAlign: 'center', padding: '4rem', background: '#e8e4dc', borderRadius: '24px' }}>
                    <h2 style={{ fontFamily: '"Georgia", serif', fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4E3629' }}>
                        Let's illuminate your story.
                    </h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#555' }}>
                        Whether you are a startup nonprofit or an established institution, we are ready to help you shine.
                    </p>
                    <a href="/work-with-us" style={{
                        display: 'inline-block',
                        padding: '1rem 2.5rem',
                        background: '#4E3629',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        transition: 'transform 0.2s'
                    }}>
                        Get in Touch
                    </a>
                </div>

            </div>
        </div>
    );
};

export default About;
