const TruckConnection = require('./truck-connection');

class CreateTruckConnection {
  constructor({
    driverId, status, connectionTime, db,
  }) {
    this.driverId = driverId;
    this.status = status;
    this.connectionTime = connectionTime;
    this.db = db;
  }

  execute() {
    const truckConnection = new TruckConnection({
      driverId: this.driverId,
      status: this.status,
      time: this.connectionTime,
    });

    return this.db.truckConnections.create(truckConnection);
  }
}

module.exports = CreateTruckConnection;
