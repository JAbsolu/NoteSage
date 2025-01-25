const getUser = require("../../controllers/read/getUser");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", getUser);

module.exports = router;