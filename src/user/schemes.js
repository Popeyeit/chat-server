const Joi = require('joi');

exports.registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .required()
    .min(6)
    .max(50)
    .regex(/^(?=.*[A-Z])(?=.*[0-9])/, 'Must one Uppercase, One Number'),
  name: Joi.string().min(2).max(30).required(),
});
exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
