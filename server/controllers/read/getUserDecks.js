const Deck = require("../../models/Deck");

const getUserDecks = async (req, res) => {
  try {
    const { id } = req.query;

    const decks = await Deck.find({ _id: id})

    if (decks.length === 0) return res.status(200).json({ message: `no decks found for user ${id}`, data: decks });

    res.status(200).json({ message: "user decks fetched", data: decks });

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = getUserDecks;