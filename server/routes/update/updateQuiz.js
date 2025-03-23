const express = require("express");
const updateQuiz = require("../../controllers/update/updateQuiz");
const router = express.Router();

router.put("/", updateQuiz);

module.exports = router;