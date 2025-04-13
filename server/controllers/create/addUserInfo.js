const UserInfo = require("../../models/UserInfo");
const User = require("../../models/User");
const Notification = require("../../models/Notifications");

const addUserInfo = async (req, res) => {

  try {
    const { userId, intro, school, graduationDate, image, socials } = req.body;

    // handle errors for ids
    const user = await User.findById(userId);
    const userNotifications = await Notification.findOne({ userId: userId });

    if (!user) return res.status(400).json({ message: "user not found" });

    // create user info
    const userInfo = new UserInfo({
      userId: userId,
      intro: intro,
      school: school,
      graduationDate: graduationDate,
      image: image,
      socials: socials
    });

    // save user info
    await userInfo.save();

    //save notification 
    userNotifications?.notifications.push("User information added!");
    await userNotifications.save();

    res.status(201).json({ message: "user info has been added" });
    
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
  
}

module.exports = addUserInfo;