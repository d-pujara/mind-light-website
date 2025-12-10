import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map view updates
const MapController = ({ nonprofits }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !nonprofits || nonprofits.length === 0) return;

        const timer = setTimeout(() => {
            try {
                // Filter out invalid coordinates
                const validNonprofits = nonprofits.filter(np =>
                    np.coordinates &&
                    Array.isArray(np.coordinates) &&
                    np.coordinates.length === 2 &&
                    typeof np.coordinates[0] === 'number' &&
                    typeof np.coordinates[1] === 'number'
                );

                if (validNonprofits.length === 0) return;

                // Calculate bounds
                const bounds = L.latLngBounds(validNonprofits.map(np => np.coordinates));

                // Get the current bounds
                const southWest = bounds.getSouthWest();
                const northEast = bounds.getNorthEast();

                // Calculate the width of the bounds
                const latDiff = northEast.lat - southWest.lat;
                const lngDiff = northEast.lng - southWest.lng;

                // Extend the bounds
                // If single point (diff is 0), add a default buffer
                const latBuffer = latDiff === 0 ? 0.05 : latDiff * 0.5;
                const lngBuffer = lngDiff === 0 ? 0.05 : lngDiff * 1.5;

                const newNorthEast = L.latLng(
                    northEast.lat + latBuffer,
                    northEast.lng + lngBuffer
                );

                const newSouthWest = L.latLng(
                    southWest.lat - latBuffer,
                    southWest.lng - (lngDiff === 0 ? 0.05 : lngDiff * 0.5)
                );

                const newBounds = L.latLngBounds(newSouthWest, newNorthEast);

                map.fitBounds(newBounds, {
                    padding: [50, 50],
                    animate: true,
                    duration: 1
                });
            } catch (error) {
                console.error("Error updating map bounds:", error);
            }
        }, 500); // Add delay to ensure map is ready

        return () => clearTimeout(timer);
    }, [nonprofits, map]);

    return null;
};



// Component to track zoom level
const ZoomTracker = ({ setZoom }) => {
    const map = useMap();
    useEffect(() => {
        const handleZoom = () => {
            setZoom(map.getZoom());
        };
        map.on('zoom', handleZoom);
        // Set initial zoom
        setZoom(map.getZoom());
        return () => {
            map.off('zoom', handleZoom);
        };
    }, [map, setZoom]);
    return null;
};

// Pastel Color Mapping
const CATEGORY_COLORS = {
    "All": "#FDFD96",              // Pastel Yellow
    "Community Services": "#FFB7B2", // Pastel Red/Coral
    "Education": "#B5EAD7",         // Pastel Mint Green
    "Community Engagement": "#C7CEEA", // Pastel Purple/Blue
    "Youth Mentorship": "#E2F0CB",   // Pastel Lime
    "Senior Services": "#AEC6CF",    // Pastel Blue (User Requested)
    "default": "#E0E0E0"
};

const MapView = ({ nonprofits = [] }) => {
    const navigate = useNavigate();
    const [hoveredClient, setHoveredClient] = useState(null);
    const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
    const [selectedClient, setSelectedClient] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [zoom, setZoom] = useState(11);
    const [selectedCategory, setSelectedCategory] = useState("All"); // Filter state

    const hoverTimeoutRef = React.useRef(null);
    const mapRef = React.useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Clean Map Style (No Labels)
    const mapStyle = "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";

    const getMarkerSize = (z) => {
        const baseSize = 80;
        const baseZoom = 11;
        // Increased growth rate slightly (1.3 -> 1.4) and max size (250 -> 300)
        // This makes the "bubble increase properly as you get closer"
        return Math.max(30, Math.min(300, baseSize * Math.pow(1.4, z - baseZoom)));
    };

    const handleMarkerVerify = (np, e) => {
        if (!isMobile) {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            setHoveredClient(np);

            // Calculate dynamic offset based on current marker size
            const currentMarkerSize = getMarkerSize(zoom);
            const radius = currentMarkerSize / 2;
            const safetyGap = 20;

            const x = e.containerPoint.x + radius + safetyGap;
            const y = e.containerPoint.y - (radius + safetyGap);

            setPreviewPosition({ x, y });
        }
    };

    const handleMarkerLeave = () => {
        if (!isMobile) {
            hoverTimeoutRef.current = setTimeout(() => {
                setHoveredClient(null);
            }, 300);
        }
    };

    const handleCardEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };

    const handleCardLeave = () => {
        handleMarkerLeave();
    };

    // Render loop also needs size
    const currentSize = getMarkerSize(zoom);
    const anchor = currentSize / 2;

    // Scale card slightly with zoom
    const cardScale = Math.min(1.2, 1 + (zoom - 11) * 0.1);

    // Filter Logic
    const filteredNonprofits = selectedCategory === "All"
        ? nonprofits
        : nonprofits.filter(np => np.category === selectedCategory);

    // Get Unique Categories including 'All'
    const categories = ["All", ...new Set(nonprofits.map(np => np.category))];

    return (
        <div className="map-container" style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <div className="map-logo-overlay">
                <Link to="/">
                    <img src="/transparent_logo.png" alt="Mind Light Films" style={{ cursor: 'pointer' }} />
                </Link>
            </div>

            <MapContainer
                center={[34.0522, -118.2437]}
                zoom={11}
                scrollWheelZoom={true} // Enabled natural scrolling zoom as requested
                style={{ height: "100%", width: "100%" }}
                onClick={() => setSelectedClient(null)}
                ref={mapRef}
                zoomControl={false} // Clean map, we can add custom control if needed or rely on scroll
            >
                <ZoomTracker setZoom={setZoom} />
                <MapController nonprofits={filteredNonprofits} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={mapStyle}
                />
                {filteredNonprofits && filteredNonprofits.map((np) => {
                    if (!np || !np.coordinates) return null;

                    const color = CATEGORY_COLORS[np.category] || CATEGORY_COLORS["default"];

                    const customIcon = L.divIcon({
                        className: 'custom-marker',
                        html: `<div style="
                            width: ${currentSize}px; 
                            height: ${currentSize}px; 
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            overflow: hidden;
                            transition: width 0.2s, height 0.2s; 
                            border-radius: 50%;
                            border: 4px solid ${color}; /* Color Coded Border */
                            background: white;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                        ">
                            <img src="${np.logoUrl}" style="
                                width: 85%; 
                                height: 85%; 
                                object-fit: contain; 
                                display: block;
                                /* Added padding essentially by reducing width/height */
                            " />
                        </div>`,
                        iconSize: [currentSize, currentSize],
                        iconAnchor: [anchor, anchor],
                        popupAnchor: [0, -anchor]
                    });

                    return (
                        <Marker
                            key={np.id}
                            position={np.coordinates}
                            icon={customIcon}
                            eventHandlers={{
                                click: () => {
                                    if (isMobile) {
                                        setSelectedClient(np);
                                    } else {
                                        navigate(`/nonprofit/${np.id}`);
                                    }
                                },
                                mouseover: (e) => handleMarkerVerify(np, e),
                                mouseout: handleMarkerLeave
                            }}
                        />
                    );
                })}
            </MapContainer>

            {/* Desktop Hover Preview - Dynamic Position */}
            <AnimatePresence>
                {hoveredClient && !isMobile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 * cardScale }}
                        animate={{ opacity: 1, scale: cardScale }}
                        exit={{ opacity: 0, scale: 0.95 * cardScale }}
                        transition={{ duration: 0.2 }} // Fast fade in
                        className="preview-card"
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                        onClick={() => navigate(`/nonprofit/${hoveredClient.id}`)}
                        style={{
                            position: 'absolute',
                            top: `${previewPosition.y}px`,
                            left: `${previewPosition.x}px`,
                            zIndex: 10000,
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(10px)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                            width: '350px',
                            pointerEvents: 'auto',
                            cursor: 'pointer',
                            color: '#1a1a1a',
                            transformOrigin: 'top left', // Scale from the anchor point
                            transform: previewPosition.x > window.innerWidth - 300 ? 'translateX(-100%)' : 'none',
                            marginLeft: previewPosition.x > window.innerWidth - 300 ? '-20px' : '0',
                            borderLeft: `6px solid ${CATEGORY_COLORS[hoveredClient.category] || '#E0E0E0'}` // Add accent bar to card
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <span style={{
                                fontSize: '0.7rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                background: CATEGORY_COLORS[hoveredClient.category] || '#E0E0E0', // Use color here too
                                color: '#1a1a1a',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>
                                {hoveredClient.category}
                            </span>
                            {hoveredClient.foundedYear && (
                                <span style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
                                    Est. {hoveredClient.foundedYear}
                                </span>
                            )}
                        </div>

                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontFamily: '"Georgia", serif' }}>{hoveredClient.name}</h3>

                        {hoveredClient.executiveDirector && hoveredClient.executiveDirector.name && (
                            <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
                                <strong>Exec. Director:</strong> {hoveredClient.executiveDirector.name}
                            </div>
                        )}

                        <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', lineHeight: '1.5', color: '#444' }}>
                            {hoveredClient.description.length > 120
                                ? hoveredClient.description.substring(0, 120) + '...'
                                : hoveredClient.description}
                        </p>

                        {/* Video Thumbnail Logic */}
                        <div style={{ marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden', height: '120px', background: '#000', position: 'relative' }}>
                            {hoveredClient.videoUrl ? (
                                <img
                                    src={hoveredClient.videoUrl.includes('youtube')
                                        ? `https://img.youtube.com/vi/${hoveredClient.videoUrl.split('v=')[1]?.split('&')[0]}/mqdefault.jpg`
                                        : hoveredClient.logoUrl // Fallback if not youtube
                                    }
                                    alt="Video Preview"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' }}>
                                    No Video Available
                                </div>
                            )}
                            {/* Play Icon Overlay */}
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', background: 'rgba(0,0,0,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '0', height: '0', borderLeft: '12px solid white', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', marginLeft: '4px' }} />
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                            {hoveredClient.websiteUrl && (
                                <a
                                    href={hoveredClient.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        padding: '0.6rem',
                                        background: '#333',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                        transition: 'background 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    Website
                                </a>
                            )}

                            <a
                                href={hoveredClient.donationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    padding: '0.6rem',
                                    background: '#D4C5A9',
                                    color: '#1a1a1a',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    transition: 'background 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#c4b599'}
                                onMouseLeave={(e) => e.target.style.background = '#D4C5A9'}
                                onClick={(e) => e.stopPropagation()}
                            >
                                Donate
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Side Info Panel With Filter */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="map-sidebar"
            >
                <div>
                    <h2>A Home for Nonprofits</h2>
                    <p>
                        Welcome to our constellation of community heroes. Each icon on this map represents a nonprofit whose story we’ve had the privilege to tell. Click to watch their films, discover their missions, and see how you can help keep their lights burning bright.
                    </p>
                </div>
            </motion.div>

            {/* Admin Link */}
            <div
                onClick={() => navigate('/admin')}
                style={{
                    position: 'fixed',
                    bottom: '1rem',
                    right: '1rem', // Moved to right to make room for legend
                    color: 'rgba(0,0,0,0.3)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
            >
                Admin
            </div>

            {/* Category Color Key (Legend) */}
            <div className="map-legend">
                {Object.entries(CATEGORY_COLORS).filter(([cat]) => cat !== 'default').map(([category, color]) => (
                    <motion.div
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`legend-item ${selectedCategory === category ? 'active' : ''}`}
                        style={{ background: color }}
                    >
                        <span>{category}</span>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
                .map-sidebar {
                    position: fixed;
                    top: 8rem;
                    left: 3rem;
                    width: clamp(260px, 20vw, 320px);
                    z-index: 1000;
                    pointer-events: auto;
                }
                .map-sidebar > div {
                    background: #D4C5A9;
                    padding: clamp(1.5rem, 2vw, 2.5rem);
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }
                .map-sidebar h2 {
                    margin: 0 0 1rem 0;
                    font-family: "Georgia", serif;
                    font-size: clamp(1.5rem, 2.5vw, 2rem);
                    line-height: 1.1;
                    color: #4E3629;
                }
                .map-sidebar p {
                    margin: 0;
                    font-size: clamp(0.9rem, 1vw, 1.1rem);
                    line-height: 1.6;
                    color: #4E3629;
                }

                .map-legend {
                    position: fixed;
                    top: 50%;
                    right: 3rem; /* Aligned to right */
                    transform: translateY(-50%); /* Centered vertically */
                    z-index: 1000;
                    display: flex;
                    flex-direction: column; /* Vertical stack */
                    align-items: flex-end; /* Right align text/pills */
                    gap: clamp(0.8rem, 1vw, 1.2rem);
                    pointer-events: none;
                    width: max-content;
                    max-width: 200px;
                }
                .legend-item {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end; /* Right align content inside */
                    gap: 0.8rem;
                    padding: clamp(0.6rem, 0.8vw, 0.8rem) clamp(1.2rem, 1.5vw, 1.5rem);
                    border-radius: 50px;
                    pointer-events: auto;
                    min-width: unset; /* Let content define width */
                    width: 100%; /* Or fit content */
                    cursor: pointer;
                    opacity: 0.7; /* Slightly more opaque by default */
                    border: 2px solid rgba(255,255,255,0.4);
                    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                    transition: all 0.2s;
                    background: rgba(255, 255, 255, 0.8); /* Fallback */
                }
                .legend-item.active {
                    opacity: 1;
                    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
                    border: 3px solid #4E3629;
                    transform: scale(1.05); /* Pop out */
                }
                .legend-item span {
                    color: #4E3629;
                    font-weight: bold;
                    font-size: clamp(0.8rem, 0.9vw, 1rem); /* Slightly smaller font for stack */
                    font-family: "Georgia", serif;
                    white-space: nowrap;
                    text-align: right;
                }

                /* Laptop / Small Desktop Tweaks */
                @media (max-width: 1400px) {
                    .map-sidebar {
                        top: 7rem;
                        left: 2rem;
                    }
                    .map-legend {
                        right: 1.5rem; /* Pull in slightly */
                    }
                }
                @media (max-width: 1024px) {
                     /* Tablet styling handled by isMobile usually, but ensures clean degradation */
                     .map-sidebar { display: none; } /* Hide sidebar on tablets to show map? Or make smaller */
                     .map-legend { display: none; } /* Mobile/Tablet has drawer */
                }
            `}</style>

            {/* Mobile Bottom Drawer */}
            <AnimatePresence>
                {selectedClient && isMobile && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedClient(null)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.5)',
                                zIndex: 1001
                            }}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bottom-drawer"
                            style={{
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: '#1a1a1a',
                                borderTopLeftRadius: '20px',
                                borderTopRightRadius: '20px',
                                padding: '1.5rem',
                                zIndex: 1002,
                                color: 'white'
                            }}
                        >
                            <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', margin: '0 auto 1rem auto' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <img src={selectedClient.logoUrl} alt={selectedClient.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{selectedClient.name}</h3>
                                    <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>{selectedClient.location}</p>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem', opacity: 0.9 }}>
                                {selectedClient.description.substring(0, 100)}...
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => navigate(`/nonprofit/${selectedClient.id}`)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: 'transparent',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        fontWeight: 'bold',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Profile
                                </button>
                                <a
                                    href={selectedClient.donationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: '#D4C5A9',
                                        color: '#1a1a1a',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        borderRadius: '12px',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    Donate
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MapView;
