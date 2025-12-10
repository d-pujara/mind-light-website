import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ClientReviews = ({ clients }) => {
    // Filter clients that actually have reviews or a quote to show
    const reviews = clients.filter(c => c.review || c.description);

    return (
        <div className="reviews-page" style={{
            paddingTop: '100px',
            minHeight: '100vh',
            background: '#f5f5f5',
            color: '#333'
        }}>
            <Navbar />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontFamily: '"Georgia", serif',
                        marginBottom: '1rem',
                        color: '#4E3629'
                    }}>
                        Client Words
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                        Hear from the organizations we've partnered with to tell their stories.
                    </p>
                </div>

                {/* Masonry-ish Grid using CSS Columns */}
                <div style={{
                    columnCount: 3,
                    columnGap: '2rem',
                    // Responsive column count via media queries (injected below)
                }} className="masonry-grid">

                    {reviews.map((client, index) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            style={{
                                breakInside: 'avoid',
                                marginBottom: '2rem',
                                background: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                border: '1px solid rgba(0,0,0,0.02)'
                            }}
                        >
                            {/* Star Rating (Generic 5 stars for now as placeholder or real if data had it) */}
                            <div style={{ color: '#FFB400', fontSize: '1.2rem' }}>
                                ★★★★★
                            </div>

                            {/* Review Text */}
                            <p style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.6',
                                fontStyle: 'italic',
                                color: '#444'
                            }}>
                                "{client.review || "Mind Light Films helped us bring our vision to life with incredible sensitivity and artistic skill. A truly transformative experience."}"
                            </p>

                            {/* Client Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                                <img
                                    src={client.logoUrl}
                                    alt={client.name}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'contain', border: '1px solid #eee' }}
                                />
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#4E3629' }}>{client.name}</h4>
                                    <Link
                                        to={`/nonprofit/${client.id}`}
                                        style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}
                                    >
                                        View Profile &rarr;
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Responsive Styles Injection */}
            <style>{`
                @media (max-width: 1024px) {
                    .masonry-grid {
                        column-count: 2 !important;
                    }
                }
                @media (max-width: 768px) {
                    .masonry-grid {
                        column-count: 1 !important;
                    }
                    h1 {
                        fontSize: 2.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ClientReviews;
