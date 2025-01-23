const { default: mongoose, model } = require("mongoose");

const TestSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  title: String,
  description: String,
  contents: []
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;