const UserInfo = require("../../models/UserInfo");
const User = require("../../models/User");

const addUserInfo = async (req, res) => {

  try {
    const { id } = req.query;
    const { intro, school, graduationDate, image, socials } = req.body;

    // handle errors for ids
    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: "user not found" });

    // create user info
    const userInfo = new UserInfo({
      userId: id,
      intro,
      school,
      graduationDate,
      image,
      socials
    });

    // save user info
    await userInfo.save();

    res.status(201).json({ message: "user info has been added" });
    
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
  
}

module.exports = addUserInfo;