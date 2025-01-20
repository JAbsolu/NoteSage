const { default: mongoose } = require("mongoose");
const UserSchema = require("./User");

const DeckSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: UserSchema },
  title: String,
  description: String,
  cards: Array,
  isPublic: Boolean,
});

module.exports = DeckSchema;