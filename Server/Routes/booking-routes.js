const express = require('express');
const Booking = require('../db/Models/booking-schema');
const Stripe = require('stripe');
// const crypto = require('crypto');
const checkToken = require('../db/middleware/check-token');
const nodemailer = require('nodemailer');

const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51S7WuBCKq8zP5I3ZjrCLzAK7n3zCNs6gShS0Wk8mhthIVbx9t2ph0aM0dK9sl51qczd4yI5tZoUyJ7l3JRK7wEvO00eJt4tn42'
);

router.post(
  '/',
  checkToken(['customer', 'seller', 'admin']),
  async (req, res) => {
    try {
      const { stationId, date, slot, vehicleNumber, amount } = req.body;
      const userId = req.user.id; // auth middleware

      // 1. Save booking in DB
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

      // 2. Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'EV Slot Booking',
                description: `Slot: ${slot}, Vehicle: ${vehicleNumber}`,
              },
              unit_amount: amount * 100, // in paise
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:5173/booking-success/${booking._id}`,
        cancel_url: `http://localhost:5173/booking-failed/${booking._id}`,
      });

      booking.orderId = session.id; // store Stripe session ID
      await booking.save();

      res.json({ success: true, url: session.url }); // send redirect URL
    } catch (e) {
      return res.status(500).json({ success: false, message: e.message });
    }
  }
);
router.post('/contact-us', (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'All feilds are required!' });
    }
    const trasporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'learnedfrom8@gmail.com',
        pass: 'xjmp kzdy geyr feqz',
      },
    });
    const mailOption = {
      from: email,
      to: 'learnedfrom8@gmail.com',
      subject: `New contact form submission from ${name}`,
      text: `You got a message:\n\n${message}\n\nfrom,\n${name}\n(${email})`,
    };
    trasporter.sendMail(mailOption, () => {
      return res
        .status(200)
        .json({ success: true, message: `Message sent successfully` });
    });
    console.log('mail');
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
});
//verify payment

// router.post('/verify', async (req, res) => {
//   try {
//     const { order_id, payment_id, sign } = req.body;

//     const expectedSign = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(order_id + '|' + payment_id)
//       .digest('hex');

//     if (expectedSign === sign) {
//       const booking = await Booking.findOneAndUpdate(
//         { orderId: order_id },
//         { paymentStatus: 'paid', bookingStatus: 'confirmed' },
//         { new: true }
//       );
//       return res.json({ success: true, message: 'Payment verified', booking });
//     } else {
//       return res.status(400).json({ success: false, message: 'Invalied sign' });
//     }
//   } catch (e) {
//     return res.status(500).json({ success: false, message: e.message });
//   }
// });
// //get user bookings
// router.get('my-bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find({ userId: req.user.id }).populate(
//       'stationId'
//     );
//     res.json({ success: true, bookings });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // Cancel Booking
// router.patch('/cancel/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { bookingStatus: 'canceled' },
//       { new: true }
//     );
//     res.json({ success: true, booking });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

module.exports = router;
