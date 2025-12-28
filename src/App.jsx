import React, { useState } from 'react'; // Added useState
import { AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import WhyBike from './components/WhyBike';
import BookingSection from './components/BookingSection';
import SpiritualSignificance from './components/SpiritualSignificance';
import CinematicEntry from './components/CinematicEntry';
import Navbar from './components/Navbar';
import './index.css';
import './App.css';

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
          <Navbar />

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
