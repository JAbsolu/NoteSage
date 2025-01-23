const { default: mongoose } = require("mongoose");


const DeckSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  title: String,
  description: String,
  contents: [],
  public: Boolean,
});

// create the model
const Deck = mongoose.model("Deck", DeckSchema);

module.exports = Deck;