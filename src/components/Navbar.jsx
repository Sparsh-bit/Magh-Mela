import React from 'react';
import './Navbar.css';

const Navbar = () => {
    const scrollToBooking = () => {
        const section = document.getElementById('booking-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    MaghMela<span>Express</span>
                </div>
                <div className="navbar-actions">
                    <button className="navbar-btn" onClick={scrollToBooking}>
                        Book Now
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
