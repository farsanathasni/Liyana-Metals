const express = require("express");
const router = express.Router();

const { createOrder, verifyPayment  } = require("../controller/razorpayController");

// create Razorpay order
router.post("/create", createOrder);

// verify payment
router.post("/verify", verifyPayment );

module.exports = router;