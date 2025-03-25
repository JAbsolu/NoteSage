const userDecks = require("../../controllers/read/getUserDecks");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", authMiddleware, userDecks);

module.exports = router;