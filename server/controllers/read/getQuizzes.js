const Quiz = require("../../models/Quiz");

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    if (quizzes.length > 0) {
      res.status(200).json({ message: `all tests have been retrieved`, data: quizzes });
    } else {
      res.status(200).json({ message: `no tests choices found` });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getQuizzes;