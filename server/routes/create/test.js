const createTest = require("../../controllers/create/createTest");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.post("/", createTest);

module.exports = router;