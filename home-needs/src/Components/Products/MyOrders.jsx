import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useOrder } from "../../Contexts/OrderContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {
  FaBoxes,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";

function MyOrders() {
  const { user, isAuthenticated, loadingAuth } = useAuth();
  const { getMyOrders } = useOrder();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingAuth) return;

    if (!isAuthenticated) {
      navigate("/loginpage");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (user?._id) {
          const data = await getMyOrders(user._id);
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to fetch user orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated, loadingAuth, getMyOrders, navigate]);

  const getPriceNumber = (price) => {
    if (!price) return 0;
    return Number(price.toString().replace(/[^0-9.-]+/g, "")) || 0;
  };

  const getStatusBadge = (status) => {
    const s = (status || "placed").toLowerCase();
    switch (s) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FaCheckCircle className="text-[10px]" /> Delivered
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <FaShippingFast className="text-[10px]" /> Shipped
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <FaTimesCircle className="text-[10px]" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <FaClock className="text-[10px]" /> Order Placed
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <Link to="/" className="hover:text-stone-800">Home</Link>
              <span>/</span>
              <span className="text-stone-800 font-semibold">Order History</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              My Orders & Shipments
            </h1>
          </div>

          {loading || loadingAuth ? (
            <div className="space-y-6 animate-pulse">
              {[1, 2].map((n) => (
                <div key={n} className="bg-white rounded-3xl p-6 border border-stone-200/80 space-y-4">
                  <div className="h-6 bg-stone-200 rounded w-1/3" />
                  <div className="h-16 bg-stone-100 rounded-xl" />
                  <div className="h-6 bg-stone-200 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto bg-white rounded-3xl p-10 border border-stone-200/80 shadow-sm">
              <div className="w-20 h-20 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center text-3xl mx-auto mb-4">
                <FaBoxes />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">No orders placed yet</h2>
              <p className="text-stone-500 text-sm mt-2 mb-8 leading-relaxed">
                When you order kitchenware or appliances, your order tracking updates will appear here.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-4 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold text-sm rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Browse Products</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const orderDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Recent Order";

                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <FaCalendarAlt className="text-stone-400" />
                          <span>{orderDate}</span>
                          <span className="text-stone-300">•</span>
                          <span className="font-mono text-[11px] text-stone-400">
                            ID: {order._id?.slice(-8).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 font-medium">
                          Payment: <span className="font-bold text-stone-800">{order.payment || "COD"}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="divide-y divide-stone-100 py-4 space-y-3">
                      {order.items?.map((item, index) => {
                        const prod = item.productId || {};
                        const unitPrice = getPriceNumber(prod.price || item.price);
                        const itemImg = prod.image || item.image || "/default-product.png";
                        const itemName = prod.name || item.name || "Home Needs Product";

                        return (
                          <div
                            key={index}
                            className="pt-3 first:pt-0 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3.5">
                              <img
                                src={itemImg}
                                alt={itemName}
                                onError={(e) => (e.target.src = "/default-product.png")}
                                className="w-14 h-14 rounded-2xl object-contain bg-[#FAF8F5] p-1.5 border border-stone-100 flex-shrink-0"
                              />
                              <div>
                                <p className="font-bold text-stone-900 text-sm line-clamp-1">
                                  {itemName}
                                </p>
                                <p className="text-xs text-stone-400 mt-0.5">
                                  Qty: {item.quantity} × ₹{unitPrice.toLocaleString("en-IN")}
                                </p>
                              </div>
                            </div>

                            <span className="font-extrabold text-sm text-stone-900">
                              ₹{(unitPrice * (item.quantity || 1)).toLocaleString("en-IN")}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Order Footer & Total */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                      <div className="text-xs text-stone-500">
                        {order.customer?.address && (
                          <p className="line-clamp-1">
                            📍 Delivering to: <strong>{order.customer.name}</strong>, {order.customer.address}
                          </p>
                        )}
                      </div>

                      <div className="flex items-baseline justify-between sm:justify-end gap-3">
                        <span className="text-xs text-stone-500">Total Paid:</span>
                        <span className="text-xl font-black text-[#1E3A2F]">
                          ₹{Number(order.total || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}

              <div className="text-center pt-6">
                <button
                  onClick={() => navigate("/products")}
                  className="px-8 py-3.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold text-xs rounded-full shadow-xs transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyOrders;
