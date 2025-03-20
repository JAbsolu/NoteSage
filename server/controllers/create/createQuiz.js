const Quiz = require("../../models/Quiz");
const Module = require("../../models/Module");

const createQuiz = async (req, res) => {
  try {
    const { moduleId, title, description } = req.body;

    // handle errors for userids
    const module = await Module.findById(moduleId);
    if (!module) return res.status(400).json({ message: "module not found" });

    // create new Quiz
    const quiz = new Quiz({
      moduleId,
      title,
      description,
      contents: []
    });

    //save the new Quiz
    await quiz.save();

    res.status(201).json({ message: "Quiz has been created" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = createQuiz;