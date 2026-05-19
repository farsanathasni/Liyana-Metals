const crypto = require("crypto");
const razorpay = require("../config/razorpay");

const createOrder = async (req, res) => {
  try {
    const { cart, userId } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    cart.forEach(item => {
      total += item.productId.price * item.quantity;
    });

    const options = {
      amount: total * 100, // paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, total });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;

    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const body = order_id + "|" + payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.PAYMENT_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    return res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, verifyPayment };