const MultipleChoice = require("../../models/MultipleChoice");
const Quiz = require("../../models/Quiz");

const getTestChoices = async (req, res) => {
  try {
    const { id } = req.query;
    //check if a test exists with this id
    const quiz = await Quiz.findById(id);
    if (!quiz) return quiz.status(400).json({ message: "invalid test id" });

    const choices = await MultipleChoice.find({ testId: id });

    if (choices.length > 0) {
      res.status(200).json({ message: `all multiple choices for the test ${quiz.title} have been retrieved` });
    } else {
      res.status(200).json({ message: `no multiple choices found` });
    }
  } catch (err) {

  }
}

module.exports = getTestChoices; 