# Magh-Mela Backend

This folder contains a minimal Express + MongoDB backend for the Magh-Mela booking UI.

Features
- POST /api/bookings — create a booking (server-side price calculation)
- GET  /api/bookings — list bookings (latest first)
- GET  /api/bookings/:id — get a single booking
- Simple admin page at `/admin.html` (served from `public/`)

Setup
1. Install dependencies

```powershell
cd backend
npm install
```

2. Create a `.env` file (or rely on the default local MongoDB URI). Example in `.env.example`.

3. Start the server

```powershell
npm run dev
# or
npm start
```

4. Visit the admin page at `http://localhost:4000/admin.html` (or the port you configured).

API Notes
- The server computes price server-side using base price ₹150 and kit price ₹50 (per passenger). Do not trust client-provided prices.

Razorpay integration
- Configure `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in your `.env` (see `.env.example`).
- POSTing to `/api/bookings` now creates a pending booking and returns a Razorpay `order` object and the `bookingId`.
- Use the returned `order.id` with Razorpay Checkout on the frontend. When Razorpay sends a webhook to `/api/payments/webhook` and the signature is verified the backend marks the booking as `confirmed` and stores payment details.

