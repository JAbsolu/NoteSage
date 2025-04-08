const moduleController = require("../../controllers/create/createModule");
const express = require("express");

const router = express.Router();

router.post("/", moduleController);

module.exports = router;