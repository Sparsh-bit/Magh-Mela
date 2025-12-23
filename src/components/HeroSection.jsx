import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroSection.css';


import CustomSelect from './CustomSelect';
const HeroSection = () => {
    const scrollToBooking = () => {
        document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isTrafficVisible, setIsTrafficVisible] = useState(false);

    // Traffic Engine State
    const [selectedDestination, setSelectedDestination] = useState('Sangam Ghat');
    const [trafficStats, setTrafficStats] = useState({ car: 48, bike: 12, dist: 7.5 });

    // Real-world distances from Civil Lines, Prayagraj
    const ghatDistances = {
        'Sangam Ghat': 7.5,
        'VIP Ghat': 8.2,
        'Qila Ghat': 6.0,
        'Saraswati Ghat': 4.8,
        'Arail Ghat': 10.5,
        'Daraganj Ghat': 6.8,
        'Phaphamau Ghat': 12.0,
        'Ram Ghat': 5.5,
        'Kali Ghat': 5.2,
        'Gau Ghat': 6.5,
        'Balua Ghat': 9.0
    };

    useEffect(() => {
        // Calculate Times based on "Magh Mela Traffic Conditions"
        // Car Speed: ~10-12 km/h (Heavy Jam)
        // Bike Speed: ~30-35 km/h (Weaving)

        const dist = ghatDistances[selectedDestination];
        const carSpeed = 10; // km/h
        const bikeSpeed = 32; // km/h (Average rapid bike)

        const carTime = Math.round((dist / carSpeed) * 60); // minutes
        const bikeTime = Math.round((dist / bikeSpeed) * 60); // minutes

        setTrafficStats({
            car: carTime,
            bike: bikeTime,
            dist: dist
        });
    }, [selectedDestination]);

    useEffect(() => {
        // Paush Purnima - Jan 13, 2026
        const targetDate = new Date('2026-01-13T00:00:00');

        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section className="hero-divine">
            <motion.div
                className="hero-bg-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 1.5 }}
            >
                PRAYAGRAJ 2026
            </motion.div>

            <motion.div
                className="hero-header-light"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                variants={staggerContainer}
            >
                <motion.span className="hero-pill-light" variants={fadeInUp}>
                    Official Yatra Partner
                </motion.span>
                <motion.h1 className="hero-headline-light" variants={fadeInUp}>
                    A Soulful Journey to the <br />
                    <em>Divine Sangam</em>
                </motion.h1>
                <motion.p className="hero-subhead-light" variants={fadeInUp}>
                    Experience the spiritual vibration of Magh Mela with comfort.
                    We ensure your path to the holy dip is peaceful and traffic-free.
                </motion.p>

                {/* Countdown Timer */}
                <motion.div className="countdown-container" variants={fadeInUp}>
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <motion.div
                            key={unit}
                            className="time-box"
                            whileHover={{ scale: 1.1, borderColor: '#FF6D00' }}
                        >
                            <div className="time-value">{value < 10 ? `0${value}` : value}</div>
                            <div className="time-label">{unit}</div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.button
                    className="btn-spiritual"
                    onClick={scrollToBooking}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Book Your Pilgrimage
                </motion.button>
            </motion.div>

            <motion.div
                className="hero-grid-light"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                variants={staggerContainer}
            >
                {/* Left Card */}
                <motion.div className="hero-card-light" variants={fadeInUp}>
                    <img src="/magh-mela-aerial.jpg" alt="Vast Gathering" />
                    <div className="card-overlay-light">
                        <h3>Millions of Souls</h3>
                        <span>One Sacred Destination</span>
                    </div>
                </motion.div>

                {/* Center Card */}
                <motion.div
                    className="hero-card-light center"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                >
                    <img src="/magh-mela-aarti.jpg" alt="Divine Aarti" />
                    <div className="card-overlay-light">
                        <h3>Evening Aarti</h3>
                        <span>Witness the Light of Divinity</span>
                    </div>
                </motion.div>

                {/* Right Card */}
                <motion.div className="hero-card-light" variants={fadeInUp}>
                    <img src="/magh-mela-twilight.jpg" alt="Twilight Atmosphere" />
                    <div className="card-overlay-light">
                        <h3>Twilight Peace</h3>
                        <span>Serenity amidst the crowd</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Traffic Toggle Logic */}
            <AnimatePresence>
                {!isTrafficVisible && (
                    <motion.div
                        className="traffic-toggle-pill"
                        onClick={() => setIsTrafficVisible(true)}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="pulse-dot-small"></span>
                        <span>Check Live Traffic</span>
                    </motion.div>
                )}

                {isTrafficVisible && (
                    <motion.div
                        className="gps-floating-card"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    >
                        <button className="gps-close-btn" onClick={(e) => { e.stopPropagation(); setIsTrafficVisible(false); }}>×</button>
                        <div className="gps-header">
                            <span>Real-Time Traffic</span>
                            <div className="live-badge">
                                <span className="pulse-dot"></span> LIVE
                            </div>
                        </div>

                        {/* Destination Selector */}
                        <div className="route-selector">
                            <span className="route-icon">📍 Civil Lines ➔ </span>
                            <CustomSelect
                                className="compact"
                                value={selectedDestination}
                                options={Object.keys(ghatDistances)}
                                onChange={setSelectedDestination}
                                style={{ width: '150px' }}
                            />
                        </div>

                        <div className="time-row">
                            <div className="transport-mode">
                                <span>🚗</span> Car / Auto
                            </div>
                            <div className="time-val slow">{trafficStats.car} min</div>
                        </div>

                        <div className="time-row">
                            <div className="transport-mode">
                                <span>🏍️</span> <strong>MaghMela Express</strong>
                            </div>
                            <div className="time-val fast">
                                {/* Saving Logic */}
                                {trafficStats.bike} min
                                <span className="save-tag">Save {trafficStats.car - trafficStats.bike}m</span>
                            </div>
                        </div>

                        <div className="dist-tag">
                            Running Distance: {trafficStats.dist} km
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default HeroSection;
