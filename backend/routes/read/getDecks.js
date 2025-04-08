const decks = require("../../controllers/read/getDecks");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", authMiddleware, decks);

module.exports = router;