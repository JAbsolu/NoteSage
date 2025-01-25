const getUsers = require("../../controllers/read/getUsers");
const express = require("express");
const authMiddleware = require("../../middleware/index");

const router = express.Router();

router.get("/", getUsers);

module.exports = router;