const Test = require("../../models/Test");
const Module = require("../../models/Module");

const createTest = async (req, res) => {
  try {
    const { moduleId, title, description } = req.body;

    // handle errors for userids
    const module = await Module.findById(moduleId);
    if (!module) return res.status(400).json({ message: "module not found" });

    // create new test
    const test = new Test({
      moduleId,
      title,
      description,
      contents: []
    });

    //save the new test
    await test.save();

    res.status(201).json({ message: "test has been created" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = createTest;