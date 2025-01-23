const getUserDecks = require("../../controllers/read/getUserDecks");
const express = require("express");
// const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", getUserDecks);

module.exports = router;