const fs = require("fs")

const readTasks = () => {
    try {
      const data = fs.readFileSync("task.json", "utf8");
      return JSON.parse(data).tasks || [];
    } catch (err) {
      console.log(err)
    }
  };
  
  
  const writeTasks = (tasks) => {
    try {
      fs.writeFileSync("task.json", JSON.stringify({ tasks }, null, 2));
    } catch (err) {
      console.log(err)
    }
  };
  
  module.exports = {writeTasks,readTasks}