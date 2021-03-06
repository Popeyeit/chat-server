const express = require('express');
const userRouter = express.Router();
const { handleValidate } = require('../helpers/validate');

const {
  registerUser,
  checkUniqueEmail,
  loginUser,
  currentUser,
  logoutUser,
  authorize,
  getAllUsers,
} = require('./controllers');

const { registerSchema, loginSchema } = require('./schemes');

userRouter.post(
  '/register',
  handleValidate(registerSchema),
  checkUniqueEmail,
  registerUser,
);

userRouter.post('/login', handleValidate(loginSchema), loginUser);
userRouter.post('/logout', authorize, logoutUser);
userRouter.get('/currentUser', authorize, currentUser);
userRouter.get('/users', authorize, getAllUsers);

module.exports = userRouter;
