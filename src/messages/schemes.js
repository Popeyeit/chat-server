const Joi = require('joi');

exports.createMessageRules = Joi.object({
  message: Joi.string().required().min(1).max(300),
  roomId: Joi.string().required(),
});
