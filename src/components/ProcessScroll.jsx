import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ProcessScroll = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smooth out the progress
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const steps = [
        {
            title: "Discovery",
            subtitle: "The Spark",
            description: "We dive deep into your mission. Through strategy sessions and audience analysis, we find the core truth that will resonate most with your community.",
            icon: "💡",
            color: "#D4C5A9"
        },
        {
            title: "Production",
            subtitle: "The Capture",
            description: "Our diverse, unobtrusive crews capture authentic moments. We focus on cinematic beauty and human connection, ensuring your subjects feel honored, not exploited.",
            icon: "🎥",
            color: "#C7CEEA" // Pastel Blue-ish
        },
        {
            title: "Post-Production",
            subtitle: "The Craft",
            description: "This is where the story is sculpted. We weave interviews, visuals, and sound into an emotional journey. Multiple feedback rounds ensure it aligns with your voice.",
            icon: "🎞️",
            color: "#FFB7B2" // Pastel Red
        },
        {
            title: "Impact",
            subtitle: "The Shine",
            description: "We don't just hand over a file. We help you launch. From social media micro-cuts to gala premieres, we ensure your story moves people to action.",
            icon: "✨",
            color: "#B5EAD7" // Pastel Green
        }
    ];

    return (
        <div ref={containerRef} style={{ position: 'relative', padding: '4rem 0' }}>

            {/* The "Thread of Light" Beam */}
            <div style={{
                position: 'absolute',
                left: '50px', // Align with icons
                top: '50px',
                bottom: '100px',
                width: '4px',
                background: 'rgba(212, 197, 169, 0.2)', // Faint background track
                borderRadius: '2px',
                zIndex: 0
            }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        transformOrigin: "top",
                        scaleY: scaleY, // The beam grows with scroll
                        height: '100%',
                        background: 'linear-gradient(180deg, #D4C5A9 0%, #FFD700 50%, #D4C5A9 100%)', // Gold gradient
                        boxShadow: '0 0 15px rgba(212, 197, 169, 0.8)', // Glow effect
                        borderRadius: '2px'
                    }}
                />
            </div>

            {/* Process Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                {steps.map((step, index) => (
                    <StepItem key={index} step={step} index={index} />
                ))}
            </div>

        </div>
    );
};

const StepItem = ({ step, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '4rem',
                position: 'relative',
                zIndex: 1
            }}
        >
            {/* Icon / Node */}
            <div style={{
                flexShrink: 0,
                width: '100px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'white',
                        border: `4px solid ${step.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        cursor: 'default'
                    }}
                >
                    {step.icon}
                </motion.div>
            </div>

            {/* Content Date/Text */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                padding: '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                maxWidth: '600px'
            }}>
                <h4 style={{
                    margin: 0,
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    letterSpacing: '2px',
                    color: '#888',
                    marginBottom: '0.5rem'
                }}>
                    Phase 0{index + 1}: {step.subtitle}
                </h4>
                <h3 style={{
                    margin: '0 0 1rem 0',
                    fontSize: '2rem',
                    fontFamily: '"Georgia", serif',
                    color: '#4E3629'
                }}>
                    {step.title}
                </h3>
                <p style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    color: '#555'
                }}>
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
};

export default ProcessScroll;
