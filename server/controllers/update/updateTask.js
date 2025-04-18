const Task = require("../../models/Task");

const updateTask = async (req, res) => {
  try {
    const { id, title, description, completed } = req.body;

    //validate user and card id
    const task = await Task.findById(id);
    if (!task) return res.status(400).json({ message: "invalid task id" });

    //create filter
    const filter = { _id: id };
    const update = { title: title, description: description, completed: completed };

    await Task.findOneAndUpdate(filter, update);
    const updatedTask = await Task.findOne(filter);

    res.status(200).json({ message: "Task has been updated", update: updatedTask });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = updateTask;