const Card = require("../../models/Card");
const Deck = require("../../models/Deck")

const updateCard = async (req, res) => {
  try {
    const { cid, did } = req.query;
    const { front, back } = req.body;

    //validate user and card id
    const card = await Card.findById(cid);
    const deck = await Deck.findById(did);

    if (!card) return res.status(400).json({ message: "invalid card id" });
    if (!deck) return res.status(400).json({ message: "invalid deck id" });

    //create filter
    const filter = { _id: cid, deckId: did };
    const update = { front: front, back: back };

    await Card.findOneAndUpdate(filter, update);

    const updatedCard = await Card.findOne(filter);

    res.status(200).json({ message: "card updated", update: updatedCard });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = updateCard;