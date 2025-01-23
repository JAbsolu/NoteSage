const Module = require("../../models/Module");
const Deck = require("../../models/Deck");
const { default: mongoose } = require("mongoose");

const getUserDecks = async (req, res) => {
  try {
    const { id } = req.query;

    //error handling for id
    const module = await Module.findById(id);
    if (!module) return res.status(400).json({ message: "provide a valid module id" })
    
    //get user decks
    const userDecks = await Deck.find({ moduleId: id })

    if (userDecks.length > 0) {
      res.status(200).json({ message: "decks have been retrieved", data: userDecks });
    } else {
      res.status(200).json({ message: "No decks found", data: [] });
    }

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getUserDecks;