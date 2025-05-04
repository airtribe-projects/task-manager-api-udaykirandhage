const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs")
//const {getTasks,getTask,putTask, deleteTask,postTask} = require("./controllers/TaskController")
const {TasksRouter} = require("./Routes/TaskRoutes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/tasks",TasksRouter);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;