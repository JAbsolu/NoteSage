const { default: mongoose } = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  decks: [],
  tests: [],
  public: Boolean,
});


// create the model
const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;