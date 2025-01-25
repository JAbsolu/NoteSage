const express = require("express");
const getUserInfo = require("../../controllers/read/getUserInfo");
const authMiddleware = require("../../middleware");

const router = express.Router();

router.get("/", getUserInfo);

module.exports = router;