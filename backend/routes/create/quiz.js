const createQuiz = require("../../controllers/create/createQuiz");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.post("/", createQuiz);

module.exports = router;