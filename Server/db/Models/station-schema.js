const mongoose = require('mongoose');

const StationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  // For geospatial queries
  location: {
    type: {
      type: String,
      enum: ['Point'], // Must be 'Point'
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      // required: true,
    },
  },
});

// Create 2dsphere index for geospatial search
StationSchema.index({ location: '2dsphere' });

// Middleware to auto-set `location` based on latitude/longitude
StationSchema.pre('save', function (next) {
  this.location = {
    type: 'Point',
    coordinates: [this.longitude, this.latitude],
  };
  next();
});

const Station = mongoose.model('Stations', StationSchema);

module.exports = Station;
