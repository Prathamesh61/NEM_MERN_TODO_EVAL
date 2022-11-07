const express = require('express');
const { getTodosWithId, getTodos, postTodos, patchTodo, deleteTodo } = require('../Controllers/Todo.controllers');
const TodoRouter = express.Router();
TodoRouter.use(express.json());

TodoRouter.get("/", getTodos);
TodoRouter.get("/:todoid", getTodosWithId);
TodoRouter.post("/create", postTodos);
TodoRouter.patch("/update/:todoid", patchTodo);
TodoRouter.delete("/delete/:todoid", deleteTodo);

module.exports = { TodoRouter }