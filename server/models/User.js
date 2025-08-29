const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // This is the corrected field name
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: '',
  },
  profilePhotoUrl: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);