const Card = require("../../models/Card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find();

    if (cards.length > 0) {
      return res.status(200).json({ message: "all cards retrieved ", data: cards })
    } else {
      return res.status(200).json({ message: "no cards found", data: [] });
    }

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getCards;