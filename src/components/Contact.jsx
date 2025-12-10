import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Counter = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        if (target === 0) return; // Don't animate if 0

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target]);

    return count.toLocaleString();
};

const Contact = () => {
    return (
        <div className="contact-page" style={{ paddingTop: '100px', minHeight: '100vh', background: '#f9f9f9', color: '#333' }}>
            <Navbar /> {/* Ensure nav is present if this is a route */}

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'serif' }}>Ready to tell your story and raise more donations?</h1>

                {/* Impact Counter Section */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'normal', color: '#666' }}>
                        <span style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: '#1a1a1a',
                            display: 'inline-block',
                            minWidth: '120px'
                        }}>
                            {/* Animated Counter Component placeholders */}
                            $<Counter target={0} />
                        </span>
                        {' '}raised so far for these organizations (and counting)
                    </h2>
                </div>

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
