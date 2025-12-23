import React from 'react';
import './HowItWorks.css';
import { motion } from 'framer-motion';

const steps = [
    {
        id: 1,
        title: "Book Your Ride",
        desc: "Choose your pickup location and preferred ghat.",
        icon: "📍"
    },
    {
        id: 2,
        title: "Ride with Ease",
        desc: "Our verified Sewaks navigate traffic for you.",
        icon: "🛵"
    },
    {
        id: 3,
        title: "Holy Dip",
        desc: "Reach the Sangam fresh and ready for Snan.",
        icon: "🙏"
    },
    {
        id: 4,
        title: "Return Safely",
        desc: "We wait or return to pick you up as scheduled.",
        icon: "🏡"
    }
];

const HowItWorks = () => {
    return (
        <section className="how-it-works">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ amount: 0.3 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '1rem', color: '#3E2723' }}
                    >
                        Your Path to Peace
                    </h2>
                    <p style={{ color: '#5D4037', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
                        A simple, structured journey to the holy waters.
                    </p>
                </motion.div>

                <div className="process-grid">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            className="process-card-light"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            viewport={{ amount: 0.3 }}
                            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                        >
                            <span className="step-number-gold">{step.id}</span>
                            <div className="process-icon-box-light">{step.icon}</div>
                            <h3 className="process-title-light">{step.title}</h3>
                            <p className="process-desc-light">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
