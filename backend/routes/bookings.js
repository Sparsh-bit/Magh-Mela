const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const crypto = require('crypto');

// Razorpay client: instantiate only if keys provided, otherwise use a safe mock
let rzpy = null;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
  try {
    // require lazily to avoid throwing during server start when env missing
    const Razorpay = require('razorpay');
    rzpy = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
  } catch (e) {
    console.warn('Failed to initialize Razorpay client, running in mock mode.', e.message || e);
  }
}

if (!rzpy) {
  console.warn('Razorpay keys not configured — creating mock order responses. Provide RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to enable real payments.');
  rzpy = {
    orders: {
      create: async (opts) => {
        return { id: `order_mock_${Date.now()}`, amount: opts.amount, currency: opts.currency || 'INR' };
      }
    }
  };
}

// Server-side price calculation
const BASE_PRICE = 150; // per pilgrim
const KIT_PRICE = 50; // per pilgrim

// Create booking -> create razorpay order -> return order & booking id
router.post('/', async (req, res) => {
  try {
    const { pickupLocation, destinationGhat, timeSlot, date, passengers, hygieneKit, email } = req.body;

    // Basic validation
    if (!pickupLocation || !pickupLocation.text) return res.status(400).json({ error: 'pickupLocation.text is required' });
    if (!destinationGhat) return res.status(400).json({ error: 'destinationGhat is required' });
    if (!timeSlot) return res.status(400).json({ error: 'timeSlot is required' });
    if (!date) return res.status(400).json({ error: 'date is required' });
    if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'valid email is required' });
    const pax = Number(passengers) || 1;
    if (pax < 1 || pax > 50) return res.status(400).json({ error: 'passengers must be between 1 and 50' });

    // Price computed server-side (ignore client price)
    const price = (BASE_PRICE * pax) + (hygieneKit ? (KIT_PRICE * pax) : 0);

    // Create a pending booking first
    const booking = new Booking({
      pickupLocation: { text: pickupLocation.text, lat: pickupLocation.lat, lng: pickupLocation.lng },
      destinationGhat,
      timeSlot,
      date,
      email,
      passengers: pax,
      hygieneKit: !!hygieneKit,
      price,
      currency: 'INR',
      status: 'pending_payment',
      qrCodeData: null
    });

    await booking.save();

    // Create Razorpay order (amount in paise)
    const amountPaise = price * 100;
    const orderOptions = {
      amount: amountPaise,
      currency: 'INR',
      receipt: booking._id.toString(),
      payment_capture: 1
    };

    const order = await rzpy.orders.create(orderOptions);

    // Save razorpay order id on booking for lookup during webhook
    booking.razorpayOrderId = order.id;
    await booking.save();

    return res.status(201).json({
      bookingId: booking._id,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      },
      razorpayKey: RAZORPAY_KEY_ID || null
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// List bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100);
    return res.json({ bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get booking by id
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Not found' });
    return res.json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
