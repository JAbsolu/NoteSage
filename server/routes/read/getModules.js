const modules = require("../../controllers/read/getModules");
const express = require("express");
const authMiddleWare = require("../../middleware/index");

const router = express.Router();

router.get("/", modules);

module.exports = router;