const express = require("express");
const deckController = require("../../controllers/create/createDeck");

const router = express.Router();

router.post("/", deckController);

module.exports = router;