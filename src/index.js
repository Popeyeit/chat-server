const express = require('express');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const path = require('path');
const cors = require('cors');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});
const userRouter = require('./user/routers');
const messageRouter = require('./messages/routers');
const roomRouter = require('./rooms/routers');

const pusher = new Pusher({
  appId: '1208182',
  key: '1bcb3902369132546112',
  secret: '61b00b3d84d5af03bb6f',
  cluster: 'eu',
  useTLS: true,
});

class Server {
  constructor() {
    this.server = null;
  }
  async start() {
    this.initServer();
    this.initMiddlewares();
    await this.initDbConnection();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }
  initServer() {
    this.server = express();
  }
  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
  async initDbConnection() {
    try {
      mongoose.set('useCreateIndex', true);
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      const db = mongoose.connection;
      db.once('open', () => {
        console.log('open');
      });

      const msgCollection = db.collection('messages');
      const changeStream = msgCollection.watch();

      changeStream.on('change', change => {
        if (change.operationType === 'insert') {
          const messageDetails = change.fullDocument;
          pusher.trigger('messages', 'inserted', {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            id: messageDetails._id,
          });
        }
      });
      console.log('Database connection successful');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const message = 'Oooops something went wrong. Try again later.';
      err.message = message;
      console.log(err);

      res.status(500).json(err);
    });
  }
  initRoutes() {
    this.server.use('/api', userRouter);
    this.server.use('/api/messages', messageRouter);
    this.server.use('/api/rooms', roomRouter);
  }
  startListening() {
    this.server.listen(process.env.PORT || 5000, () => {
      console.log('start server on port -', process.env.PORT || 5000);
    });
  }
}
const startServer = new Server();
startServer.start();
