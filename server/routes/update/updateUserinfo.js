const express = require("express");
const updateUserInfo = require("../../controllers/update/updateUserInfo");
const authMiddleware = require("../../middleware");

const router = express.Router();

router.put("/", updateUserInfo);

module.exports = router;