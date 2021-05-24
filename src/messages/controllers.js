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
      user: resultDb.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMessagesByIdUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { user: userAuthorize } = req;

    const messages = await MessageModule.find({ user: userId });

    const newMessages = messages.map(message => {
      return String(message.user) === String(userAuthorize._id)
        ? {
            name: message.name,
            message: message.message,
            id: message._id,
            email: userAuthorize.email,
            timestamp: message.timestamp,
            roomId: message.roomId,
            user: message.user,
          }
        : {
            name: message.name,
            message: message.message,
            id: message._id,
            timestamp: message.timestamp,
            roomId: message.roomId,
            user: message.user,
          };
    });

    res.status(200).json(newMessages);
  } catch (error) {
    next(error);
  }
};
