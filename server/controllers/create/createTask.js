const Task = require("../../models/Task");
const User = require("../../models/User");
const Notification = require("../../models/Notifications");

const createTask = async (req, res) => {
  try {
    const { id, title, description, completed } = req.body;

    // handle errors for userids
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "user id not found to create task" });

    const userNotifications = await Notification.findOne({ userId: id }); 

    // create new Quiz
    const task = new Task({
      userId: id,
      title: title,
      description: description,
      completed: completed || false
    });

    //save the new Quiz
    await task.save();

    userNotifications.notifications.push(`You created the task ${task.title}`);
    await userNotifications.save();

    res.status(201).json({ message: "Task has been created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = createTask;