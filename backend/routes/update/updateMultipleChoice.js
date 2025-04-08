const express = require("express");
const updateMultipleChoice = require("../../controllers/update/updateMultipleChoice");
const authMiddleware = require("../../middleware");

const router = express.Router();

router.put("/", updateMultipleChoice);

module.exports = router;