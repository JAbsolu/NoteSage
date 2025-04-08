const getDeckCards = require("../../controllers/read/getDeckCards");
const express = require("express");
// const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", getDeckCards);

module.exports = router;