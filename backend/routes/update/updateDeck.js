const express = require("express");
const updateDeck = require("../../controllers/update/updateDeck");
const authMiddleware = require("../../middleware");

const router = express.Router();

router.put("/", updateDeck);

module.exports = router;