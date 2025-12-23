import React from 'react';
import './WhyBike.css';
import { motion } from 'framer-motion';

const WhyBike = () => {
    return (
        <div>
            <section className="why-bike-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>Why Pilgrim with Us?</h2>
                        <p>Designed for devotion, speed, and safety.</p>
                    </motion.div>

                    <div className="bento-grid">
                        <motion.div
                            className="bento-card-light"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ amount: 0.3 }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <span className="icon-large">⚡</span>
                            <h3 className="benefit-title">Divine Speed</h3>
                            <p className="benefit-desc">Bypass the earthly chaos. Our bikes use dedicated lanes to reach the Sangam in minutes.</p>
                        </motion.div>
                        <motion.div
                            className="bento-card-light"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: 0.3 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <span className="icon-large">📍</span>
                            <h3 className="benefit-title">Doorstep to Ghat</h3>
                            <p className="benefit-desc">We drop you closer to the holy waters than any other vehicle is permitted.</p>
                        </motion.div>
                        <motion.div
                            className="bento-card-light"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ amount: 0.3 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <span className="icon-large">🛡️</span>
                            <h3 className="benefit-title">Verified Sewaks</h3>
                            <p className="benefit-desc">Our riders are verified 'Sewaks' trained to help you navigate the spiritual crowd.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyBike;
