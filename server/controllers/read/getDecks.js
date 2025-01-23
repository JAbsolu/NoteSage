const Deck = require("../../models/Card");

const getDecks = async (req, res) => {
  try {
    //find decks
    const decks = await Deck.find()

    res.status(200).json({ data: decks });

  } catch (err) {
    res.status(404).json({ message: "unable to fetch data", error: err.message });
  }
}

module.exports = getDecks;