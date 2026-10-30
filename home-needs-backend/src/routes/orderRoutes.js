const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { placeOrder, getToOrder, getOrderById } = require("../controller/orderController");

router.post("/place", protect, placeOrder);
router.get("/details/:id", protect, getOrderById);
router.get("/:userId", protect, getToOrder);

module.exports = router;
