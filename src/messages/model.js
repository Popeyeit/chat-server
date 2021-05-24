const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
});

const messageModule = mongoose.model('Message', messageSchema);

module.exports = messageModule;
