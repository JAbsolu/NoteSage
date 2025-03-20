const express = require("express");
const getModuleQuizzes = require("../../controllers/read/getModuleQuizzes");
const authMiddleware = require("../../middleware");

const router = express.Router();

router.get("/", authMiddleware, getModuleQuizzes);

module.exports = router;