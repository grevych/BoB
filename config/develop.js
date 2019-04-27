module.exports = {
  database: {
    driver: 'mongoose',
    scheme: 'mongodb',
    database: 'bob_truck_tracker',
    host: 'localhost',
    port: 27017,
    useNewUrlParser: true,
    options: {
      useNewUrlParser: true,
    },
  },
};
