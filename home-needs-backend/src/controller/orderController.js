const Order = require("../model/order");

const placeOrder = async (req, res) => {
  try {
    const { userId, items, total, customer, payment, status, paymentStatus } = req.body;

    const order = await Order.create({
      userId,
      items: (items || []).map((i) => ({
        productId: i.productId?._id || i.productId,
        name: i.name || i.productId?.name,
        image: i.image || i.productId?.image,
        price: Number(i.price || i.productId?.price || 0),
        quantity: Number(i.quantity || 1),
      })),
      total,
      customer,
      payment: payment || "COD",
      paymentStatus: paymentStatus || "pending",
      status: status || "placed",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: error.message || "Place order error" });
  }
};

const getToOrder = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Verify ownership or admin
    if (
      req.user &&
      order.userId &&
      order.userId._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { placeOrder, getToOrder, getOrderById };
