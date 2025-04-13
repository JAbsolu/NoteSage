const getNotifications = require("../../controllers/read/getNotifications");
const express = require("express");
const authMiddleWare = require("../../middleware/index");

const router = express.Router();

router.get("/", getNotifications);

module.exports = router;