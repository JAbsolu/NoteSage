const UserInfo = require("../../models/UserInfo");

const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.query;
    const { intro, school, graduationDate, image, socials } = req.body;

    //validate UserInfoand card id
    const userInfo = await User.findById(id);
    if (!userInfo) return res.status(400).json({ message: "invalid user info id" });

    //create filter
    const filter = { _id: id };
    const update = {  intro: intro, school: school, graduationDate: graduationDate, image: image, socials: socials,};

    await User.findOneAndUpdate(filter, update);
    const updatedUserInfo = await User.findOne(filter);

    res.status(200).json({ message: "UserInfohas been updated", update: updatedUserInfo });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = updateUserInfo;