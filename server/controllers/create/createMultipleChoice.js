const MultipleChoice = require("../../models/MultipleChoice");
const Quiz = require("../../models/Quiz");


const createMultipleChoice = async (req, res) => {
  try {
    const { quizId, question, choices } = req.body;

    // error handling for ids
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(400).json({ message: "quiz not found "});

    // create new multiple choice
    const multipleChoice = new MultipleChoice({
      quizId,
      question,
      choices: {
        "A": null,
        "B": null,
        "C": null,
        "D": null
      }
    });

    // save the multiple choice
    await multipleChoice.save();

    res.status(201).json({ message: "multiple choice created" })

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = createMultipleChoice;