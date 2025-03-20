const getQuizzMchoices = require("../../controllers/read/getQuizMchoices");
const express = require("express");
const authMiddleWare = require("../../middleware/index");

const router = express.Router();

router.get("/", getQuizzMchoices);

module.exports = router;