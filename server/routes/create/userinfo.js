const express = require("express");
const authMiddleware = require("../../middleware/index");
const addUserInfo = require("../../controllers/create/addUserInfo");

const router = express.Router();

router.post("/", addUserInfo);

module.exports = router;