const mongoose = require('mongoose');

// Define a schema for storing reset tokens
const ResetTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required']
  },
  token: {
    type: String
  },
  createdAt: { type: Date, expires: '1h', default: Date.now }, // Token expires in 1 hour
});

const ResetToken = mongoose.model('ResetToken', ResetTokenSchema);

module.exports = ResetToken;