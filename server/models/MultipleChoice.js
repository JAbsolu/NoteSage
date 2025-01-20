const { default: mongoose } = require("mongoose");
const UserSchema = require("./User");
const ModuleSchema = require("./Module");

const MultipleChoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserSchema },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: ModuleSchema },
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: Map,
    required: true,
  },
});

module.exports = MultipleChoiceSchema;

// the map for choices will set up as written bellow, below is a test code
/*

const choice = {
  A : { correct: false, text : "Yes that is correct"}
}

choice.A.correct ? console.log(choice.A.text, ", is the correct answer!") : console.log(choice.A.text, "is incorrect!")
*/