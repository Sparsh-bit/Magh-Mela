const mongoose = require('mongoose');

const PickupLocationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  lat: { type: Number },
  lng: { type: Number }
}, { _id: false });

const BookingSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  pickupLocation: { type: PickupLocationSchema, required: true },
  destinationGhat: { type: String, required: true },
  timeSlot: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  passengers: { type: Number, required: true, min: 1 },
  hygieneKit: { type: Boolean, default: false },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending_payment', 'confirmed', 'cancelled', 'refunded'], default: 'pending_payment' },
  razorpayOrderId: { type: String, default: null },
  paymentId: { type: String, default: null },
  qrCodeData: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
