const TruckConnection = require('../../../tracker/truck-connection');
const TruckConnectionModel = require('../../../../db/mongoose/models/truck-connection');
const errors = require('../../errors');

class TruckConnectionStore {
  async all() {
    const models = await TruckConnectionModel.find({});

    return models.map(model => this.modelToObject(model));
  }

  async create(truckConnection) {
    const model = this.objectToModel(truckConnection);

    await model.save();

    return model.id;
  }

  async find(truckConnectionId) {
    const model = await TruckConnectionModel.findById(truckConnectionId);

    if (!model) {
      throw new errors.TruckConnectionModelNotFound(truckConnectionId);
    }

    return this.modelToObject(model);
  }

  async remove(truckConnectionId) {
    const truckConnection = this.find(truckConnectionId);

    const { ok } = await TruckConnectionModel.deleteOne({ id: truckConnection.id });

    if (!ok) {
      throw new errors.TruckConnectionModelNotRemoved(truckConnectionId);
    }

    return truckConnection;
  }

  objectToModel(truckConnection) {
    let model = null;

    try {
      model = new TruckConnectionModel({
        driverId: truckConnection.driverId,
        status: truckConnection.status,
        timeConnection: truckConnection.time,
      });
    } catch (error) {
      throw new errors.TruckConnectionModelNotCreated(
        truckConnection.id, error.stack,
      );
    }

    return model;
  }

  modelToObject(model) {
    let truckConnection = null;

    try {
      truckConnection = new TruckConnection({
        id: model.id,
        driverId: model.driverId,
        status: model.status,
        time: model.connectionTime,
      });
    } catch (error) {
      throw new errors.TruckConnectionEntityNotCreated(model.id, error.stack);
    }

    return truckConnection;
  }
}

module.exports = TruckConnectionStore;
