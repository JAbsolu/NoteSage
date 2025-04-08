const User = require("../../models/User");

const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { firstName, lastName, emailAddress, password } = req.body;

    //validate user and card id
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "invalid user id" });

    //create filter
    const filter = { _id: id };
    const update = { firstName: firstName, lastName: lastName, emailAddress: emailAddress, password: password  };

    await User.findOneAndUpdate(filter, update);
    const updatedUser = await User.findOne(filter);

    res.status(200).json({ message: "user has been updated", update: updatedUser });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = updateUser;