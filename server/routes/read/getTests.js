const getTests = require("../../controllers/read/getTests");
const express = require("express");
const authMiddleWare = require("../../middleware/index");

const router = express.Router();

router.get("/", getTests);

module.exports = router;