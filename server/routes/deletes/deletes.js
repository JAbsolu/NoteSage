const deletes = require("../../controllers/delete/deletes");
const express = require("express");
const router = express.Router();

router.delete("/delete-user", deletes.deleteUser);
router.delete("delete-user-info", deletes.deleteUserInfo);
router.delete("/delete-module", deletes.deleteModule);
router.delete("/delete-deck", deletes.deleteDeck);
router.delete("/delete-card", deletes.deleteCard);
router.delete("/delete-quiz", deletes.deleteQuiz);
router.delete("/delete-multiplechoice", deletes.deleteMultipleChoice);
router.delete("/delete-paper", deletes.deletePaper);
router.delete("/delete-task", deletes.deleteTask);

module.exports = router;