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
  FaCreditCard,
  FaMoneyBillWave,
  FaEye,
  FaUndo,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaReceipt,
} from "react-icons/fa";

function MyOrders() {
  const { user, isAuthenticated, loadingAuth } = useAuth();
  const { getMyOrders } = useOrder();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
            <FaClock className="text-[10px]" /> Placed
          </span>
        );
    }
  };

  const getPaymentBadge = (paymentStatus) => {
    const p = (paymentStatus || "pending").toLowerCase();
    switch (p) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <FaCheckCircle className="text-[10px]" /> Paid
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-100 text-red-800 border border-red-200">
            <FaTimesCircle className="text-[10px]" /> Failed
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
            <FaUndo className="text-[10px]" /> Refunded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
            <FaClock className="text-[10px]" /> Pending
          </span>
        );
    }
  };

  const formatPaymentMethod = (payment) => {
    if (!payment) return "Cash on Delivery";
    const p = payment.toUpperCase();
    if (p === "COD") return "Cash on Delivery";
    if (p === "RAZORPAY" || p === "CARD" || p === "UPI") return "Razorpay (Online)";
    return payment;
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
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Track delivery progress and verify real-time payment records for your purchases.
            </p>
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
                When you order cookware or appliances, your order tracking and payment receipts will appear here.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-4 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold text-sm rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Browse Catalogue</span>
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
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-xs text-stone-600 font-medium flex items-center gap-1.5">
                            {order.payment === "COD" ? (
                              <FaMoneyBillWave className="text-[#1E3A2F]" />
                            ) : (
                              <FaCreditCard className="text-[#C05621]" />
                            )}
                            {formatPaymentMethod(order.payment)}
                          </span>
                          <span className="text-stone-300">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-stone-500 font-medium">Payment:</span>
                            {getPaymentBadge(order.paymentStatus)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3.5 py-1.5 bg-[#FAF8F5] hover:bg-stone-100 text-stone-800 rounded-xl text-xs font-bold border border-stone-200 flex items-center gap-1.5 transition-colors"
                        >
                          <FaEye className="text-stone-400 text-[11px]" />
                          <span>Order Details</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="divide-y divide-stone-100 py-4 space-y-3">
                      {order.items?.map((item, index) => {
                        const prod = item.productId || {};
                        const unitPrice = getPriceNumber(prod.price || item.price);
                        const itemImg = prod.image || item.image || "/default-product.png";
                        const itemName = prod.name || item.name || "Liyana Metals Item";

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
                        <span className="text-xs text-stone-500 font-medium">Order Total:</span>
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

      {/* Customer Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1E3A2F] flex items-center justify-center">
                  <FaReceipt />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    Order Details
                  </h3>
                  <p className="text-[11px] font-mono text-stone-400">
                    #{selectedOrder._id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-stone-400 hover:text-stone-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Status Cards */}
            <div className="grid grid-cols-2 gap-3 bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/60">
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
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Payment Mode</span>
                <span className="text-xs font-bold text-stone-800 block mt-0.5">
                  {formatPaymentMethod(selectedOrder.payment)}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Order Date</span>
                <span className="text-xs font-bold text-stone-800 block mt-0.5">
                  {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Shipping & Contact Information
              </span>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200/70 space-y-1 text-stone-600">
                <p className="font-bold text-stone-900 flex items-center gap-1.5">
                  <FaUser className="text-stone-400 text-[10px]" />
                  {selectedOrder.customer?.name || user?.name}
                </p>
                <p className="flex items-center gap-1.5">
                  <FaPhoneAlt className="text-stone-400 text-[10px]" />
                  {selectedOrder.customer?.phone}
                </p>
                <p className="flex items-start gap-1.5 pt-0.5">
                  <FaMapMarkerAlt className="text-stone-400 text-[10px] mt-0.5 flex-shrink-0" />
                  <span>{selectedOrder.customer?.address}</span>
                </p>
                {selectedOrder.transactionId && (
                  <p className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-100">
                    Transaction ID: {selectedOrder.transactionId}
                  </p>
                )}
              </div>
            </div>

            {/* Itemized breakdown */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Purchased Items ({selectedOrder.items?.length || 0})
              </span>
              <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto border border-stone-200/70 rounded-xl p-2 bg-white">
                {selectedOrder.items?.map((item, idx) => {
                  const prod = item.productId || {};
                  const price = getPriceNumber(prod.price || item.price);
                  return (
                    <div key={idx} className="py-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={prod.image || item.image || "/default-product.png"}
                          alt="product"
                          className="w-10 h-10 rounded-lg object-contain bg-[#FAF8F5] p-1 border border-stone-100"
                        />
                        <div>
                          <p className="font-semibold text-stone-800 line-clamp-1">{prod.name || item.name}</p>
                          <p className="text-stone-400 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">
                        ₹{(price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between pt-3 border-t border-stone-100">
              <span className="font-bold text-stone-700 text-sm">Total Amount</span>
              <span className="text-2xl font-black text-[#1E3A2F]">
                ₹{Number(selectedOrder.total || 0).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs transition-colors"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MyOrders;
