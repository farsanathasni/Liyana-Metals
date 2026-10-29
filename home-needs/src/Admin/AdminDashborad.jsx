import React, { useEffect, useState } from "react";
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
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

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
          <span className="font-extrabold text-base tracking-tight">Home Needs Admin</span>
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
              <h2 className="text-lg font-black tracking-tight text-white">HOME NEEDS</h2>
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
        <main className="flex-1 p-6 sm:p-10 mt-14 md:mt-0 max-w-7xl">
          
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Executive Overview
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Live metrics for customer registrations, inventory stocks, and order fulfillment.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Total Revenue
              </span>
              <h2 className="text-3xl font-black text-[#1E3A2F] mt-2">
                ₹{Number(totalRevenue || 0).toLocaleString("en-IN")}
              </h2>
              <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                <span>Verified sales volume</span>
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
                Lifetime customer orders
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
                Active catalog SKUs
              </p>
            </div>

          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            
            {/* Bar Chart */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-6 flex items-center gap-2">
                <FaChartBar className="text-[#1E3A2F]" />
                <span>Sales & Inventory Dynamics</span>
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
                <span>Ecosystem Distribution</span>
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

        </main>

      </div>
    </>
  );
}

export default AdminDashboard;
