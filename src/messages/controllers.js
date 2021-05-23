const MessageModule = require('./model');

exports.createMessage = async (req, res, next) => {
  try {
    const { user } = req;
    const { body } = req;
    const { _id: id } = user;
    const { message, roomId } = body;

    const resultDb = await MessageModule.create({
      message,
      timestamp: Date.now(),
      user: id,
      name: user.name,
      roomId,
    });

    res.status(201).send({
      name: resultDb.name,
      message: resultDb.message,
      timestamp: resultDb.timestamp,
      id: resultDb._id,
      email: user.email,
      roomId: resultDb.roomId,
    });
  } catch (error) {
    next(error);
  }
};


