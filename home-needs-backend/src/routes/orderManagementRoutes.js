const express = require("express");
const router = express.Router();

const { getAllOrder, updateOrderStatus, deleteOrder } = require("../controller/aOrderManagenentController");
const protect = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/authMiddleware");

router.get("/", protect, adminOnly, getAllOrder);
router.patch("/:id", protect, adminOnly, updateOrderStatus);
router.delete("/:id", protect, adminOnly, deleteOrder);

module.exports = router;
