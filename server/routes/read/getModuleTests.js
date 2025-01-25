const express = require("express");
const getModuleTests = require("../../controllers/read/getModuleTests");
const authMiddleware = require("../../middleware");

const router = express.Router();

router.get("/", getModuleTests);

module.exports = router;