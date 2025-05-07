const generateByAi = require("../../controllers/openai/index.js");
const express = require("express");
const router = express.Router();

router.post("/", generateByAi);

module.exports = router;