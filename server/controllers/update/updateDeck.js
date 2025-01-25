const Deck = require("../../models/Deck");

const updateDeck = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, description, public } = req.body;

    //validate user and card id
    const deck = await  Deck.findById(id);
    if (!deck) return res.status(400).json({ message: "invalid deck id" });

    //create filter
    const filter = { _id: id };
    const update = { title: title, public: public, description: description };

    await Deck.findOneAndUpdate(filter, update);
    const updatedDeck = await Deck.findOne(filter);

    res.status(200).json({ message: "deck has been updated", update: updatedDeck });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = updateDeck;