// Import the necessary libraries
const mongoose = require('mongoose');

// taskSchema definition
const taskSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

// Creating a task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
