const sendEmail = require("../../controllers/email/index");
const express = require("express");
const router = express.Router();

router.post("/", sendEmail);

module.exports = router;