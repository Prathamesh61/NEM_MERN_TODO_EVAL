const mongoose = require('mongoose');


const todosSchema = new mongoose.Schema({
    taskname: { type: String, required: true },
    status: { type: String, required: true },
    tag: { type: String, required: true }
})


const Todo = mongoose.model("user_todo", todosSchema);

module.exports = { Todo };