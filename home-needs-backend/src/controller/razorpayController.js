const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../model/order");

const getPriceNumber = (price) => {
  if (!price) return 0;
  return Number(price.toString().replace(/[^0-9.-]+/g, "")) || 0;
};

const createOrder = async (req, res) => {
  try {
    const { cart, userId, grandTotal } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let calculatedTotal = 0;
    cart.forEach((item) => {
      const price = getPriceNumber(item.productId?.price || item.price);
      const quantity = Number(item.quantity || 1);
      calculatedTotal += price * quantity;
    });

    // Add delivery fee if applicable (< 999 is 99) or use grandTotal passed if valid
    const finalAmount = grandTotal && Number(grandTotal) > 0 ? Number(grandTotal) : (calculatedTotal >= 999 ? calculatedTotal : calculatedTotal + 99);

    const options = {
      amount: Math.round(finalAmount * 100), // paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, total: finalAmount });
  } catch (err) {
    console.error("Razorpay createOrder error:", err);
    res.status(500).json({ message: err.message || "Failed to create Razorpay order" });
  }
};

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
      total,
    } = req.body;

    // 1️⃣ Verify HMAC SHA256 signature
    const body = order_id + "|" + payment_id;
    const expected = crypto
      .createHmac("sha256", process.env.PAYMENT_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // 2️⃣ Save verified order to DB
    const order = await Order.create({
      userId,
      items: (cartItems || []).map((i) => ({
        productId: i.productId?._id || i.productId,
        name: i.productId?.name || i.name || "Product",
        image: i.productId?.image || i.image || "",
        price: getPriceNumber(i.productId?.price || i.price),
        quantity: Number(i.quantity || 1),
      })),
      customer,
      total: Number(total || 0),
      payment: payment === "COD" ? "COD" : "Razorpay",
      paymentStatus: "paid",
      transactionId: payment_id,
      razorpayOrderId: order_id,
      status: "placed",
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({ message: err.message || "Payment verification failed" });
  }
};

const recordPaymentFailure = async (req, res) => {
  try {
    const {
      order_id,
      userId,
      customer,
      cartItems,
      total,
      payment,
      reason,
    } = req.body;

    const failedOrder = await Order.create({
      userId,
      items: (cartItems || []).map((i) => ({
        productId: i.productId?._id || i.productId,
        name: i.productId?.name || i.name || "Product",
        image: i.productId?.image || i.image || "",
        price: getPriceNumber(i.productId?.price || i.price),
        quantity: Number(i.quantity || 1),
      })),
      customer,
      total: Number(total || 0),
      payment: payment || "Razorpay",
      paymentStatus: "failed",
      razorpayOrderId: order_id,
      failureReason: reason || "Payment failed or declined by bank",
      status: "cancelled",
    });

    res.json({ success: false, order: failedOrder });
  } catch (err) {
    console.error("Record payment failure error:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, verifyPayment, recordPaymentFailure };
