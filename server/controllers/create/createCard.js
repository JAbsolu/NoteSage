const Card = require("../../models/Card");
const Deck = require("../../models/deck");
const User = require("../../models/User");
const Module = require("../../models/Module");

const createCard = async (req, res) => {
  try {

    const { userId, moduleId, deckId, front, back } = req.body;
    const user = await User.findById(userId);
    const module = await Module.findById(moduleId);
    const deck = await Deck.findById(deckId);

    // error handling for user and deck
    if (!user) return res.status(400).json({ message: "user not found" });
    if (!module) return res.status(400).json({ message: "module not found" });
    if (!deck) return res.status(400).json({ message: "deck not found" });

    // create the new card
    const newCard = new Card({
      userId,
      moduleId,
      deckId,
      front,
      back
    });

    await newCard.save();

    res.status(201).json({ message: "Card created succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating the card", error: err.message });
  }
}

module.exports = createCard;