const { default: mongoose } = require("mongoose");
const DeckSchema = require("./deck");

const CardSchema = new mongoose.Schema({
  deckId: { type: mongoose.Schema.Types.ObjectId, ref: Deck },
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
});

module.exports = CardSchema;