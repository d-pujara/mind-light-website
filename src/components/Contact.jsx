import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';



const Contact = () => {
    return (
        <div className="contact-page" style={{ paddingTop: '100px', minHeight: '100vh', background: '#f9f9f9', color: '#333' }}>
            <Navbar /> {/* Ensure nav is present if this is a route */}

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'serif' }}>Ready to tell your story and raise more donations?</h1>



                {/* Animated Down Arrow */}
                <div style={{ marginBottom: '3rem', animation: 'bounce 2s infinite' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </div>

                <style>{`
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                        40% {transform: translateY(-10px);}
                        60% {transform: translateY(-5px);}
                    }
                `}</style>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name</label>
                            <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Organization</label>
                            <input type="text" placeholder="Your Organization" style={{ width: '100%', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email</label>
                        <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message</label>
                        <textarea rows="5" placeholder="Tell us about your project..." style={{ width: '100%', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
                    </div>

                    <button type="submit" style={{
                        padding: '1.2rem',
                        background: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginTop: '1rem'
                    }}>
                        Submit
                    </button>
                </form>
            </div>

            {/* Footer will be auto-included by App structure if we remove it here, or we can include it. 
                Since App displays Footer globally now, we don't need to add it here.
            */}
        </div>
    );
};

export default Contact;
