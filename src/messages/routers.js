const { Router } = require('express');
const messageRouter = Router();
const { authorize } = require('../user/controllers');
const { handleValidate } = require('../helpers/validate');
const { createMessageRules } = require('./schemes');
const { createMessage } = require('./controllers');

messageRouter.post(
  '/',
  authorize,
  handleValidate(createMessageRules),
  createMessage,
);

module.exports = messageRouter;
