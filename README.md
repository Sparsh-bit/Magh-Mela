# MaghMela Express 🚲🙏

A premium, spiritually themed landing page and booking platform for the Magh Mela 2025 event in Prayagraj. Designed with a "Divine Light" aesthetic to resonate with pilgrims while providing industry-level utility.

## ✨ Key Features

### 🎨 **Divine Light Theme**
- **Aesthetic**: Warm Creams, Saffron Oranges, and Deep Earthy Browns (`#FAF9F6`, `#E65100`, `#3E2723`).
- **Typography**: Premium typography using **Playfair Display** (Headings) and **Outfit** (Body).
- **Visuals**: High-quality imagery featuring the Kumbh/Magh Mela atmosphere, contained in elegant arched frames to prevent pixelation.

### 🛐 **Spiritual Significance Section**
- **Dynamic Calendar**: Highlights key bathing dates (Paush Purnima, Mauni Amavasya, etc.).
- **Cultural Context**: Educational content about the significance of the Kalpwas.

### ⚡ **Smart Booking Engine**
- **Location Intelligence**: 
  - **Autocomplete**: "Google Maps" style suggestions for Prayagraj landmarks (e.g., Civil Lines, Sangam).
  - **GPS Integration**: "Use Current Location" feature for instant pickup detection.
- **Interactive Form**:
  - Real-time price calculation (Ride + Hygiene Kit options).
  - Overlay logic for dropdowns to ensure no UI overlapping.
- **Trust Signals**: Badges for "Instant Confirmation" and "100% Refundable".

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (CSS3 variables, Grid, Flexbox, Glassmorphism)
- **Deployment**: Ready for Netlify/Vercel

## 📂 Project Structure

```
MaghaMela/
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx          # "Divine Arch" Hero with Aarti imagery
│   │   ├── HeroSection.css
│   │   ├── HowItWorks.jsx           # "Path to Peace" process steps
│   │   ├── HowItWorks.css
│   │   ├── WhyBike.jsx              # Benefits Grid (Divine Speed, Verfied Sewaks)
│   │   ├── WhyBike.css
│   │   ├── BookingSection.jsx       # Advanced form with Autocomplete/GPS
│   │   ├── BookingSection.css
│   │   ├── SpiritualSignificance.jsx# "Merit of Magha" Calendar (Footer area)
│   │   └── SpiritualSignificance.css
│   ├── App.jsx                      # Main Layout & Navigation
│   ├── index.css                    # Global Design System (Fonts: Playfair/Outfit)
│   └── main.jsx
├── public/                          # Optimized Assets (magh-mela-aarti.jpg etc.)
└── index.html
```

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 👨‍💻 Design & Development Notes

- **Clean Codebase**: All unused assets (3D models, legacy images) and components (RefundPolicy, KitInclusion) have been removed for performance.
- **Responsive Layout**: Utilizing CSS Grid and Flexbox with a mobile-first approach.
- **Global Box-Sizing**: `box-sizing: border-box` applied globally to prevent layout overlapping issues.

---
**Om Namah Shivay** 🕉️
