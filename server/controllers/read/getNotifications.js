const Notification = require("../../models/Notificatios");
const User = require("../../models/User");

const getNotifications = async (req, res) => {
  const { id } = req.query;

  try {
    //find usr
    const user = await User.findById(id);

    if (!user) {
        res.status(404).json(`user ${id} not found`);
    }

    //find notifcations
    const notification = await Notification.find({ userId: id })

    if (notification.length > 0) {
      res.status(200).json({ message: "Fetched all notfications", data: notification });
    } else {
      res.status(200).json({ message: "no notifications found", data: notification });
    }

  } catch (err) {
    res.status(404).json({  message: "error " + err.message });
  }
}

module.exports = getNotifications;