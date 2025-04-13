const express = require("express");
const createNotificationList = require("../../controllers/create/createnotification");

const router = express.Router();

router.post("/", createNotificationList);

module.exports = router;