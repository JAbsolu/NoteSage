const getCards = require("../../controllers/read/getCards");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", getCards);

module.exports = router;