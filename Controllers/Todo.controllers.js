const { Todo } = require("../models/Todo.model");

const getTodos = async (req, res) => {
    const { user_id } = req.body;
    const { status, tag } = req.query;
    const all_todos = await Todo.find({ user_id: user_id });
    res.send({ Todos: all_todos });
}
const getTodosWithId = async (req, res) => {
    const { user_id } = req.body;
    const { todoid } = req.params;
    const todo = await Todo.findOne({ user_id: user_id, _id: todoid });
    res.send({ singleTodo: todo });
}
const postTodos = async (req, res) => {
    const { taskname, status, tag, user_id } = req.body;
    const new_todo = new Todo({
        user_id,
        taskname,
        tag,
        status
    })
    await new_todo.save();
    console.log(new_todo)
    res.send({ msg: `todo with title ${new_todo.taskname} has been created`, new_todo: new_todo });
}
const patchTodo = async (req, res) => {
    const { taskname, tag, status, user_id } = req.body;
    const { todoid } = req.params;
    await Todo.findOneAndUpdate({ user_id: user_id, _id: todoid }, { taskname, tag, status });
    const updated_todo = await Todo.findOne({ user_id: user_id, _id: todoid });
    console.log(updated_todo)
    res.send({ msg: `todo with title ${updated_todo.taskname} has been updated`, updated_todo: updated_todo });
}
const deleteTodo = async (req, res) => {
    const { user_id } = req.body;
    const { todoid } = req.params;
    await Todo.findByIdAndDelete({ user_id: user_id, _id: todoid });
    const all_todos = await Todo.find({ user_id: user_id });
    res.send({ msg: `todo has been deleted`, all_Todo: all_todos });
}

module.exports = { getTodos, getTodosWithId, postTodos, patchTodo, deleteTodo };