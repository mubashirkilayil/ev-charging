const express = require('express');
const stationRoute = require('./station-route');
const userRoute = require('./user-route');
const bookingRoute = require('./booking-routes');

const router = express.Router();

router.use('/station', stationRoute);
router.use('/user', userRoute);
router.use('/booking', bookingRoute);

module.exports = router;
