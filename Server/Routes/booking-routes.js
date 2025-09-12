const express = require('express');
const Booking = require('../db/Models/booking-schema');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_1234567890abcdef',
  key_secret: 'your_test_secret_here',
});

router.post('/', async (requestAnimationFrame, res) => {
  try {
    const { stationId, date, slot, vehicleNumber, amount } = req.body;
    const userId = req.user.id; //from auth middleware

    //create Booking
    const booking = await Booking.create({
      userId,
      stationId,
      date,
      slot,
      vehicleNumber,
      amount,
      paymentStatus: 'pending',
      bookingStatus: 'pending',
    });
    //create Razorpay order:

    // const order = await razorpay.orders.create({
    //   amount: amount * 100,
    //   currency: 'INR',
    //   receipt: booking._id.toString(),
    // });
    // booking.orderId = order.id;
    // await booking.save();

    res.json({ success: true, order, bookingId: booking._id });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});
//verify payment

router.post('/verify', async (req, res) => {
  try {
    const { order_id, payment_id, sign } = req.body;

    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + '|' + payment_id)
      .digest('hex');

    if (expectedSign === sign) {
      const booking = await Booking.findOneAndUpdate(
        { orderId: order_id },
        { paymentStatus: 'paid', bookingStatus: 'confirmed' },
        { new: true }
      );
      return res.json({ success: true, message: 'Payment verified', booking });
    } else {
      return res.status(400).json({ success: false, message: 'Invalied sign' });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});
//get user bookings
router.get('my-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      'stationId'
    );
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cancel Booking
router.patch('/cancel/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: 'canceled' },
      { new: true }
    );
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
