const Card = require("../../models/Card")
const Deck = require("../../models/Deck")
const Module = require("../../models/Module")
const MultipleChoice = require("../../models/MultipleChoice")
const Paper = require("../../models/Paper")
const Quiz = require("../../models/Quiz")
const User = require("../../models/User")
const UserInfo = require("../../models/UserInfo")

// delete user
exports.deleteUser = async(req, res) => {
  try {
    const { id } = req.body;

    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      res.status(400).json({ message: `the user ${id} is not found`});
      return;
    }

    res.status(200).json({ message: `user ${id} has been deleted \n ${deletedUser}`});

  } catch (error) {
    res.status(500).json({ message: error });
  }
}


//delete user modukes
exports.deleteModule = async(req, res) => {
  try {
    const { id } = req.query;

    const deletedModule = await Module.findOneAndDelete({ _id: id })

    if (!deletedModule) {
      res.status(400).json({ message: `module ${id} has been deleted` });
      return;
    }

    res.status(200).json({  message: `module ${id} has been deleted` });

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

//delete decks
exports.deleteDeck = async(req, res) => {
  try {
    const { id } = req.query;

    const deletedDeck = await Deck.findOneAndDelete({ _id: id });

    if (!deletedDeck) {
      res.status(404).json({ message: `the deck ${id} is not found`});
      return;
    }
    res.status(200).json({ message: `deck ${id} has been deleted \n ${deletedDeck}`});

  } catch(error) {
    res.status(500).json({ message: error });
  }
}

//delete card
exports.deleteCard = async(req, res) => {
  try {
    const { id } = req.query;

    const deletedCard = await Card.findOneAndDelete({ _id: id });

    if (!deletedCard) {
      res.status(404).json({ message: `the flashcard ${id} is not found`});
      return;
    }
    res.status(200).json({ message: `flashcard ${id} has been deleted \n ${deletedCard}`});

  } catch(error) {
    res.status(500).json({ message: error });
  }
}

//delete multiplechoice
exports.deleteMultipleChoice = async(req, res) => {
  try {
    const { id } = req.query;

    const deletedMultipleChoice = await MultipleChoice.findOneAndDelete({ _id: id });

    if (!deletedMultipleChoice) {
      res.status(400).json({ message: `the multiplechoice ${id} is not found`});
      return;
    }

    res.status(200).json({ message: `multiplechoice ${id} has been deleted` });

  } catch (error) {
    console.log(error);
  }
}

//delete paper
exports.deletePaper = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedPaper = await Paper.findOneAndDelete({ _id: id });

    if (!deletedPaper) {
      res.status(400).json({ message: `the paper ${id} is not found`});
      return;
    }

    res.status(200).json({ message: `paper ${id} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

//delete Quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedQuiz = await Quiz.findOneAndDelete({ _id: id });

    if (!deletedQuiz) {
      res.status(400).json({ message: `the quiz ${id} is not found`});
      return;
    }

    res.status(200).json({ message: `quiz ${id} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

//delete user info
exports.deleteUserInfo = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedUserInfo = await UserInfo.findOneAndDelete({ _id: id });

    if (!deletedUserInfo) {
      res.status(400).json({ message: `the user info ${id} is not found`});
      return;
    }

    res.status(200).json({ message: `user info ${id} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}