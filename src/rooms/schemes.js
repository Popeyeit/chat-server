const Joi = require('joi');

exports.createRoomRules = Joi.object({
  name: Joi.string().required().min(1).max(30),
});

exports.changeRoomRules = Joi.object({
  lastMessage: Joi.string().required().min(1).max(300),
});
