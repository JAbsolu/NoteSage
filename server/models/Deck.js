const { default: mongoose } = require("mongoose");

const DeckSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  title: String,
  description: String,
  cards: Array,
  public: Boolean,
});

// create the model
const Deck = mongoose.model("Deck", DeckSchema);

module.exports = Deck;