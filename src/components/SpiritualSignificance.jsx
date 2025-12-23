import React from 'react';
import './SpiritualSignificance.css';
import { motion } from 'framer-motion';

const SpiritualSignificance = () => {
    return (
        <section className="spiritual-significance-section">
            <motion.div
                className="significance-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ amount: 0.3 }}
            >
                <h2>The Merit of Magha</h2>
                <p>Plan your journey around the most auspicious dates of the 2025 Kalpwas.</p>
            </motion.div>

            <div className="dates-grid">
                {/* Paush Purnima */}
                <motion.div
                    className="date-card"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ amount: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="date-header">
                        <span className="date-display">Jan 13, 2025</span>
                        <span className="snan-tag">Paush Purnima</span>
                    </div>
                    <p className="snan-desc">
                        The beginning of the Kalpwas. Taking a dip on this full moon day washes away sins and grants moksha.
                    </p>
                </motion.div>

                {/* Mauni Amavasya (Highlight) */}
                <motion.div
                    className="date-card highlight"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ amount: 0.3 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(230, 81, 0, 0.4)" }}
                >
                    <div className="date-header">
                        <span className="date-display">Jan 29, 2025</span>
                        <span className="snan-tag">Mauni Amavasya</span>
                    </div>
                    <p className="snan-desc">
                        The most significant Royal Bath. Silence is observed, and the water is believed to turn into Amrit (Nectar).
                    </p>
                </motion.div>

                {/* Basant Panchami */}
                <motion.div
                    className="date-card"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ amount: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="date-header">
                        <span className="date-display">Feb 02, 2025</span>
                        <span className="snan-tag">Basant Panchami</span>
                    </div>
                    <p className="snan-desc">
                        The arrival of Spring. Devotees dress in yellow and worship Goddess Saraswati for wisdom.
                    </p>
                </motion.div>

                {/* Maghi Purnima */}
                <motion.div
                    className="date-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ amount: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="date-header">
                        <span className="date-display">Feb 12, 2025</span>
                        <span className="snan-tag">Maghi Purnima</span>
                    </div>
                    <p className="snan-desc">
                        The conclusion of the Kalpwas. It is believed that Gandharvas and angels descend to bathe in the Sangam.
                    </p>
                </motion.div>
            </div>

            <div className="quote-box">
                <motion.p
                    className="quote-text"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ amount: 0.3 }}
                >
                    "Just as the sun dispels darkness, a dip in the Sangam during Magh dispels the darkness of ignorance."
                </motion.p>
                <div style={{ marginTop: '20px', color: '#E65100', fontWeight: 'bold' }}>— Padma Purana</div>
            </div>
        </section>
    );
};

export default SpiritualSignificance;
