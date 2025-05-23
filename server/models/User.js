const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ['seeker', 'employer'], default: 'seeker' },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});


module.exports = mongoose.model('User', userSchema);
