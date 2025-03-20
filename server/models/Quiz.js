const { default: mongoose, model } = require("mongoose");

const QuizSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  title: String,
  description: String,
  contents: []
});

const Quiz = mongoose.model("Test", QuizSchema);

module.exports = Quiz;