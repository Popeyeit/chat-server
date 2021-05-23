const { Router } = require('express');
const roomRouter = Router();
const { authorize } = require('../user/controllers');
const { handleValidate } = require('../helpers/validate');
const { createRoomRules, changeRoomRules } = require('./schemes');
const {
  createRoom,
  getRooms,
  changeRoom,
  getMessagesByIdRoom,
} = require('./controllers');

roomRouter.get('/', authorize, getRooms);
roomRouter.get('/:roomId', authorize, getMessagesByIdRoom);
roomRouter.post('/new', authorize, handleValidate(createRoomRules), createRoom);
roomRouter.patch(
  '/change/:roomId',
  authorize,
  handleValidate(changeRoomRules),
  changeRoom,
);
module.exports = roomRouter;
