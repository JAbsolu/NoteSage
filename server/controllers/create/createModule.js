const Module = require("../../models/Module");
const User = require("../../models/User");

const createModule = async (req, res) => {
  try {
    const { userId, title, decks, tests, public } = req.body

    // error handling for user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // create new module
    const module = new Module({
      userId,
      title,
      decks: [],
      tests: [],
      public
    });

    // save the module
    await module.save();
    
    res.status(201).json({ mesage: "module has been created "});
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.mesage });
  }
}

module.exports = createModule;