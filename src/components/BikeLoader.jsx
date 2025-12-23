import React from 'react';
import { motion } from 'framer-motion';
import './BikeLoader.css';

const BikeLoader = ({ text = "Processing..." }) => {
    return (
        <div className="bike-loader-overlay">
            <div className="bike-loader-container">
                <motion.div
                    className="bike-visual-loop"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                >
                    <span className="loader-bike-icon">🏍️</span>
                    <div className="loader-speed-lines"></div>
                </motion.div>

                <motion.p
                    className="loader-text"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    {text}
                </motion.p>
            </div>
        </div>
    );
};

export default BikeLoader;
