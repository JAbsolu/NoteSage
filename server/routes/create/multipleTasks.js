const creTateManyTasks = require("../../controllers/create/createMultipleTasks");
const express = require("express");
const router = express.Router();

router.post("/", creTateManyTasks);

module.exports = router;