const express = require("express");
const updateTask = require("../../controllers/update/updateTask");
const router = express.Router();

router.put("/", updateTask);

module.exports = router;