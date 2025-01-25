const getChoices = require("../../controllers/read/getMchoices");
const express = require("express");
// const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", getChoices);

module.exports = router;