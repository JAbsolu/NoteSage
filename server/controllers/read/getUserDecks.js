const User = require("../../models/User");
const Deck = require("../../models/Deck");

const getUserDecks = async (req, res) => {
  try {
    const { user_id } = req.params;

    //error handling for id
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "user not logged in" });

    //get user decks
    const userDecks = await Deck.find({ userId : user_id });

    res.status(200).json({ data: userDecks });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getUserDecks;