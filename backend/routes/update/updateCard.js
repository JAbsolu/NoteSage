const updateCard = require("../../controllers/update/updateCard");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.put("/", updateCard);

module.exports = router;