import React, { useState, useEffect, useRef } from 'react';
import './BookingSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import BikeLoader from './BikeLoader';
import CustomSelect from './CustomSelect';
import CustomDatePicker from './CustomDatePicker';

const BookingSection = () => {
    // API base: set VITE_API_URL=http://localhost:4000 in project root for dev
    const API_BASE = import.meta.env.VITE_API_URL || '';
    const [passengers, setPassengers] = useState(1);
    const [kit, setKit] = useState(true);

    // Location State
    const [location, setLocation] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isLocating, setIsLocating] = useState(false);

    // Dropdown & Date State (Controlled)
    const [timeSlot, setTimeSlot] = useState("Morning Snan (4 AM - 8 AM)");
    const [destinationGhat, setDestinationGhat] = useState("Triveni Sangam (Main)");
    const [bookingDate, setBookingDate] = useState("2026-01-13"); // Default to Paush Purnima

    // Processing & Ticket State
    const [isProcessing, setIsProcessing] = useState(false);
    const [showTicket, setShowTicket] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [bookingInProgressId, setBookingInProgressId] = useState(null);
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const wrapperRef = useRef(null);

    const basePrice = 150;
    const kitPrice = 50;
    const total = (basePrice * passengers) + (kit ? (kitPrice * passengers) : 0);

    const commonLocations = [
        "Civil Lines, Prayagraj",
        "Prayagraj Junction Railway Station",
        "Allahabad University",
        "Naini Bridge",
        "Arail Ghat",
        "Phaphamau Bridge",
        "Zero Road Bus Stand",
        "Bamrauli Airport",
        "High Court, Prayagraj",
        "Company Bagh"
    ];

    const timeOptions = [
        "Morning Snan (4 AM - 8 AM)",
        "Day Darshan (9 AM - 5 PM)",
        "Evening Aarti (6 PM - 9 PM)"
    ];

    const ghatOptions = [
        "Triveni Sangam (Main)",
        "VIP Ghat",
        "Qila Ghat",
        "Saraswati Ghat",
        "Arail Ghat",
        "Daraganj Ghat",
        "Phaphamau Ghat",
        "Ram Ghat",
        "Kali Ghat",
        "Gau Ghat",
        "Balua Ghat"
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleLocationChange = (e) => {
        const val = e.target.value;
        setLocation(val);
        if (val.length > 0) {
            const filtered = commonLocations.filter(loc =>
                loc.toLowerCase().includes(val.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectSuggestion = (loc) => {
        setLocation(loc);
        setShowSuggestions(false);
    };

    const handleUseLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported");
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setTimeout(() => {
                    setLocation("Detected: Civil Lines, Near PVR (GPS)");
                    setIsLocating(false);
                }, 1000);
            },
            (error) => {
                alert("Unable to retrieve location");
                setIsLocating(false);
            }
        );
    };

    const loadRazorpayScript = () => new Promise((resolve, reject) => {
        if (window.Razorpay) return resolve(window.Razorpay);
        const s = document.createElement('script');
        s.src = 'https://checkout.razorpay.com/v1/checkout.js';
        s.onload = () => resolve(window.Razorpay);
        s.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
        document.body.appendChild(s);
    });

    const pollBookingStatus = async (id, attempts = 15, interval = 2000) => {
        for (let i = 0; i < attempts; i++) {
            try {
                const res = await fetch(`${API_BASE}/api/bookings/${id}`);
                if (!res.ok) throw new Error('failed');
                const data = await res.json();
                const booking = data.booking;
                if (booking && booking.status === 'confirmed') {
                    return booking;
                }
            } catch (e) {
                // ignore and retry
            }
            await new Promise(r => setTimeout(r, interval));
        }
        return null;
    };

    const handleBooking = async () => {
        // Basic client-side validation
        setEmailError('');
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }
        if (!location) {
            alert('Please enter a pickup location');
            return;
        }

        setIsProcessing(true);

        try {
            const payload = {
                pickupLocation: { text: location },
                destinationGhat,
                timeSlot,
                date: bookingDate,
                passengers,
                hygieneKit: kit,
                email
            };

            const resp = await fetch(`${API_BASE}/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                throw new Error(err.error || 'Booking creation failed');
            }

            const body = await resp.json();
            const { bookingId, order, razorpayKey } = body;
            setBookingInProgressId(bookingId);

            // Load Razorpay
            await loadRazorpayScript();

            const options = {
                key: razorpayKey,
                amount: order.amount,
                currency: order.currency || 'INR',
                name: 'MaghMela Express',
                description: `${passengers} Pilgrim(s)`,
                order_id: order.id,
                modal: { esc: false },
                handler: async function (response) {
                    // client side handler; final confirmation happens via webhook
                    // start polling booking status
                    const booking = await pollBookingStatus(bookingId);
                    if (booking) {
                        setConfirmedBooking(booking);
                        setShowTicket(true);
                    } else {
                        alert('Payment received but confirmation pending. Refresh admin portal in a moment.');
                    }
                    setIsProcessing(false);
                },
                prefill: { email },
                theme: { color: '#FF6F00' }
            };

            const rz = new window.Razorpay(options);
            rz.open();

        } catch (err) {
            console.error(err);
            alert(err.message || 'Booking failed');
            setIsProcessing(false);
        }
    };

    const closeTicket = () => {
        setShowTicket(false);
    };

    return (
        <section className="booking-section" id="booking-section">
            <motion.div
                className="booking-container"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.6 }}
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                {/* Visual Loader Overlay */}
                <AnimatePresence>
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100 }}
                        >
                            <BikeLoader text="Confirming your fast lane..." />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Divine Pass Ticket Overlay */}
                <AnimatePresence>
                    {showTicket && (
                        <motion.div
                            className="ticket-overlay"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <div className="divine-ticket">
                                <div className="ticket-header">
                                    <span className="om-symbol-small">🕉️</span>
                                    <h3>MaghMela Express</h3>
                                    <span className="ticket-id">{confirmedBooking ? `#MME-${String(confirmedBooking._id).slice(-6)}` : `#MME-${Math.floor(Math.random() * 9000) + 1000}`}</span>
                                </div>
                                <div className="ticket-body">
                                    <div className="ticket-row">
                                        <label>Pickup</label>
                                        <p>{(confirmedBooking && confirmedBooking.pickupLocation && confirmedBooking.pickupLocation.text) || location || "Civil Lines (Default)"}</p>
                                    </div>
                                    <div className="ticket-row">
                                        <label>Destination</label>
                                        <p className="highlight">{(confirmedBooking && confirmedBooking.destinationGhat) || destinationGhat}</p>
                                    </div>
                                    <div className="ticket-grid">
                                        <div>
                                            <label>Date</label>
                                            <p>{new Date((confirmedBooking && confirmedBooking.date) || bookingDate).toLocaleDateString('en-GB')}</p>
                                        </div>
                                        <div>
                                            <label>Passengers</label>
                                            <p>{(confirmedBooking && confirmedBooking.passengers) || passengers} Pilgrims</p>
                                        </div>
                                    </div>
                                    <div className="qr-box">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${(confirmedBooking && confirmedBooking.qrCodeData) || 'MaghMelaExpressPending'}`} alt="QR Code" />
                                        <span>Scan at Boarding Point</span>
                                    </div>
                                </div>
                                <div className="ticket-footer">
                                    <div className="status-badge">✅ Payment Successful</div>
                                    <button className="btn-download" onClick={closeTicket}>Done</button>
                                </div>
                                <div className="ticket-rip"></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="booking-header">
                    <h2>Secure Your Sacred Journey</h2>
                    <div style={{ marginTop: '10px' }}>
                        <span className="feature-pill">⚡ Instant Confirmation</span>
                        <span className="feature-pill">🛡️ 100% Refundable</span>
                        <span className="feature-pill">🧼 Sanitized Ride</span>
                    </div>
                </div>

                <div className="booking-form-grid">
                    {/* Left: Inputs */}
                    <div className="form-column">
                        <div className="form-group" ref={wrapperRef}>
                            <label className="form-label">Pickup Location</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Search landmark or station..."
                                    value={location}
                                    onChange={handleLocationChange}
                                    onFocus={() => {
                                        if (location) setShowSuggestions(true);
                                        else setSuggestions(commonLocations.slice(0, 5));
                                    }}
                                />
                                <button
                                    className="gps-btn"
                                    title="Use Current Location"
                                    onClick={handleUseLocation}
                                >
                                    {isLocating ? '⏳' : '📍'}
                                </button>
                            </div>

                            <AnimatePresence>
                                {showSuggestions && suggestions.length > 0 && (
                                    <motion.div
                                        className="suggestions-list"
                                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {suggestions.map((loc, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="suggestion-item"
                                                onClick={() => selectSuggestion(loc)}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                whileHover={{
                                                    scale: 1.02,
                                                    backgroundColor: '#FFF3E0',
                                                    x: 5,
                                                    transition: { duration: 0.1 }
                                                }}
                                            >
                                                <span className="suggestion-icon">📍</span>
                                                {loc}
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <CustomDatePicker
                                    label="Date"
                                    value={bookingDate}
                                    onChange={setBookingDate}
                                />
                            </div>
                            <div>
                                <CustomSelect
                                    label="Time"
                                    value={timeSlot}
                                    options={timeOptions}
                                    onChange={setTimeSlot}
                                    icon="🕒"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Contact Email</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-invalid={!!emailError}
                            />
                            {emailError && <div style={{ color: '#c62828', fontSize: '0.9rem', marginTop: '6px' }}>{emailError}</div>}
                        </div>

                        <div className="form-group">
                            <CustomSelect
                                label="Destination Ghat"
                                value={destinationGhat}
                                options={ghatOptions}
                                onChange={setDestinationGhat}
                                icon="🌊"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Number of Pilgrims</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                >-</motion.button>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{passengers}</span>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                                    onClick={() => setPassengers(Math.min(10, passengers + 1))}
                                >+</motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="trip-summary">
                        <h3 style={{ marginBottom: '20px', color: '#3E2723', fontFamily: 'serif' }}>Booking Summary</h3>

                        <div className="summary-row">
                            <span>Base Ride (x{passengers})</span>
                            <span>₹{basePrice * passengers}</span>
                        </div>

                        <div className="summary-row" style={{ alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={kit}
                                    onChange={(e) => setKit(e.target.checked)}
                                    style={{ width: '18px', height: '18px', accentColor: '#FF6F00' }}
                                />
                                <span>Add Hygiene Kit (x{passengers})</span>
                            </div>
                            <span>₹{kit ? kitPrice * passengers : 0}</span>
                        </div>

                        <div className="total-row">
                            <span>Total Amount</span>
                            <span>₹{total}</span>
                        </div>

                        <motion.button
                            className="btn-book-now"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleBooking}
                            disabled={isProcessing}
                        >
                            {isProcessing ? 'Processing...' : `Proceed to Pay ₹${total}`}
                        </motion.button>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '12px', color: '#8D6E63' }}>
                            🔒 Secure Payment via UPI/Card
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default BookingSection;
