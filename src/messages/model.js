const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  user: {
    type: String,
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
    type: String,
    ref: 'Room',
  },
});

const messageModule = mongoose.model('Message', messageSchema);

module.exports = messageModule;
