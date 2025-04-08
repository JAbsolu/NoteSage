const express = require("express");
const createCard = require("../../controllers/create/createCard");
const authMiddleware = require("../../middleware");

// get express router
const router = express.Router();

//make post request to create card
router.post("/", authMiddleware, createCard);

module.exports = router;