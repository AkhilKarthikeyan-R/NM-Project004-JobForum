const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  company: { type: String, required: true }, 
  description: { type: String, required: true },
  location: String,
  salary: Number,
  website: { type: String ,required:true}, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
