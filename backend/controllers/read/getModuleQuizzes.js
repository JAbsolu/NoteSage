const Quiz = require("../../models/Quiz");

const getModuleQuizzes = async (req, res) => {
  try {
    const { id } = req.query;
    const moduleQuizzes = await Quiz.find({ moduleId : id });

    if (moduleQuizzes.length > 0) {
      res.status(200).json({ message: `all module quizzes have been retrieved`, data: moduleQuizzes });
    } else {
      res.status(200).json({ message: `no module quizzes choices found` });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getModuleQuizzes;