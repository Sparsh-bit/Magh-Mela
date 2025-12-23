import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomDatePicker.css';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const CustomDatePicker = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date()); // For navigation
    const containerRef = useRef(null);

    // Initialize with selected value if exists
    useEffect(() => {
        if (value) {
            setCurrentDate(new Date(value));
        }
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const blanks = Array(firstDay).fill(null);
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return [...blanks, ...days];
    };

    const handleDateClick = (day) => {
        if (!day) return;
        const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        // Format YYYY-MM-DD
        const formatted = selected.toISOString().split('T')[0];
        onChange(formatted);
        setIsOpen(false);
    };

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    // Format display value
    const displayValue = value ? new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date';

    return (
        <div className="custom-date-container" ref={containerRef}>
            {label && <label className="custom-date-label">{label}</label>}

            <motion.div
                className={`custom-date-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ borderColor: '#FFB74D', backgroundColor: '#FFF8E1' }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="date-value-wrapper">
                    <span className="date-icon">📅</span>
                    <span className="date-value-text">{displayValue}</span>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="custom-calendar-popup"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="calendar-header">
                            <button onClick={() => changeMonth(-1)}>&lt;</button>
                            <span>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                            <button onClick={() => changeMonth(1)}>&gt;</button>
                        </div>

                        {/* Days Header */}
                        <div className="calendar-grid-header">
                            {daysOfWeek.map(d => <span key={d}>{d}</span>)}
                        </div>

                        {/* Days Grid */}
                        <div className="calendar-grid">
                            {renderCalendar().map((day, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`calendar-day ${!day ? 'empty' : ''} ${value &&
                                            new Date(value).getDate() === day &&
                                            new Date(value).getMonth() === currentDate.getMonth() &&
                                            new Date(value).getFullYear() === currentDate.getFullYear()
                                            ? 'selected' : ''
                                        }`}
                                    onClick={() => handleDateClick(day)}
                                    whileHover={day ? { scale: 1.1, backgroundColor: '#FFF3E0', color: '#E65100' } : {}}
                                >
                                    {day}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomDatePicker;
