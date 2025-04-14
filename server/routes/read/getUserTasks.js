const getUserTasks = require("../../controllers/read/getUserTasks");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", authMiddleware, getUserTasks);

module.exports = router;