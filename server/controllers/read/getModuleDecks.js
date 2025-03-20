const Deck = require("../../models/Deck");
const Module = require("../../models/Module");

const getModuleDecks = async (req, res) => {
  try {
    const { id } = req.query;
    // check if the id belongs to a module
    const module = await Module.findById(id);
    if (!module) return res.status(400).json({ message: "invalid module id "});

    //find decks
    const decks = await Deck.find({ moduleId: id });

    if (decks.length > 0) return res.status(200).json({ message: "all decks retrieved", data: decks });
    else return res.status(200).json({ message: "no decks found ", data: decks });

  } catch (err) {
    res.status(400).json({ message: "server error", error: err.message });
  }
}

module.exports = getModuleDecks;