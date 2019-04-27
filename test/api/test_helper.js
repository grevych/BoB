const config = require('config');

const api = require('../../api/v1');
const dbFactory = require('../../lib/database/factory');


before(() => {
});

beforeEach(() => {
  db = dbFactory.create(config.database);
  app = api(db);

  return db;
});

after(() => {});
