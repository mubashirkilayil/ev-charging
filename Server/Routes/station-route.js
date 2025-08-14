const express = require('express');
const Station = require('../db/Models/station-schema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, available } = req.query;
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (available) {
      query.available = available === 'true';
    }
    const stations = await Station.find(query);
    // if (!stations.length) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'No stations found for your search.',
    //   });
    // }
    console.log('Search term:', search);
    console.log('MongoDB Query:', query);

    return res.status(200).json({ success: true, stations });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/near', async (req, res) => {
  try {
    const { lat, lng, distance } = req.query;
    if (!lat || !lng || !distance) {
      return res
        .status(404)
        .json({ error: 'lat ,lng and distance are required' });
    }
    const nearStations = await Station.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseFloat(distance) * 1000,
        },
      },
    });
    const stationCount = nearStations.length;

    return res.json({
      message: `There are ${stationCount} near by station are there in your location`,
      nearStations,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUSer = await Station.create(req.body);
    return res.status(200).json({
      success: true,
      message: 'new station added successfully',
      newUSer,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const stationById = await Station.findById(id);
    if (!stationById) {
      return res.status(404).json({
        success: false,
        message: `There is no station with this Id : ${id}`,
      });
    }
    return res.status(200).json({ success: true, stationById });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const stationUpdate = await Station.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!stationUpdate) {
      return res.status(404).json({
        success: false,
        message: `There is no station with Id : ${id}`,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: 'Station updated', stationUpdate });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStation = await Station.findByIdAndDelete(id);
    if (!deleteStation) {
      return res.status(404).json({
        success: false,
        message: `There is no station with Id : ${id}`,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: 'Station deleted', deleteStation });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
module.exports = router;
