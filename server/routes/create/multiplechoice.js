const express = require("express");
const multipleChoice = require("../../controllers/create/createMultipleChoice");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.post("/", multipleChoice);

module.exports = router;