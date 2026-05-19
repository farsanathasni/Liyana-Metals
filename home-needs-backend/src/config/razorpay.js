const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.PAYMENT_KEY,
  key_secret: process.env.PAYMENT_KEY_SECRET,
});

module.exports = instance;