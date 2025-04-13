const User = require("../../models/User");
const Notification = require("../../models/Notifications");


const getNotifications = async (req, res) => {
  const { id } = req.query;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }

    const notification = await Notification.find({ userId: id });

    if (notification.length > 0) {
      return res.status(200).json({ message: "Fetched all notifications", data: notification });
    }

    return res.status(404).json({ message: "No notification list found", data: [] });

  } catch (err) {
    res.status(500).json({ message: "error " + err.message });
  }
}

module.exports = getNotifications;