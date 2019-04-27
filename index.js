const cluster = require('cluster');
const http = require('http');
const SocketIO = require('socket.io');

require('dotenv').config();
const config = require('config');

const api = require('./api/v1');
const databaseFactory = require('./lib/database/factory');
const CreateTruckConnection = require('./lib/tracker/create-truck-connection');
const RemoveTruckConnection = require('./lib/tracker/remove-truck-connection');

const db = databaseFactory.create(config.database);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < config.workers; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // We share the same database connection between all workers
  const app = api(db);

  const server = http.Server(app);
  const io = SocketIO(server);

  io.on('connection', (socket) => {
    let firstConnection = true;
    let truckConnection;

    socket.on('DRIVER_STATUS_RESPONSE', ({ driverId, status }) => {
      if (firstConnection) {
        const connectionTime = new Date();
        const useCase = new CreateTruckConnection({
          driverId, status, connectionTime, db,
        });

        truckConnection = useCase.execute();
        firstConnection = false;
        return;
      }

      // const useCase = new CreateTruckStatus();
    });

    socket.emit('DRIVER_STATUS_REQUEST');

    socket.on('disconnect', () => {
      if (!truckConnection) return;
      const useCase = new RemoveTruckConnection({
        truckConnectionId: truckConnection.id, db,
      });
      useCase.execute();
    });
  });

  app.disable('x-powered-by');
  server.listen(config.api.port);
  console.log('Backend listening on ', config.api.port);
}
