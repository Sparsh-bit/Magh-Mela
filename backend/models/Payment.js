const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  providerPaymentId: { type: String, required: true },
  orderId: { type: String },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  amount: { type: Number },
  currency: { type: String, default: 'INR' },
  status: { type: String },
  raw: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
