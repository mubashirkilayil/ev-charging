const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/EV-ChargingDB')
  .then(() => {
    console.log('EV-ChargingAppDB hase been connected successfully');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
