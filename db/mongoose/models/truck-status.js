const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  driverId: String,
  status: String,
  date: Date,
});

module.exports = mongoose.model('TruckStatus', schema);
