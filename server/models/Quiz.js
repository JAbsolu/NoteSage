const { default: mongoose, model } = require("mongoose");

const QuizSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  title: String,
  description: String,
  contents: []
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;