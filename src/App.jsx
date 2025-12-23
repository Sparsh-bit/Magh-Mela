import React, { useState } from 'react'; // Added useState
import { AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import WhyBike from './components/WhyBike';
import BookingSection from './components/BookingSection';
import SpiritualSignificance from './components/SpiritualSignificance';
import CinematicEntry from './components/CinematicEntry'; // Import new component
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="app">
      <AnimatePresence>
        {isLoading && (
          <CinematicEntry onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Navigation (Simple Overlay) */}
          <nav style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            padding: '2rem 0',
            zIndex: 10
          }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3E2723', fontFamily: "'Playfair Display', serif", letterSpacing: '1px' }}>
                MaghMela<span style={{ color: '#E65100' }}>Express</span>
              </h2>
              <button className="glass-cta" style={{ padding: '0.6rem 1.5rem', border: 'none', background: '#E65100', borderRadius: '50px', cursor: 'pointer' }} onClick={() => document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' })}>
                <span style={{ color: 'white', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Book Now</span>
              </button>
            </div>
          </nav>

          <main>
            <HeroSection />
            <HowItWorks />
            <WhyBike />
            {/* KitInclusion removed as per request */}
            <BookingSection />
          </main>

          <footer>
            <SpiritualSignificance />
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
