const fs = require("fs")

const readTasks = () => {
    try {
      const data = fs.readFileSync("task.json", "utf8");
      return JSON.parse(data).tasks || [];
    } catch (err) {
      throw new Error("Error reading file");
    }
  };
  
  // Helper function to write tasks.json
  const writeTasks = (tasks) => {
    try {
      fs.writeFileSync("task.json", JSON.stringify({ tasks }, null, 2));
    } catch (err) {
      throw new Error("Error saving file");
    }
  };
  
  module.exports = {writeTasks,readTasks}