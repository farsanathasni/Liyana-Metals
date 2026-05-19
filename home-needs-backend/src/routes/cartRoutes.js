const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getToCart,
  removeToCart,
  updateToCart
} = require("../controller/cartController");

router.get("/:userId", protect, getToCart);
router.post("/add", protect, addToCart);
router.put("/update/:id", protect, updateToCart);
router.delete("/delete/:id", protect, removeToCart);

module.exports = router;