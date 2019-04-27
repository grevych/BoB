class DatabaseError extends Error {}

class DatabaseConfigError extends DatabaseError {}

class UnsupportedDatabaseDriver extends DatabaseConfigError {
  constructor(driver) {
    super(`Adapter '${driver}' not found for database`);
  }
}

class ModelError extends DatabaseError {}

class ModelNotFound extends ModelError {
  constructor(model, modelId) {
    super(`${model} with id ${modelId} not found`);
  }
}

class TruckConnectionModelNotFound extends ModelNotFound {}

class ModelNotRemoved extends ModelError {
  constructor(model, modelId) {
    super(`${model} with id ${modelId} not removed`);
  }
}

class TruckConnectionModelNotRemoved extends ModelNotRemoved {}

class EntityError extends DatabaseError {}

class EntityNotCreated extends EntityError {
  constructor(entity, entityId) {
    super(`${entity} with id ${entityId} not created`);
  }
}

class TruckConnectionEntityNotCreated extends EntityNotCreated {}

module.exports = {
  UnsupportedDatabaseDriver,

  TruckConnectionModelNotFound,
  TruckConnectionEntityNotCreated,
  TruckConnectionModelNotRemoved,
};
