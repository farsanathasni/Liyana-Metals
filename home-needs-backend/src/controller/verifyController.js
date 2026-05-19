const crypto = require("crypto");
const Order = require("../models/orderModel");

const verifyPayment = async (req, res) => {
  try {
    const {
      order_id,
      payment_id,
      signature,
      userId,
      customer,
      payment,
      cartItems,
      total
    } = req.body;

    // 🔥 verify signature
    const body = order_id + "|" + payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.PAYMENT_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // ✅ SAVE ORDER ONLY AFTER SUCCESS
    const order = await Order.create({
      userId,
      items: cartItems,
      customer,
      total,
      payment,
      paymentStatus: "paid",
      transactionId: payment_id,
      status: "placed"
    });

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyPayment };