const MultipleChoice = require("../../models/MultipleChoice");

const getChoices = async (req, res) => {
  try{
    const choices = await MultipleChoice.find();

    if (choices.length > 0) {
      res.status(200).json({ message: "all multiple choices retrieved ", data: choices})
    } else {
      res.status(200).json({ message: "no multiple choices found", data: [] });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getChoices;