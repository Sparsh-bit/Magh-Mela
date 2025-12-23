import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CinematicEntry.css';

const CinematicEntry = ({ onComplete }) => {
    const [textState, setTextState] = useState(0);

    useEffect(() => {
        // Fast-Paced Timeline (Total ~2.2s)
        // 0.0s: Problem
        // 0.8s: Action (Bike Zoom)
        // 1.5s: Solution
        // 2.5s: Main App

        const t1 = setTimeout(() => setTextState(1), 800);
        const t2 = setTimeout(() => setTextState(2), 1500);
        const t3 = setTimeout(() => onComplete(), 2500);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onComplete]);

    return (
        <motion.div
            className="cinematic-wrapper-compact"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
            <div className="compact-stage">

                {/* Traffic - Exits quickly */}
                <AnimatePresence>
                    {textState === 0 && (
                        <motion.div
                            className="traffic-compact"
                            initial={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0, transition: { duration: 0.3 } }}
                        >
                            <span className="icon-sm">🚗</span>
                            <span className="icon-sm">🚌</span>
                            <span className="sub-text-sm">Stuck?</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bike - Enters smoothly */}
                {textState >= 1 && (
                    <motion.div
                        className="bike-compact"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                        <span className="icon-lg">🏍️</span>
                    </motion.div>
                )}
            </div>

            <div className="text-compact-container">
                <AnimatePresence mode="wait">
                    {textState === 0 && (
                        <motion.h2
                            key="t1"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0, transition: { duration: 0.2 } }}
                            className="text-problem"
                        >
                            Why wait in traffic?
                        </motion.h2>
                    )}

                    {textState === 1 && (
                        <motion.h2
                            key="t2"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            className="text-action"
                        >
                            GO FASTER.
                        </motion.h2>
                    )}

                    {textState === 2 && (
                        <motion.div
                            key="t3"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-solution"
                        >
                            <span className="brand-name">MaghMela Express</span>
                            <span className="badge-time">⚡ 12 Mins</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default CinematicEntry;
