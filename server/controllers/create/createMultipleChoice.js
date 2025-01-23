const MultipleChoice = require("../../models/MultipleChoice");
const User = require("../../models/User");
const Module = require("../../models/Module");
const Test = require("../../models/Test");


const createMultipleChoice = async (req, res) => {
  try {
    const { userId, moduleId, testId, question, choices } = req.body;

    // error handling for ids
    const user = await User.findById(userId);
    const module = await Module.findById(moduleId);
    const test = await Test.findById(testId);

    if (!user) return res.status(400).json({ message: "user not found" });
    if (!module) return res.status(400).json({ message: "module not found "});
    if (!test) return res.status(400).json({ message: "test not found "});

    // create new multiple choice
    const multipleChoice = new MultipleChoice({
      userId,
      moduleId,
      testId,
      question,
      choices
    });

    // save the multiple choice
    await multipleChoice.save();

    res.status(201).json({ message: "multiple choice created" })

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = createMultipleChoice;