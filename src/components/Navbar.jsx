import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Mobile Menu State
    const location = useLocation();
    const isMapPage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Solid background if not on map page, or if scrolled (or if menu is open!)
    const navbarClass = `navbar ${scrolled || !isMapPage ? 'scrolled' : ''}`;

    // Mobile Menu Animation Variants
    const menuVariants = {
        closed: { opacity: 0, x: '100%' },
        open: { opacity: 1, x: 0 }
    };

    return (
        <nav className={navbarClass} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1rem 2rem', // Reduced padding slightly for better mobile fit
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 9000,
            transition: 'all 0.3s',
            background: (scrolled || !isMapPage || menuOpen) ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: (scrolled || !isMapPage || menuOpen) ? 'blur(10px)' : 'none',
            boxShadow: (scrolled || !isMapPage) ? '0 2px 20px rgba(0,0,0,0.05)' : 'none'
        }}>
            {/* Logo */}
            <Link to="/" style={{
                textDecoration: 'none',
                color: '#4E3629',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                pointerEvents: 'auto',
                cursor: 'pointer',
                zIndex: 9002 // Above menu overlay
            }}>
                <img src="/transparent_logo.png" alt="Mind Light Films" style={{ height: '40px', width: 'auto' }} />
            </Link>

            {/* Desktop Links - Hidden on Mobile via CSS */}
            <ul className="nav-links" style={{
                display: 'flex',
                gap: '2rem',
                listStyle: 'none',
                alignItems: 'center',
                margin: 0,
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontWeight: 'bold'
                // pointerEvents handled by CSS (hidden on mobile)
            }}>
                <li><Link to="/work" style={{ color: '#4E3629', textDecoration: 'none' }}>Selected Works</Link></li>
                <li><Link to="/reviews" style={{ color: '#4E3629', textDecoration: 'none' }}>Client Reviews</Link></li>
                <li><Link to="/about" style={{ color: '#4E3629', textDecoration: 'none' }}>About Us</Link></li>
                <li><Link to="/why-video" style={{ color: '#4E3629', textDecoration: 'none' }}>Services</Link></li>
                <li>
                    <Link to="/narrative-work" style={{ color: '#4E3629', textDecoration: 'none' }}>
                        Narrative Work
                    </Link>
                </li>
                <li>
                    <Link to="/work-with-us" style={{
                        textDecoration: 'none',
                        color: 'white',
                        backgroundColor: '#4E3629',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '30px',
                        fontSize: '1rem',
                        transition: 'transform 0.2s',
                        display: 'inline-block'
                    }}>
                        Work With Us &rarr;
                    </Link>
                </li>
            </ul>

            {/* Hamburger Button - Visible only on Mobile (Logic handled here or CSS) */}
            {/* Simplest: Always render, hide on Desktop via CSS */}
            <div
                className="hamburger-menu"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: 'none', // Hidden by default, shown in mobile media query
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    width: '2rem',
                    height: '2rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    zIndex: 9002, // Above overlay
                    pointerEvents: 'auto'
                }}
            >
                <div style={{ width: '2rem', height: '0.25rem', background: '#4E3629', borderRadius: '10px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'rotate(0)' }} />
                <div style={{ width: '2rem', height: '0.25rem', background: '#4E3629', borderRadius: '10px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
                <div style={{ width: '2rem', height: '0.25rem', background: '#4E3629', borderRadius: '10px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'rotate(0)' }} />
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',
                            background: '#f5f5f5', // Match body bg
                            zIndex: 9001,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            fontFamily: '"Georgia", serif',
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}>
                            <li><Link to="/" onClick={() => setMenuOpen(false)} style={{ color: '#4E3629', textDecoration: 'none' }}>Home</Link></li>
                            <li><Link to="/work" onClick={() => setMenuOpen(false)} style={{ color: '#4E3629', textDecoration: 'none' }}>Selected Works</Link></li>
                            <li><Link to="/reviews" onClick={() => setMenuOpen(false)} style={{ color: '#4E3629', textDecoration: 'none' }}>Client Reviews</Link></li>
                            <li><Link to="/about" onClick={() => setMenuOpen(false)} style={{ color: '#4E3629', textDecoration: 'none' }}>About Us</Link></li>
                            <li><Link to="/why-video" onClick={() => setMenuOpen(false)} style={{ color: '#4E3629', textDecoration: 'none' }}>Services</Link></li>
                            <li><Link to="/narrative-work" onClick={() => setMenuOpen(false)} style={{ color: '#4E3629', textDecoration: 'none' }}>Narrative Work</Link></li>
                            <li style={{ marginTop: '1rem' }}>
                                <Link to="/work-with-us" onClick={() => setMenuOpen(false)} style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    backgroundColor: '#4E3629',
                                    padding: '1rem 2rem',
                                    borderRadius: '50px',
                                    fontSize: '1.2rem',
                                    display: 'inline-block'
                                }}>
                                    Work With Us
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Inject CSS for hamburger */}
            <style>{`
                @media (max-width: 768px) {
                    .hamburger-menu {
                        display: flex !important;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
