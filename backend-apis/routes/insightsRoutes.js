const express = require("express");
const {
  saveCodeInsights,
  getCodeInsights,
  deleteCodeInsight,
} = require("../controllers/insightsController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/save/:userId", authMiddleware, saveCodeInsights);
router.get("/:userId", authMiddleware, getCodeInsights);
router.delete("/:id", authMiddleware, deleteCodeInsight);

module.exports = router;
