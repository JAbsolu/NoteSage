const getQuizzes = require("../../controllers/read/getQuizzes");
const express = require("express");
const authMiddleWare = require("../../middleware/index");

const router = express.Router();

router.get("/", getQuizzes);

module.exports = router;