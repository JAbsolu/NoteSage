const Card = require("../../models/Card");
const Deck = require("../../models/Deck");

const createCard = async (req, res) => {
  try {

    const { userId, deckId, front, back } = req.body;
    const deck = await Deck.findById({ _id: deckId });

    // error handling for user and deck
    if (!deck) return res.status(400).json({ message: "deck not found" });

    // create the new card
    const newCard = new Card({
      userId,
      deckId,
      front,
      back
    });

    await newCard.save();

    res.status(200).json({ message: `flashcard ${newCard._id} created succesfully`});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = createCard;