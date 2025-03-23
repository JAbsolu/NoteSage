const Quiz = require("../../models/Quiz");

const updateQuiz = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, description } = req.body;

    //validate user and card id
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(400).json({ message: "invalid quiz id" });

    //create filter
    const filter = { _id: id };
    const update = { title: title, description: description };

    await Quiz.findOneAndUpdate(filter, update);
    const updatedQuiz = await Quiz.findOne(filter);

    res.status(200).json({ message: "Quiz has been updated", update: updatedQuiz });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = updateQuiz;