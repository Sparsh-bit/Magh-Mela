const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

// Razorpay webhook endpoint
router.post('/webhook', async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const body = req.rawBody ? req.rawBody.toString() : JSON.stringify(req.body);

    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
    if (expected !== signature) {
      console.warn('Invalid webhook signature');
      return res.status(400).send('invalid signature');
    }

    const payload = req.body;
    // Handle payment captured event
    if (payload.event === 'payment.captured' || payload.event === 'payment.authorized') {
      const paymentEntity = payload.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      // find booking with razorpayOrderId
      const booking = await Booking.findOne({ razorpayOrderId: orderId });
      if (!booking) {
        console.warn('Booking not found for order', orderId);
        // still record payment
        await Payment.create({ provider: 'razorpay', providerPaymentId: paymentEntity.id, orderId, amount: paymentEntity.amount, currency: paymentEntity.currency, status: paymentEntity.status, raw: paymentEntity });
        return res.json({ ok: true });
      }

      // create payment record
      const payment = new Payment({
        provider: 'razorpay',
        providerPaymentId: paymentEntity.id,
        orderId,
        bookingId: booking._id,
        amount: paymentEntity.amount / 100,
        currency: paymentEntity.currency,
        status: paymentEntity.status,
        raw: paymentEntity
      });
      await payment.save();

      // update booking
      booking.status = 'confirmed';
      booking.paymentId = paymentEntity.id;
      booking.qrCodeData = `MME-${booking._id.toString().slice(-6)}-${Math.random().toString(36).slice(2,8)}`;
      await booking.save();

      return res.json({ ok: true });
    }

    // other events
    return res.json({ ok: true });
  } catch (err) {
    console.error('Webhook error', err);
    return res.status(500).json({ error: 'webhook handler error' });
  }
});

module.exports = router;
