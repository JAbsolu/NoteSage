const { default: mongoose, model } = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  completed: Boolean
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;