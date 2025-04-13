const Notification = require("../../models/Notifications");
const User = require("../../models/User");

const createNotificationList = async (req, res) => {
  const { id } = req.query;

  try {
    // handle errors for ids
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found" });

    // create new paper
    const notification = new Notification({
      userId: id,
      title: title,
      date: new Date()
    });

    await notification.save();

    res.status(201).json({ message: "Notification list has been created" });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }

}

module.exports = createNotificationList;