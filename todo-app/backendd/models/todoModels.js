const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  assignedTo: String,
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
