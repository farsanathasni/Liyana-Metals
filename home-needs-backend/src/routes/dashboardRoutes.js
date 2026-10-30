const express = require("express");
const router = express.Router();

const { getDashboard, getEarnings } = require("../controller/aDashboardController");
const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/authMiddleware");

router.get("/", getDashboard);
router.get("/earnings", protect, adminOnly, getEarnings);

module.exports = router;
