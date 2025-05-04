const fs = require("fs");

const {readTasks,writeTasks} = require("../Middlewares/middleware")

// GET all tasks
const getTasks = (req, res, next) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single task by ID
const getTask = (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    console.log(task)

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const postTask = (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title || !description || typeof completed !== "boolean") {
      return res.status(400).json({ error: "Invalid task data" });
    }

    const tasks = readTasks();
    const newTask = {
      id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      title,
      description,
      completed,
    };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// DELETE a task by ID

const deleteTask = (req, res) => {
  try {
    let tasks = readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));

    
    if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });
    tasks.splice(taskIndex, 1);

    tasks = tasks.map((task, index) => ({ ...task, id: index + 1 }));
    writeTasks(tasks);

    res.json({ message: "Task deleted successfully", tasks });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
};


const putTask = (req, res) => {
  try {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    console.log(taskIndex)

    if (taskIndex === -1 || taskIndex === undefined) return res.status(404).json({ error: "Task not found" });

    const { title, description, completed } = req.body;

    if (!title || !description || typeof completed !== "boolean") {
      return res.status(400).json({ error: "Invalid task data" });
    }


    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasks(tasks);

    res.json({ message: "Task updated successfully", task: tasks[taskIndex] });
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
};



module.exports = { getTasks, getTask, postTask, deleteTask, putTask};
