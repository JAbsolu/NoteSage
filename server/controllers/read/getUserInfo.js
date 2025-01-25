const User = require("../../models/User");
const UserInfo = require("../../models/UserInfo");

const getUserInfo = async (req, res) => {
  try {
    const { id } = req.query;

    //handle id errors
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "user id is needed to access this information" });
    
    const userInfo = await UserInfo.find({ userId: id })
    

      // handle other errors
      res.status(200).json({ message: "user info retrieved", data: userInfo });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getUserInfo;