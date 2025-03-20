const Card = require("../../models/Card");
const Deck = require("../../models/Deck");
const Module = require("../../models/Module");
const MultipleChoice = require("../../models/MultipleChoice");
const Quiz = require("../../models/Quiz");

const getModules = async (req, res) => {
  try {
    // get modules
    const modules = await Module.find();
    modules.forEach(async (module) => {
      // add quizzes and decks to modules
      const moduleId = module._id;
      const quizzes = await Quiz.find({ moduleId: moduleId });
      const decks = await Deck.find({ moduleId: moduleId });
      if (quizzes.length > 0) module.quizzes = [...quizzes]
      if (decks.length > 0) module.decks = [...decks]
      await module.save();
      
      // add multiple choices to quiz's contents
      quizzes.forEach(async (quiz) => {
        const quizId = quiz._id;
        const choices = await MultipleChoice.find({ quizId: quizId });
        if (choices.length > 0) quiz.contents = [...choices];
        await quiz.save();
      })
      
      // add cards to deck's contents
      decks.forEach( async (deck) => {
        const deckId = deck._id;
        const cards = Card.find({ deckId: deckId });
        if (cards.length > 0) deck.contents = [...cards];
        await deck.save();
      })
    });

    if (modules.length > 0) { 
      res.status(200).json({ message: "all modules retrieved", data: modules });
    } else {
      res.status(200).json({ message: "no modules found", data: [] });
    }

  } catch (err) {
    res.status(404).json({ message: "not found", error: err.message });
  }
}

module.exports = getModules;