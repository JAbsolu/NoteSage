const updatePaper = require("../../controllers/update/updatePaper");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.put("/", updatePaper);

module.exports = router;