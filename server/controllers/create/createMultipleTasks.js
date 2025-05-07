const Task = require("../../models/Task");

const createMultipleTasks = async (req, res) => {
  try {
    const { id, tasks } = req.body;

    // handle errors for userids
    if (!id) return res.status(400).json({ message: "user id not found to create task" });
    
    // Validate tasks array
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({ message: "Tasks must be a non-empty array" });
    }

    // create new Quiz
    const newTasks = tasks.map((task) => ({
      userId: id,
      title: task.title,
      description: task.description,
      completed: task.completed || false,
    }));

    //save the new Quiz
    await Task.insertMany(newTasks);

    res.status(201).json({ message: "Tasks have been created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = createMultipleTasks;