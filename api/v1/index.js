const express = require('express');

const app = express();

app.use(express.json());

module.exports = (db) => {
  app.get('/v1/trucks', (req, res) => {
    try {
      db.truckConnections.all()
        .then(truckConnections => res.send(truckConnections));
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  });

  app.get('/v1/trucks/status', () => {
  });

  app.get('/v1/trucks/closest', () => {
  });

  return app;
};
