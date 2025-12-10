import React from 'react';
import Navbar from './Navbar';

const NarrativeWork = () => {
    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                paddingTop: '8rem'
            }}>
                <h1 style={{
                    fontFamily: '"Georgia", serif',
                    fontSize: '4rem',
                    color: '#4E3629',
                    marginBottom: '1rem'
                }}>
                    Narrative Work
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    color: '#666',
                    fontStyle: 'italic',
                    letterSpacing: '2px'
                }}>
                    Coming Soon
                </p>
            </div>
        </div>
    );
};

export default NarrativeWork;
