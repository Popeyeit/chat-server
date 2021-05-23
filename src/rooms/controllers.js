const roomModule = require('./model');
const messageModule = require('../messages/model');
exports.createRoom = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);

    const resultDb = await roomModule.create({
      name: data.name,
      lastMessage: '',
    });

    res.status(201).send(resultDb);
  } catch (error) {
    next(error);
  }
};
exports.changeRoom = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);

    const resultDb = await roomModule.patch({
      lastMessage: data.lastMessage,
    });

    res.status(201).send(resultDb);
  } catch (error) {
    next(error);
  }
};

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await roomModule.find();

    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.getMessagesByIdRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { user } = req;

    const room = await roomModule.findById(roomId);

    if (!room) {
      res.status(400).json('not found such room');
      return;
    }
    const messages = await messageModule.find({ roomId });

    const newMessages = messages.map(message => {
      return String(message.user) === String(user._id)
        ? {
            name: message.name,
            message: message.message,
            id: message._id,
            email: user.email,
            timestamp: message.timestamp,
            roomId: message.roomId,
          }
        : {
            name: message.name,
            message: message.message,
            id: message._id,
            timestamp: message.timestamp,
            roomId: message.roomId,
          };
    });

    res.status(200).json(newMessages);
  } catch (error) {
    next(error);
  }
};

exports.changeRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { body } = req;

    const updatedResult = await roomModule.findOneAndUpdate(
      { _id: roomId },
      { lastMessage: body.lastMessage },
      { new: true },
    );

    res.status(200).json(updatedResult);
  } catch (error) {
    next(error);
  }
};
