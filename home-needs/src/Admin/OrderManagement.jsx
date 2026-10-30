import React, { useEffect, useState } from "react";
import api from "../Api/Axios";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaHome,
  FaProductHunt,
  FaSignOutAlt,
  FaUsers,
  FaUserShield,
  FaStore,
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUndo,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext";

function OrderManagement() {
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await api.get("/admin/order");
      setOrder(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const updateOrderFields = async (orderId, updates) => {
    try {
      const res = await api.patch(`/admin/order/${orderId}`, updates);

      setSelectedOrder((prev) => ({
        ...prev,
        ...updates,
      }));

      fetchOrder();
    } catch (error) {
      console.error("Failed to update order fields", error);
    }
  };

  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel / delete this order?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/order/${orderId}`);
      setOrder((prev) => prev.filter((o) => o._id !== orderId));
      if (selectedOrder?._id === orderId) {
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-5 py-3 bg-[#2A4E3F] rounded-xl font-semibold text-white shadow-xs transition-all"
      : "flex items-center gap-3 px-5 py-3 hover:bg-[#234437] rounded-xl text-emerald-100/80 hover:text-white font-medium transition-all";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const getStatusBadge = (status) => {
    const s = (status || "placed").toLowerCase();
    switch (s) {
      case "delivered":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">Delivered</span>;
      case "shipped":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700">Shipped</span>;
      case "cancelled":
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800">Placed</span>;
    }
  };

  const getPaymentBadge = (paymentStatus) => {
    const p = (paymentStatus || "pending").toLowerCase();
    switch (p) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <FaCheckCircle className="text-[10px]" /> Paid
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
            <FaTimesCircle className="text-[10px]" /> Failed
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            <FaUndo className="text-[10px]" /> Refunded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <FaClock className="text-[10px]" /> Pending
          </span>
        );
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
          <span className="font-extrabold text-base tracking-tight">LIYANA METALS ADMIN</span>
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
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden absolute top-4 right-4 text-white text-xl font-bold"
          >
            ✕
          </button>

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

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-10 mt-14 md:mt-0 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Order Fulfillment & Shipments
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Process customer purchases, inspect payment verification statuses, and update parcel deliveries.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] border-b border-stone-200/80 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">Payment Method</th>
                    <th className="px-6 py-4">Payment Status</th>
                    <th className="px-6 py-4">Fulfillment</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {order.map((o) => (
                    <tr key={o._id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-stone-800 text-xs">
                        #{o._id?.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-stone-900">
                        {o.customer?.name || o.userId?.name || "Customer"}
                      </td>
                      <td className="px-6 py-4 font-extrabold text-[#1E3A2F]">
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
                        {getStatusBadge(o.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <FaEye className="text-[10px]" /> View
                          </button>
                          <button
                            onClick={() => deleteOrder(o._id)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel / Delete Order"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* View & Update Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-8 border border-stone-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-stone-900 pb-3 border-b border-stone-100">
              Order Details & Dispatch
            </h3>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="grid grid-cols-2 gap-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/60">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Order Reference</span>
                  <span className="font-mono font-bold text-stone-800">#{selectedOrder._id}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Payment Mode</span>
                  <span className="font-bold text-[#1E3A2F]">
                    {selectedOrder.payment === "COD" ? "Cash on Delivery" : "Razorpay"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Payment Status</span>
                  <div className="mt-1">
                    {getPaymentBadge(selectedOrder.paymentStatus)}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Fulfillment</span>
                  <div className="mt-1">
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Customer Information</span>
                <p className="font-semibold text-stone-800 mt-0.5">
                  {selectedOrder.customer?.name || selectedOrder.userId?.name}
                </p>
                <p className="text-stone-500">
                  {selectedOrder.customer?.phone} • {selectedOrder.userId?.email}
                </p>
                <p className="text-stone-500 mt-1">
                  📍 {selectedOrder.customer?.address}
                </p>
                {selectedOrder.transactionId && (
                  <p className="text-[11px] font-mono text-stone-400 mt-1">
                    Transaction ID: {selectedOrder.transactionId}
                  </p>
                )}
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block mb-2">Ordered Products</span>
                <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto border border-stone-200/60 rounded-xl p-2 bg-white">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="py-2 first:pt-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {item.productId?.image && (
                          <img
                            src={item.productId.image}
                            alt="product"
                            className="w-10 h-10 rounded-lg object-contain bg-[#FAF8F5] p-1 border"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-stone-800 line-clamp-1">{item.productId?.name || item.name}</p>
                          <p className="text-stone-400 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">
                        ₹{(item.price || item.productId?.price || 0) * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-stone-100">
                <span className="font-bold text-stone-700">Order Total Amount</span>
                <span className="text-xl font-black text-[#1E3A2F]">
                  ₹{Number(selectedOrder.total || 0).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Status Updaters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Update Delivery Status
                  </label>
                  <select
                    value={selectedOrder.status || "placed"}
                    onChange={(e) => updateOrderFields(selectedOrder._id, { status: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  >
                    <option value="placed">Placed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Update Payment Status
                  </label>
                  <select
                    value={selectedOrder.paymentStatus || "pending"}
                    onChange={(e) => updateOrderFields(selectedOrder._id, { paymentStatus: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#1E3A2F]"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 bg-stone-100 text-stone-700 font-semibold rounded-xl text-xs hover:bg-stone-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderManagement;
