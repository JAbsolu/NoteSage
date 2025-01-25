const User = require("../../models/User");

const getUser = async (req, res) => {
  try {
    // get users
    const { id } = req.query;

    const user = await User.findById(id);
     if (user) {
      res.status(200).json({ message: `user ${user.firstName} ${user.lastName} found`, data: user });
     } else {
      res.status(200).json({ message: "user not found", data: [] });
     }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getUser;