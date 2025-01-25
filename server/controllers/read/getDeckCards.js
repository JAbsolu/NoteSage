const Deck = require("../../models/Deck");
const Card = require("../../models/Card");

const getDeckCards = async (req, res) => {
  try {
    const { id } = req.query;

    // handle errors for id
    const deck = await Deck.findById(id);
    if (!deck) return res.status(400).json({ message: "invalid deck id"});

    const cards = await Card.find({ deckId: id });

    if (cards.length > 0) {
      return res.status(200).json({ message: "all cards retrieved ", data: cards })
    } else {
      return res.status(200).json({ message: "no cards found", data: [] });
    }

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getDeckCards;