const Card = require("../../models/Card");
const Deck = require("../../models/Deck");

const createCard = async (req, res) => {
  try {

    const { deckId, front, back } = req.body;
    const deck = await Deck.findById(deckId);

    // error handling for user and deck
    if (!deck) return res.status(400).json({ message: "deck not found" });

    // create the new card
    const newCard = new Card({
      deckId,
      front,
      back
    });

    await newCard.save();

    //add the card to deck's contents, then save
    deck.contents.push(newCard);
    await deck.save();

    res.status(201).json({ message: "Card created succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating the card", error: err.message });
  }
}

module.exports = createCard;