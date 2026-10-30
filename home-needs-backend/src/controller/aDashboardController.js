const User = require("../model/user");
const Products = require("../model/products");
const Order = require("../model/order");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Products.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate revenue ONLY from successfully paid orders
    const revenue = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
    ]);

    const totalRevenue = revenue[0]?.totalRevenue || 0;

    const chartData = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: "$items.quantity" },
        },
      },
      {
        $project: {
          name: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      chartData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEarnings = async (req, res) => {
  try {
    const { filter } = req.query; // 'today', 'week', 'month', 'all'
    const now = new Date();
    let dateFilter = {};

    if (filter === "today") {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      dateFilter = { createdAt: { $gte: startOfDay } };
    } else if (filter === "week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);
      dateFilter = { createdAt: { $gte: startOfWeek } };
    } else if (filter === "month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      dateFilter = { createdAt: { $gte: startOfMonth } };
    }

    // 1. Total Orders in timeframe
    const totalOrders = await Order.countDocuments(dateFilter);

    // 2. Aggregate metrics by paymentStatus
    const statusMetrics = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
          amount: { $sum: "$total" },
        },
      },
    ]);

    let totalRevenue = 0;
    let totalPaidOrders = 0;
    let pendingCount = 0;
    let pendingAmount = 0;
    let failedCount = 0;
    let failedAmount = 0;
    let refundedCount = 0;
    let refundedAmount = 0;

    statusMetrics.forEach((m) => {
      const status = (m._id || "").toLowerCase();
      if (status === "paid") {
        totalRevenue = m.amount;
        totalPaidOrders = m.count;
      } else if (status === "pending") {
        pendingCount = m.count;
        pendingAmount = m.amount;
      } else if (status === "failed") {
        failedCount = m.count;
        failedAmount = m.amount;
      } else if (status === "refunded") {
        refundedCount = m.count;
        refundedAmount = m.amount;
      }
    });

    // 3. Orders list in timeframe
    const orders = await Order.find(dateFilter)
      .populate("userId", "name email")
      .populate("items.productId", "name price image")
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      filter: filter || "all",
      totalRevenue,
      totalPaidOrders,
      pendingPayments: {
        count: pendingCount,
        amount: pendingAmount,
      },
      failedPayments: {
        count: failedCount,
        amount: failedAmount,
      },
      refundedAmount,
      refundedCount,
      totalOrders,
      orders,
    });
  } catch (error) {
    console.error("Earnings API Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, getEarnings };
