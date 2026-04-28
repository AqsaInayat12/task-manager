const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Pending' },
  dueDate: { type: Date } // Naya field jo aapne manga tha
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);