let TodoModel = require('../models/todo');

let todoinsert = (req, res) => {
    let todo = new TodoModel({
        title: req.body.title,
        description: req.body.description,
        assignedTo: req.body.assignedTo,
        completed: req.body.completed,
        date: req.body.date
    });
    todo.save().then((result) => {
        res.status(200).json({status:1, message: 'Todo inserted successfully', data:result});
    }).catch(err => {
        res.status(500).json({status:0, message: 'Error inserting todo', error: err});
    });
}

let todolist = async (req, res) => {
    let todos = await TodoModel.find();
    res.send({status:1, message: 'Todo list fetched successfully', data: todos});
}

let todosingle = async (req, res) => {
    let todoid = req.params.id;
    let todo = await TodoModel.findOne({_id: todoid});
    if (todo) {
        res.send({status:1, message: 'Todo fetched successfully', data: todo});
    } else {
        res.send({status:0, message: 'Todo not found', data: todo});
    }
}

let todoremove = async (req, res) => {
    let id = req.params.id;
    let todo = await TodoModel.deleteOne({_id: id});
    if (todo) {
        res.send({status:1, message: 'Todo removed successfully', data: todo});
    }
}
let todoupdate = async (req, res) => {
    let id = req.params.id;
    let {title, description, assignedTo, date, completed} = req.body;
    let obj = {
        title: title,
        description: description,
        assignedTo: assignedTo,
        completed: completed,
        date: date
    };
    let todo = await TodoModel.updateOne({_id: id}, obj);
    if (todo) {
        res.send({status:1, message: 'Todo updated successfully', data: todo});
    } else {
        res.send({status:0, message: 'Error updating todo', data: todo});
    }
}



module.exports = {todoinsert, todoremove, todoupdate, todolist, todosingle};