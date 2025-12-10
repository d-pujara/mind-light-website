import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ clients }) => {
    return (
        <footer className="footer" style={{
            background: '#1a1a1a',
            color: '#888',
            padding: '4rem 2rem 2rem 2rem',
            borderTop: '1px solid #333',
            marginTop: 'auto'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {/* Column 1: Quick Links */}
                    <div>
                        <h4 style={{ color: '#F5EFE0', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Map Home</Link></li>
                            <li style={{ marginBottom: '0.5rem' }}><Link to="/work" style={{ color: '#888', textDecoration: 'none' }}>Selected Works</Link></li>
                            <li style={{ marginBottom: '0.5rem' }}><Link to="/why-video" style={{ color: '#888', textDecoration: 'none' }}>Services</Link></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#about" style={{ color: '#888', textDecoration: 'none' }}>About Us</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Contact */}
                    <div>
                        <h4 style={{ color: '#F5EFE0', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <a href="mailto:dishant@mindlightfilms.net" style={{ color: '#888', textDecoration: 'none' }}>dishant@mindlightfilms.net</a>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <a href="tel:+15105799028" style={{ color: '#888', textDecoration: 'none' }}>(510) 579-9028</a>
                            </li>
                        </ul>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <a href="https://www.instagram.com/mindlight_films/" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.3s' }}>
                                <img src="/instagram.png" alt="Instagram" style={{ width: '24px', height: '24px', filter: 'invert(1)' }} />
                            </a>
                            <a href="https://www.youtube.com/@mindlightfilms" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.3s' }}>
                                <img src="/youtube.png" alt="YouTube" style={{ width: '28px', height: '28px', filter: 'invert(1)' }} />
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Nonprofit Partners Ticker */}
                    <div>
                        <h4 style={{ color: '#F5EFE0', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Partners</h4>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {clients.map(client => (
                                <Link key={client.id} to={`/nonprofit/${client.id}`} title={client.name}>
                                    <img
                                        src={client.logoUrl}
                                        alt={client.name}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            objectFit: 'contain',
                                            opacity: 0.5,
                                            filter: 'grayscale(100%)',
                                            transition: 'opacity 0.3s'
                                        }}
                                        onMouseOver={e => e.target.style.opacity = 1}
                                        onMouseOut={e => e.target.style.opacity = 0.5}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Row */}
                <div style={{
                    borderTop: '1px solid #333',
                    paddingTop: '2rem',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                }}>
                    <p>&copy; 2025 Mind Light Films – The original donation-map filmmaker</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
