const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    stationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stations',
      required: true,
    },
    date: { type: Date, required: true },
    slot: { type: String, required: true }, // e.g. "10:00-11:00"
    vehicleNumber: { type: String },
    amount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    bookingStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Bookings', BookingSchema);

module.exports = Booking;
