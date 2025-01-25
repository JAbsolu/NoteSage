const User = require("../../models/User");

const getUsers = async (req, res) => {
  try {
    // get users
    const users = await User.find();
     if (users.length > 0) {
      res.status(200).json({ message: "all users have been retrived", data: users });
     } else {
      res.status(200).json({ message: "no users found", data: []});
     }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getUsers;