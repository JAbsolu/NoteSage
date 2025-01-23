const { default: mongoose } = require("mongoose");

const MultipleChoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
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

// the map for choices will set up as written bellow, below is a test code
/*

const choice = {
  A : { correct: false, text : "Yes that is correct"}
}

choice.A.correct ? console.log(choice.A.text, ", is the correct answer!") : console.log(choice.A.text, "is incorrect!")
*/