const express = require("express");
const getUserModules = require("../../controllers/read/getUserModules");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", authMiddleware, getUserModules);

module.exports = router;