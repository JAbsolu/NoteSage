const Paper = require("../../models/Paper");
const Module = require("../../models/Module");

const createPaper = async (req, res) => {
  try {
    const { moduleId, title, body, feedback } = req.body;

    // handle errors for ids
    const module = await Module.findById(moduleId);

    if (!module) return res.status(400).json({ message: "module not found" });

    // create new paper
    const paper = new Paper({
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