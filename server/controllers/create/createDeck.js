const Deck = require("../../models/deck");
const Module = require("../../models/Module");
const User = require("../../models/User");

const createDeck = async (req, res) => {
  try {
    // get from body
    const { userId, moduleId, title, description, cards, public } = req.body;

    // error handling for ids
    const user = await User.findById(userId);
    const module = await Module.findById(moduleId);

    if (!user) return res.status(400).json({ message: "user not found" });
    if (!module) return res.status(400).json({ message: "module not found" });

    // create the new deck
    const deck = new Deck({
      userId,
      moduleId,
      title,
      description,
      cards: new Array(),
      public,
    });

    // save deck
    await deck.save();
    
    res.status(201).json({ message: "deck has been created" });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = createDeck;