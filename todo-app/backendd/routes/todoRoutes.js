// routes/todos.js
const express = require("express");
const router = express.Router();
const Todo = require('../models/todoModels')
const {getTodo,
createTodo,
deleteTodo,
updateTodo} = require('../controller/todoController');
const authenticateToken = require("../middleware/auth");
// GET all todos
router.get("/",authenticateToken,getTodo);
// POST a new todo
router.post("/",authenticateToken, createTodo);
// DELETE a todo
router.delete("/:id",authenticateToken,deleteTodo);
router.put("/:id",authenticateToken,updateTodo);

module.exports = router;
