const express = require("express");
const createPaper = require("../../controllers/create/createPaper");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.post("/", createPaper);

module.exports = router;