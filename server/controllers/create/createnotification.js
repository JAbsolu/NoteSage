const Notification = require("../../models/Notificatios");
const User = require("../../models/User");

const createNotificationList = async (req, res) => {
  try {
    const { id } = req.query;

    // handle errors for ids
    const user = await User.findById(id);

    if (!module) return res.status(400).json({ message: "module not found" });

    // create new paper
    const notification = new Notification({
      userId: id,
      notifications: []
    });

    await notification.save();

    res.status(201).json({ message: "Notification list has been created" });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }

}

module.exports = createNotificationList;