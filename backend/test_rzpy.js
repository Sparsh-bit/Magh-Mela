require('dotenv').config();
async function test() {
  try {
    console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
    console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);
    const Razorpay = require('razorpay');
    const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const order = await rz.orders.create({ amount: 100, currency: 'INR', receipt: 'test_receipt' });
    console.log('Order created:', order);
  } catch (err) {
    console.error('Error creating order:', err && err.message ? err.message : err);
    if (err && err.error) console.error('RZ error details:', err.error);
  }
}
test();
