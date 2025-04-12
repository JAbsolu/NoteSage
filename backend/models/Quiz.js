const { default: mongoose, model } = require("mongoose");

const QuizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  title: String,
  description: String,
  contents: [],
  public: Boolean
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;