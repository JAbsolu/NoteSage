const Paper = require("../../models/Paper");
const User = require("../../models/User");
const Module = require("../../models/Module");

const createPaper = async (req, res) => {
  try {
    const { userId, moduleId, title, body, feedback } = req.body;

    // handle errors for ids
    const user = await User.findById(userId);
    const module = await Module.findById(moduleId);

    if (!user) return res.status(400).json({ message: "user not found" });
    if (!module) return res.status(400).json({ message: "module not found" });

    // create new paper
    const paper = new Paper({
      userId,
      moduleId,
      title,
      body,
      feedback
    });

    await paper.save();

    res.status(201).json({ message: "paper has been created" });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }

}

module.exports = createPaper;