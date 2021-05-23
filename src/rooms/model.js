const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastMessage: {
    type: String,
    require: false,
  },
});

const roomModule = mongoose.model('Room', roomSchema);

module.exports = roomModule;
