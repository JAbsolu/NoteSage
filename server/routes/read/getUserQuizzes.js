const express = require("express");
const getUserQuizzes = require("../../controllers/read/getUserQuizzes");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", authMiddleware, getUserQuizzes);

module.exports = router;
