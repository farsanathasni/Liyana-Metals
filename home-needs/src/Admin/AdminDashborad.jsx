import React, { useEffect, useState, useCallback } from "react";
import {
  FaHome,
  FaUsers,
  FaBoxOpen,
  FaSignOutAlt,
  FaProductHunt,
  FaUserShield,
  FaRupeeSign,
  FaChartBar,
  FaStore,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUndo,
  FaFilter,
  FaCreditCard,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import api from "../Api/Axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Overview state
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active view: 'overview' or 'earnings'
  const [activeTab, setActiveTab] = useState("overview");

  // Earnings section state
  const [earningsFilter, setEarningsFilter] = useState("all"); // 'today' | 'week' | 'month' | 'all'
  const [earningsData, setEarningsData] = useState({
    totalRevenue: 0,
    totalPaidOrders: 0,
    pendingPayments: { count: 0, amount: 0 },
    failedPayments: { count: 0, amount: 0 },
    refundedAmount: 0,
    refundedCount: 0,
    totalOrders: 0,
    orders: [],
  });
  const [earningsLoading, setEarningsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // Fetch basic overview data
  useEffect(() => {
    let isMounted = true;
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/dashboard");
        if (isMounted) {
          setUsersCount(res.data.totalUsers || 0);
          setOrdersCount(res.data.totalOrders || 0);
          setProductsCount(res.data.totalProducts || 0);
          setTotalRevenue(res.data.totalRevenue || 0);
          setChartData(res.data.chartData || []);
        }
      } catch (error) {
        console.error("Dashboard API error:", error);
      }
    };
    fetchDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch earnings data from backend based on date filter
  const fetchEarningsData = useCallback(async (filter) => {
    try {
      setEarningsLoading(true);
      const res = await api.get(`/dashboard/earnings?filter=${filter}`);
      if (res.data) {
        setEarningsData(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch earnings:", err);
    } finally {
      setEarningsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarningsData(earningsFilter);
  }, [earningsFilter, fetchEarningsData]);

  const donutData = [
    { name: "Users", value: usersCount },
    { name: "Orders", value: ordersCount },
    { name: "Products", value: productsCount },
  ];

  const COLORS = ["#C05621", "#10B981", "#1E3A2F"];

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-5 py-3 bg-[#2A4E3F] rounded-xl font-semibold text-white shadow-xs transition-all"
      : "flex items-center gap-3 px-5 py-3 hover:bg-[#234437] rounded-xl text-emerald-100/80 hover:text-white font-medium transition-all";

  const getPaymentBadge = (paymentStatus) => {
    const p = (paymentStatus || "pending").toLowerCase();
    switch (p) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
            <FaCheckCircle className="text-[10px]" /> Paid
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-200">
            <FaTimesCircle className="text-[10px]" /> Failed
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-800 border border-purple-200">
            <FaUndo className="text-[10px]" /> Refunded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
            <FaClock className="text-[10px]" /> Pending
          </span>
        );
    }
  };

  const getFulfillmentBadge = (status) => {
    const s = (status || "placed").toLowerCase();
    switch (s) {
      case "delivered":
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">Delivered</span>;
      case "shipped":
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700">Shipped</span>;
      case "cancelled":
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700">Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800">Placed</span>;
    }
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between bg-[#1E3A2F] text-white px-5 py-3.5 fixed top-0 left-0 right-0 z-40 border-b border-emerald-900 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-xl font-bold p-1 rounded hover:bg-white/10"
          >
            ☰
          </button>
          <span className="font-extrabold text-base tracking-tight">Liyana Metals Admin</span>
        </div>
        <Link to="/" className="text-xs text-emerald-200 hover:text-white flex items-center gap-1 font-semibold">
          <FaStore /> Store
        </Link>
      </div>

      <div className="flex min-h-screen bg-[#FAF8F5]">
        
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static top-0 left-0 z-50
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            w-64 min-h-screen
            transition-transform duration-300
            bg-[#1E3A2F] text-white
            flex flex-col border-r border-[#274f3f]
          `}
        >
          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden absolute top-4 right-4 text-white text-xl font-bold"
          >
            ✕
          </button>

          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#2A4E3F] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <FaUserShield className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white">LIYANA METALS</h2>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                Admin Console
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1.5 mt-2">
            <NavLink to="/dashboard" className={linkStyle}>
              <FaHome className="text-lg" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/usermanagement" className={linkStyle}>
              <FaUsers className="text-lg" />
              <span>User Accounts</span>
            </NavLink>

            <NavLink to="/ordermanagement" className={linkStyle}>
              <FaBoxOpen className="text-lg" />
              <span>Orders & Sales</span>
            </NavLink>

            <NavLink to="/productsmanagement" className={linkStyle}>
              <FaProductHunt className="text-lg" />
              <span>Product Inventory</span>
            </NavLink>

            <div className="pt-4 mt-4 border-t border-[#2A4E3F]">
              <Link
                to="/"
                className="flex items-center gap-3 px-5 py-3 hover:bg-[#234437] rounded-xl text-emerald-100/80 hover:text-white font-medium text-sm transition-all"
              >
                <FaStore className="text-lg" />
                <span>Visit Storefront</span>
              </Link>
            </div>
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-[#2A4E3F]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 w-full rounded-xl bg-red-900/30 text-red-200 hover:bg-red-800/40 text-sm font-semibold transition-colors"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 mt-14 md:mt-0 max-w-7xl overflow-hidden">
          
          {/* Header & Tabs Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-stone-200/80">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {activeTab === "earnings" ? "Earnings & Financial Analytics" : "Executive Overview"}
              </h1>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                {activeTab === "earnings"
                  ? "Real-time revenue, verified paid transactions, refunds, and pending settlements."
                  : "Live metrics for customer registrations, inventory stocks, and order fulfillment."}
              </p>
            </div>

            {/* View Selector Tabs */}
            <div className="inline-flex p-1 bg-stone-200/80 rounded-2xl gap-1 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "overview"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("earnings")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "earnings"
                    ? "bg-[#1E3A2F] text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <FaFileInvoiceDollar />
                <span>Earnings Dashboard</span>
              </button>
            </div>
          </div>

          {/* ----------------- TAB 1: EXECUTIVE OVERVIEW ----------------- */}
          {activeTab === "overview" && (
            <div className="mt-8 space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Total Revenue (Paid)
                  </span>
                  <h2 className="text-3xl font-black text-[#1E3A2F] mt-2">
                    ₹{Number(totalRevenue || 0).toLocaleString("en-IN")}
                  </h2>
                  <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                    <FaCheckCircle className="text-[10px]" />
                    <span>Verified paid sales only</span>
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Total Orders
                  </span>
                  <h2 className="text-3xl font-black text-stone-900 mt-2">
                    {ordersCount}
                  </h2>
                  <p className="text-xs text-stone-500 font-medium mt-2">
                    All-time customer purchases
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Registered Users
                  </span>
                  <h2 className="text-3xl font-black text-stone-900 mt-2">
                    {usersCount}
                  </h2>
                  <p className="text-xs text-stone-500 font-medium mt-2">
                    Active customer accounts
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Catalogue Products
                  </span>
                  <h2 className="text-3xl font-black text-[#C05621] mt-2">
                    {productsCount}
                  </h2>
                  <p className="text-xs text-stone-500 font-medium mt-2">
                    Active catalogue SKUs
                  </p>
                </div>

              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Bar Chart */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs">
                  <h3 className="text-base font-bold text-stone-900 mb-6 flex items-center gap-2">
                    <FaChartBar className="text-[#1E3A2F]" />
                    <span>Sales & Order Activity</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1E3A2F",
                          borderRadius: "12px",
                          color: "#fff",
                          border: "none",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="count" fill="#1E3A2F" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Donut Chart */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs">
                  <h3 className="text-base font-bold text-stone-900 mb-6 flex items-center gap-2">
                    <FaBoxOpen className="text-[#C05621]" />
                    <span>Platform Distribution</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={donutData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={4}
                        label
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1E3A2F",
                          borderRadius: "12px",
                          color: "#fff",
                          border: "none",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

              </div>
            </div>
          )}

          {/* ----------------- TAB 2: EARNINGS DASHBOARD ----------------- */}
          {activeTab === "earnings" && (
            <div className="mt-8 space-y-8">
              
              {/* Date Filters Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                  <FaFilter className="text-[#1E3A2F]" />
                  <span>Timeframe Filter:</span>
                </div>

                <div className="grid grid-cols-2 sm:flex items-center gap-2">
                  {[
                    { id: "today", label: "Today" },
                    { id: "week", label: "This Week" },
                    { id: "month", label: "This Month" },
                    { id: "all", label: "All Time" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setEarningsFilter(btn.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        earningsFilter === btn.id
                          ? "bg-[#1E3A2F] text-white shadow-sm"
                          : "bg-[#FAF8F5] text-stone-700 hover:bg-stone-100 border border-stone-200/60"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {earningsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 border border-stone-200/80 h-32" />
                  ))}
                </div>
              ) : (
                <>
                  {/* 6 Key Earnings Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    
                    {/* 1. Total Revenue */}
                    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-[#1E3A2F]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Total Revenue
                      </span>
                      <h2 className="text-3xl font-black text-[#1E3A2F] mt-2">
                        ₹{Number(earningsData.totalRevenue || 0).toLocaleString("en-IN")}
                      </h2>
                      <p className="text-xs text-emerald-700 font-semibold mt-2 flex items-center gap-1.5">
                        <FaCheckCircle className="text-[11px]" />
                        <span>Collected from Paid orders only</span>
                      </p>
                    </div>

                    {/* 2. Total Paid Orders */}
                    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Total Paid Orders
                      </span>
                      <h2 className="text-3xl font-black text-stone-900 mt-2">
                        {earningsData.totalPaidOrders || 0}
                      </h2>
                      <p className="text-xs text-stone-500 font-medium mt-2">
                        Fully settled customer purchases
                      </p>
                    </div>

                    {/* 3. Pending Payments */}
                    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-amber-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Pending Payments
                      </span>
                      <h2 className="text-3xl font-black text-amber-700 mt-2">
                        {earningsData.pendingPayments?.count || 0}
                      </h2>
                      <p className="text-xs text-stone-500 font-medium mt-2">
                        Amount: <strong>₹{Number(earningsData.pendingPayments?.amount || 0).toLocaleString("en-IN")}</strong> (COD / unconfirmed)
                      </p>
                    </div>

                    {/* 4. Failed Payments */}
                    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-red-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Failed Payments
                      </span>
                      <h2 className="text-3xl font-black text-red-700 mt-2">
                        {earningsData.failedPayments?.count || 0}
                      </h2>
                      <p className="text-xs text-stone-500 font-medium mt-2">
                        Amount: <strong>₹{Number(earningsData.failedPayments?.amount || 0).toLocaleString("en-IN")}</strong> (Declined / cancelled)
                      </p>
                    </div>

                    {/* 5. Refunded Amount */}
                    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-purple-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Refunded Amount
                      </span>
                      <h2 className="text-3xl font-black text-purple-800 mt-2">
                        ₹{Number(earningsData.refundedAmount || 0).toLocaleString("en-IN")}
                      </h2>
                      <p className="text-xs text-stone-500 font-medium mt-2">
                        Total refunds: <strong>{earningsData.refundedCount || 0} orders</strong>
                      </p>
                    </div>

                    {/* 6. Total Orders */}
                    <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-stone-400" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Total Orders
                      </span>
                      <h2 className="text-3xl font-black text-stone-900 mt-2">
                        {earningsData.totalOrders || 0}
                      </h2>
                      <p className="text-xs text-stone-500 font-medium mt-2">
                        All orders within selected filter
                      </p>
                    </div>

                  </div>

                  {/* Transactions / Orders List Table */}
                  <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
                    <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-stone-900">
                          Transactions Log ({earningsData.orders?.length || 0})
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Detailed revenue breakdown matching filter: <strong className="capitalize">{earningsFilter}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#FAF8F5] border-b border-stone-200/80 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date & Time</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Payment Method</th>
                            <th className="px-6 py-4">Payment Status</th>
                            <th className="px-6 py-4">Fulfillment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                          {earningsData.orders?.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="px-6 py-12 text-center text-stone-400 text-xs">
                                No orders found in this timeframe.
                              </td>
                            </tr>
                          ) : (
                            earningsData.orders?.map((o) => {
                              const dateStr = o.createdAt
                                ? new Date(o.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "N/A";

                              return (
                                <tr key={o._id} className="hover:bg-stone-50/70 transition-colors">
                                  <td className="px-6 py-4 font-mono font-bold text-stone-800 text-xs">
                                    #{o._id?.slice(-8).toUpperCase()}
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="font-semibold text-stone-900">
                                      {o.customer?.name || o.userId?.name || "Customer"}
                                    </p>
                                    <p className="text-[11px] text-stone-400">
                                      {o.customer?.phone || o.userId?.email || ""}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 text-xs text-stone-500 whitespace-nowrap">
                                    {dateStr}
                                  </td>
                                  <td className="px-6 py-4 font-black text-[#1E3A2F]">
                                    ₹{Number(o.total || 0).toLocaleString("en-IN")}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700">
                                      {o.payment === "COD" ? (
                                        <FaMoneyBillWave className="text-[#1E3A2F]" />
                                      ) : (
                                        <FaCreditCard className="text-[#C05621]" />
                                      )}
                                      {o.payment === "COD" ? "Cash on Delivery" : "Razorpay"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    {getPaymentBadge(o.paymentStatus)}
                                  </td>
                                  <td className="px-6 py-4">
                                    {getFulfillmentBadge(o.status)}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
