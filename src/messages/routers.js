const { Router } = require('express');
const messageRouter = Router();
const { authorize } = require('../user/controllers');
const { handleValidate } = require('../helpers/validate');
const { createMessageRules } = require('./schemes');
const { createMessage, getMessagesByIdUser } = require('./controllers');

messageRouter.post(
  '/',
  authorize,
  handleValidate(createMessageRules),
  createMessage,
);
messageRouter.get('/:userId', authorize, getMessagesByIdUser);
module.exports = messageRouter;
