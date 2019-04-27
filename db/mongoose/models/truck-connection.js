const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  driverId: String,
  status: String,
  connectionTime: Date,
});

module.exports = mongoose.model('TruckConnection', schema);
