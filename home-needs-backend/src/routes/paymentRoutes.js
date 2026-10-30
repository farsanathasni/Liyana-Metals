const express = require("express");
const router = express.Router();

const { createOrder, verifyPayment, recordPaymentFailure } = require("../controller/razorpayController");

router.post("/create", createOrder);
router.post("/verify", verifyPayment);
router.post("/failure", recordPaymentFailure);

module.exports = router;
