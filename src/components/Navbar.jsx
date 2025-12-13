import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
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

    const navbarClass = `navbar ${scrolled || !isMapPage ? 'scrolled' : ''}`;

    // Item Hover Component
    const MenuItem = ({ to, children, onClick }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <motion.li
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{ width: '100%', textAlign: 'center' }}
            >
                <Link
                    to={to}
                    onClick={onClick}
                    style={{
                        display: 'block',
                        padding: '1rem 2rem',
                        color: isHovered ? 'white' : '#4E3629',
                        backgroundColor: isHovered ? '#4E3629' : 'transparent',
                        textDecoration: 'none',
                        fontSize: '1.5rem',
                        fontFamily: '"Georgia", serif',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        borderRadius: '0px' // Clean blocks
                    }}
                >
                    {children}
                </Link>
            </motion.li>
        );
    };

    return (
        <nav className={navbarClass} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 9000,
            transition: 'all 0.3s',
            background: (scrolled || !isMapPage || menuOpen) ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
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
                zIndex: 9002,
                cursor: 'pointer'
            }}>
                <img src="/transparent_logo.png" alt="Mind Light Films" style={{ height: '40px', width: 'auto' }} />
            </Link>

            {/* Hamburger Button (Always Visible) */}
            <div
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    width: '2rem',
                    height: '2rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    zIndex: 9002
                }}
            >
                <motion.div
                    animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    style={{ width: '2rem', height: '0.25rem', background: '#4E3629', borderRadius: '10px' }}
                />
                <motion.div
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    style={{ width: '2rem', height: '0.25rem', background: '#4E3629', borderRadius: '10px' }}
                />
                <motion.div
                    animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    style={{ width: '2rem', height: '0.25rem', background: '#4E3629', borderRadius: '10px' }}
                />
            </div>

            {/* Slide-out Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        style={{
                            position: 'absolute',
                            top: '100%', // Position exactly underneath the navbar
                            left: 0,
                            width: '100%',
                            background: '#fcfcfc',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            zIndex: 9001,
                            overflow: 'hidden',
                            borderTop: '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        <ul style={{
                            listStyle: 'none',
                            padding: '2rem 0',
                            margin: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <MenuItem to="/" onClick={() => setMenuOpen(false)}>Home</MenuItem>
                            <MenuItem to="/work" onClick={() => setMenuOpen(false)}>Selected Works</MenuItem>
                            <MenuItem to="/reviews" onClick={() => setMenuOpen(false)}>Client Reviews</MenuItem>
                            <MenuItem to="/about" onClick={() => setMenuOpen(false)}>About Us</MenuItem>
                            <MenuItem to="/why-video" onClick={() => setMenuOpen(false)}>Services</MenuItem>
                            <MenuItem to="/narrative-work" onClick={() => setMenuOpen(false)}>Narrative Work</MenuItem>

                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                style={{ marginTop: '1rem' }}
                            >
                                <Link to="/work-with-us" onClick={() => setMenuOpen(false)} style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    backgroundColor: '#4E3629',
                                    padding: '1rem 2.5rem',
                                    borderRadius: '50px',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    display: 'inline-block',
                                    fontFamily: '"Georgia", serif',
                                }}>
                                    Work With Us
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
