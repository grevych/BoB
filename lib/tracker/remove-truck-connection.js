class RemoveTruckConnection {
  constructor({
    truckConnectionId, db,
  }) {
    this.truckConnectionId = truckConnectionId;
    this.db = db;
  }

  execute() {
    return this.db.truckConnections.remove(this.truckConnectionId);
  }
}

module.exports = RemoveTruckConnection;
