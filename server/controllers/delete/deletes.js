const Card = require("../../models/Card")
const Deck = require("../../models/Deck")
const Module = require("../../models/Module")
const MultipleChoice = require("../../models/MultipleChoice")
const Paper = require("../../models/Paper")
const Quiz = require("../../models/Quiz")
const User = require("../../models/User")
const UserInfo = require("../../models/UserInfo")

// delete user
exports.deleteUser = async(req, res) => {
  try {
    const { id } = req.body;

    const userToDelete = await User.findById({ _id: id });
    if (!userToDelete) {
      res.status(400).json({ message: "user not found" });
      return;
    }
    const deletedUser = await User.deleteOne({ _id: id });

    res.status(200).json({ message: `user ${id} deleted \n ${deletedUser}`});

  } catch (error) {
    console.log(error);
  }
}


//delete user modukes
exports.userModule = async(req, res) => {
  try {
    const { id } = req.query;

    const moduleToDelete = await Module.find({ userId: id });

    if (!moduleToDelete) {
      res.status(400).json({ message: "module not found" });
      return;
    }

    const deleteConfirmation = await Module.deleteOne({ userId: id });

    res.status(200).json({ message: `deleted module ${id}`, data: deleteConfirmation });

  } catch (error) {
    console.log(error);
  }
}
