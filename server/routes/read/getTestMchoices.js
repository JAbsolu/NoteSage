const getTestMchoices = require("../../controllers/read/getTestMchoices");
const express = require("express");
const authMiddleWare = require("../../middleware/index");

const router = express.Router();

router.get("/", getTestMchoices);

module.exports = router;