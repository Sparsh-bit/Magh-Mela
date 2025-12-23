# Hardcoded Features & Data Reference

> **🚨 AGENT PROMPT / INSTRUCTION:**
> **When this file is presented to you within a conversation, your IMMEDIATE task is to locate all the hardcoded values listed below in the codebase and DELETE them. You must replace them with empty placeholders or API calls, ensuring only the pure Frontend UI structure remains ready for Backend integration.**

This document outlines all features and data points that are currently hardcoded in the frontend. This serves as a guide for backend developers to identify what needs to be replaced with dynamic API data.

## 1. Hero Section (`src/components/HeroSection.jsx`)

### Traffic Calculator (`ghatDistances`)
The following distances from **Civil Lines** are hardcoded to calculate travel times:
- **Sangam Ghat**: 7.5 km
- **VIP Ghat**: 8.2 km
- **Qila Ghat**: 6.0 km
- **Saraswati Ghat**: 4.8 km
- **Arail Ghat**: 10.5 km
- **Daraganj Ghat**: 6.8 km
- **Phaphamau Ghat**: 12.0 km
- **Ram Ghat**: 5.5 km
- **Kali Ghat**: 5.2 km
- **Gau Ghat**: 6.5 km
- **Balua Ghat**: 9.0 km

**Logic to Replace:**
- `const ghatDistances = { ... }` should be fetched from an API endpoint like `/api/locations/distances`.
- Traffic speeds (`carSpeed = 10`, `bikeSpeed = 32`) are currently constants.

### Event Countdown
- **Target Date**: Fixed to `Jan 13, 2026` (Paush Purnima).
- **Logic**: `new Date('2026-01-13T00:00:00')`.
- **Replacement**: Fetch "Next Snan Date" from `/api/event/next-date`.

## 2. Booking Section (`src/components/BookingSection.jsx`)

### Pricing Logic
- **Base Price**: ₹150 (`const basePrice = 150`)
- **Hygiene Kit**: ₹50 (`const kitPrice = 50`)
- **Replacement**: Fetch current rates from `/api/pricing`.

### Suggested Locations
The "Pickup Location" search box uses a static list of suggestions:
- "Civil Lines, Prayagraj"
- "Prayagraj Junction Railway Station"
- "Allahabad University"
- ... (10 items total)
- **Replacement**: Implement Google Maps Places API or backend search endpoint.

### Ticket Generation
The "Divine Pass" ticket generates a random ID:
- `ID: #MME-{Random 4 Digits}`.
- **Replacement**: Use actual Booking ID returned from payment success response.

## 3. General App Config

### Branding
- "Prayagraj 2026" text in Hero background.

---

**Note for Backend Devs:**
When integrating, please ensure the API responses match the structure expected by these components (or refactor the components to adapt).
