const MultipleChoice = require("../../models/MultipleChoice");


const updateMultipleChoice = async (req, res) => {
  try {
    const { id } = req.query;
    const { question, choices } = req.body;

    //validate user and card id
    const multiplechoice = await MultipleChoice.findById(id);
    if (!multiplechoice) return res.status(400).json({ message: "invalid multiple choice id" });

    //create filter
    const filter = { _id: id };
    const update = { question: question, choices: choices };

    await MultipleChoice.findOneAndUpdate(filter, update);
    const updatedMultipleChoice = await MultipleChoice.findOne(filter);

    res.status(200).json({ message: "multiple choice has been updated", update: updatedMultipleChoice });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = updateMultipleChoice;