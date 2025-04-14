const Task = require("../../models/Task");
const User = require("../../models/User");

const getUserTask = async (req, res) => {
  const { id } = req.query;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User id unaivalable to get user tasks" });
    }

    const tasks = await Task.find({ userId: id });
    res.status(200).json({ message: `Fetched all tasks`, data: tasks });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = getUserTask;