const fs  = require("fs")
const express = require("express")
const {getTasks,getTask,putTask, deleteTask,postTask} = require("../controllers/TaskController")
const TasksRouter = express.Router();

TasksRouter.get('/',getTasks);

TasksRouter.get('/:id',getTask);

TasksRouter.put('/:id',putTask)

TasksRouter.delete('/:id',deleteTask);

TasksRouter.post('/',postTask );

module.exports = {TasksRouter}