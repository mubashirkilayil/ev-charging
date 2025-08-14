const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['OWNER', 'CUSTOMER'],
    default: 'CUSTOMER',
  },
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
