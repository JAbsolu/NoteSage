const { default: mongoose, model } = require("mongoose");

const TestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  title: String,
  description: String
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;