const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { connection } = require('./config/db');
const { TodoRouter } = require('./routes/Todo.routes');
const { UserRouter } = require('./routes/User.routes');
const { authentication } = require('./middlewares/authentication');
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("This is Homepage");
})

app.use("/", UserRouter);

app.use("/todo", authentication, TodoRouter);




app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connection to DB estableshed");
    } catch (err) {
        console.log(err);
    }
    console.log(`connected on server port ${process.env.PORT}`);
})