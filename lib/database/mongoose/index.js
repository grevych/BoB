const mongoose = require('mongoose');

const TruckStatusStore = require('./stores/truck-status');
const TruckConnectionStore = require('./stores/truck-connection');


class MongooseDatabase {
  constructor({
    scheme, host, port, user, password, database, options,
  }) {
    this.scheme = scheme;
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.database = database;
    this.truckStatuses = new TruckStatusStore();
    this.truckConnections = new TruckConnectionStore();
    this.connection = mongoose.connect(this.buildURI(), options);
  }

  buildURI() {
    let uri = `${this.scheme}://`;

    if (this.user && this.password) {
      uri += `${this.user}:${this.password}@`;
    }

    uri += this.host;

    if (this.port) {
      uri += `:${this.port}`;
    }

    uri += `/${this.database}`;

    return uri;
  }
}

module.exports = MongooseDatabase;
