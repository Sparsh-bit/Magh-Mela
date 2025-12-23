import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomSelect.css';

const CustomSelect = ({ options, value, onChange, label, icon, className, style }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={`custom-select-container ${className || ''}`} style={style} ref={containerRef}>
            {label && <label className="custom-select-label">{label}</label>}

            <motion.div
                className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ borderColor: '#FFB74D', backgroundColor: '#FFF8E1' }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="select-value-wrapper">
                    {icon && <span className="select-icon">{icon}</span>}
                    <span className="select-value-text">{value}</span>
                </div>
                <motion.span
                    className="arrow-icon"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                >
                    ▼
                </motion.span>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="custom-options-list"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {options.map((option, idx) => (
                            <motion.div
                                key={idx}
                                className={`custom-option ${option === value ? 'selected' : ''}`}
                                onClick={() => handleSelect(option)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{
                                    backgroundColor: '#FFF3E0',
                                    x: 5,
                                    color: '#E65100'
                                }}
                            >
                                {option}
                                {option === value && <span className="check-mark">✓</span>}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;
