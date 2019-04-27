class TruckStatus {
  constructor({
    driverId, status, time,
  }) {
    this.driverId = driverId;
    this.status = status;
    this.time = time;
  }
}

module.exports = TruckStatus;
