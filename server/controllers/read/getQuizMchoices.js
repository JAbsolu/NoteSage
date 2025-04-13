const MultipleChoice = require("../../models/MultipleChoice");
const Quiz = require("../../models/Quiz");

const getTestChoices = async (req, res) => {
  try {
    const { id } = req.query;
    //check if a test exists with this id
    const quiz = await Quiz.findById(id);
    if (!quiz) return quiz.status(400).json({ message: "invalid quiz id" });

    const choices = await MultipleChoice.find({ quizId: id });

    if (choices.length > 0) {
      res.status(200).json({ message: `Fetch all questions for quiz ${quiz.title}`, data: choices });
    } else {
      res.status(200).json({ message: `no questions found for ${quiz.title}`, data: choices });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getTestChoices; 
