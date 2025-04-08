const express = require("express");
const updateUser = require("../../controllers/update/updateUser");
const authMiddleware = require("../../middleware");

const router = express.Router();

router.put("/", updateUser);

module.exports = router;