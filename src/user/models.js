const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  token: {
    type: String,
    required: false,
    default: null,
  },
  status: {
    type: String,
    required: true,
    default: 'online',
  },
});

const getUserByEmail = async function (email) {
  const res = await this.findOne({
    email,
  });

  return res;
};
const updateUserToken = async function (id, newToken) {
  return await this.findByIdAndUpdate(id, {
    token: newToken,
  });
};

userSchema.statics.getUserByEmail = getUserByEmail;
userSchema.statics.updateUserToken = updateUserToken;

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
