let mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    assignedTo: {type: String, default: ""},
    completed: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
});

let TodoModel = mongoose.model('Todolist', todoSchema);
module.exports = TodoModel;