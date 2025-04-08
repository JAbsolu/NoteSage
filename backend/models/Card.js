const { default: mongoose } = require("mongoose");

const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: "Deck" },
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
});

// create the model
const Card = mongoose.model("Card", CardSchema);

module.exports = Card;