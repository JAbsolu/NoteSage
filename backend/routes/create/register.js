const express = require("express");
const register = require("../../controllers/create/register");

const router = express.Router();

router.post("/", register);

module.exports = router;