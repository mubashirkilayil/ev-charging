const express = require('express');
const stationRoute = require('./station-route');
const userRoute = require('./user-route');

const router = express.Router();

router.use('/station', stationRoute);
router.use('/user', userRoute);

module.exports = router;
