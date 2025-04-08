const papers = require("../../controllers/read/getPapers");
const express = require("express");
const authMiddleWare = require("../../middleware/index");

const router = express.Router();

router.get("/", papers);

module.exports = router;