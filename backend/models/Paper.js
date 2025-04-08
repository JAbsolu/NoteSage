const { default: mongoose } = require("mongoose");
const User = require("./User");
const Module = require("./Module");

const PaperSchema = new mongoose.Schema({
  paperId: { type: mongoose.Schema.Types.ObjectId, ref: "Paper" },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  title: {
    type: String,
    required: true,
  },
  body: String,
  feedback: Map,
});

// create the model
const Paper = mongoose.model("Paper", PaperSchema);

module.exports = Paper;