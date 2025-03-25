const { default: mongoose } = require("mongoose");

const MultipleChoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: Map,
    required: true,
  },
});

// create the model
const MultipleChoice = mongoose.model("MultipleChoice", MultipleChoiceSchema);

module.exports = MultipleChoice;