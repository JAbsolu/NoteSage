const Deck = require("../../models/Deck");
const Card = require("../../models/Card");

const getDecks = async (req, res) => {
  try {
    //find decks
    const decks = await Deck.find()

    if (decks.length > 0) {
      res.status(200).json({ message: "all decks retrieved", data: decks });
    } else {
      res.status(200).json({ message: "no decks found", data: [] });
    }

  } catch (err) {
    res.status(404).json({ message: "unable to fetch data", error: err.message });
  }
}

module.exports = getDecks;