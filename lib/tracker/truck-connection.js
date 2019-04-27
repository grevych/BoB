class TruckConnection {
  constructor({
    id, driverId, status, time,
  }) {
    this.id = id;
    this.driverId = driverId;
    this.status = status;
    this.time = time;
  }
}

module.exports = TruckConnection;
