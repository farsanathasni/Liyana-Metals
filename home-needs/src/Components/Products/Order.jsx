import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOrder } from "../../Contexts/OrderContext";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import api from "../../Api/Axios";
import {
  FaShieldAlt,
  FaTruck,
  FaCheckCircle,
  FaLock,
  FaCreditCard,
  FaMoneyBillWave,
  FaMobileAlt,
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Order() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated, loadingAuth } = useAuth();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // Pre-fill user details if available
  useEffect(() => {
    if (user?.name) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  // Protect route
  useEffect(() => {
    if (loadingAuth) return;
    if (!isAuthenticated) {
      alert("Please login to complete your checkout");
      navigate("/loginpage");
    }
  }, [isAuthenticated, loadingAuth, navigate]);

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-stone-500 font-medium">
          Preparing checkout...
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-stone-200/80 shadow-md text-center">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center text-2xl mx-auto mb-4">
            <FaTruck />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Your cart is empty</h2>
          <p className="text-stone-500 text-sm mt-1 mb-6">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-[#1E3A2F] text-white rounded-xl text-sm font-semibold"
          >
            Explore Catalogue
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
  };

  const getPriceNumber = (price) => {
    if (!price) return 0;
    return Number(price.toString().replace(/[^0-9.-]+/g, "")) || 0;
  };

  const deliveryFee = totalPrice >= 999 ? 0 : 99;
  const grandTotal = totalPrice + deliveryFee;

  const handlePlaceOrder = async () => {
    try {
      if (!form.name.trim() || !form.address.trim() || !form.phone.trim()) {
        setFormError("Please fill in your name, delivery address, and contact number.");
        return;
      }

      setSubmitting(true);

      // COD Flow
      if (form.payment === "COD") {
        const order = {
          userId: user._id,
          items: cart.map((i) => ({
            productId: i.productId?._id || i.productId,
            name: i.productId?.name || i.name,
            image: i.productId?.image || i.image,
            price: getPriceNumber(i.productId?.price || i.price),
            quantity: i.quantity,
          })),
          total: grandTotal,
          customer: form,
          payment: "COD",
          status: "placed",
        };

        await placeOrder(order);
        clearCart();
        alert("Order placed successfully! 🎉 Thank you for shopping with Home Needs.");
        navigate("/orders");
        return;
      }

      // Online Payment Flow (Razorpay)
      const { data } = await api.post("/payment/create", {
        cart,
        userId: user._id,
      });

      const razorpayOrder = data.order;

      if (!window.Razorpay) {
        alert("Razorpay SDK could not be loaded. Please check your internet connection.");
        setSubmitting(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_PAYMENT_KEY,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Home Needs",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        prefill: {
          name: form.name,
          contact: form.phone,
          email: user?.email || "",
        },
        theme: {
          color: "#1E3A2F",
        },
        handler: async function (response) {
          try {
            await api.post("/payment/verify", {
              order_id: razorpayOrder.id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              customer: form,
              cartItems: cart,
              total: grandTotal,
              userId: user._id,
              payment: form.payment,
            });

            clearCart();
            alert("Payment Successful! 🎉 Your order has been placed.");
            navigate("/orders");
          } catch (verifyErr) {
            console.error(verifyErr);
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment process could not be initiated.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <Link to="/cart" className="hover:text-stone-800">Bag</Link>
              <span>/</span>
              <span className="text-stone-800 font-semibold">Checkout</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Shipping & Payment
            </h1>
          </div>

          {formError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-2xl">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Form: Shipping Details & Payment Selector */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Details Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <h2 className="text-lg font-bold text-stone-900">
                      Delivery Address
                    </h2>
                  </div>
                  <span className="text-xs text-stone-400">All fields required</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors"
                      />
                      <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone Number (For Delivery Updates)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. +91 9876543210"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors"
                      />
                      <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Complete Shipping Address (House/Flat, Street, Landmark, Pin code)
                    </label>
                    <div className="relative">
                      <textarea
                        name="address"
                        rows="3"
                        placeholder="House / Flat No., Street, Landmark, City, State, PIN Code"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors leading-relaxed"
                      />
                      <FaMapMarkerAlt className="absolute left-3.5 top-4 text-stone-400 text-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <h2 className="text-lg font-bold text-stone-900">
                      Payment Mode
                    </h2>
                  </div>
                  <span className="text-xs text-stone-400">Safe & encrypted</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* COD Option */}
                  <label
                    className={`relative p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      form.payment === "COD"
                        ? "border-[#1E3A2F] bg-emerald-50/40 shadow-xs"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={form.payment === "COD"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-3">
                      <FaMoneyBillWave className="text-xl text-[#1E3A2F]" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.payment === "COD" ? "border-[#1E3A2F]" : "border-stone-300"}`}>
                        {form.payment === "COD" && <div className="w-2 h-2 rounded-full bg-[#1E3A2F]" />}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-stone-900">Cash on Delivery</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Pay upon parcel arrival</p>
                    </div>
                  </label>

                  {/* UPI Option */}
                  <label
                    className={`relative p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      form.payment === "UPI"
                        ? "border-[#1E3A2F] bg-emerald-50/40 shadow-xs"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={form.payment === "UPI"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-3">
                      <FaMobileAlt className="text-xl text-[#C05621]" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.payment === "UPI" ? "border-[#1E3A2F]" : "border-stone-300"}`}>
                        {form.payment === "UPI" && <div className="w-2 h-2 rounded-full bg-[#1E3A2F]" />}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-stone-900">UPI Instant</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">GPay, PhonePe, Paytm</p>
                    </div>
                  </label>

                  {/* Card Option */}
                  <label
                    className={`relative p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                      form.payment === "Card"
                        ? "border-[#1E3A2F] bg-emerald-50/40 shadow-xs"
                        : "border-stone-200 hover:border-stone-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Card"
                      checked={form.payment === "Card"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-3">
                      <FaCreditCard className="text-xl text-stone-700" />
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.payment === "Card" ? "border-[#1E3A2F]" : "border-stone-300"}`}>
                        {form.payment === "Card" && <div className="w-2 h-2 rounded-full bg-[#1E3A2F]" />}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-stone-900">Card / NetBanking</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">Debit, Credit & EMI</p>
                    </div>
                  </label>

                </div>
              </div>

            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-md space-y-5">
                <h2 className="text-xl font-extrabold text-stone-900 tracking-tight pb-3 border-b border-stone-100">
                  Order Items ({cart.length})
                </h2>

                <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1 space-y-3">
                  {cart.map((item) => {
                    const prod = item.productId || {};
                    const priceNum = getPriceNumber(prod.price || item.price);
                    return (
                      <div
                        key={item._id || prod._id}
                        className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image || "/default-product.png"}
                            alt={prod.name}
                            className="w-12 h-12 rounded-xl object-contain bg-[#FAF8F5] p-1 border border-stone-100"
                          />
                          <div>
                            <p className="font-bold text-stone-800 line-clamp-1 max-w-[160px]">
                              {prod.name || item.name}
                            </p>
                            <p className="text-stone-400">Qty: {item.quantity}</p>
                          </div>
                        </div>

                        <span className="font-extrabold text-stone-900">
                          ₹{(priceNum * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-stone-900">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-500 font-medium">Payable Amount</span>
                    <p className="text-2xl font-black text-[#1E3A2F]">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase">
                    Mode: {form.payment}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-2xl shadow-lg shadow-[#1E3A2F]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
                >
                  <FaCheckCircle className="text-emerald-300" />
                  <span>
                    {submitting
                      ? "Processing..."
                      : form.payment === "COD"
                      ? "Confirm & Place COD Order"
                      : "Pay with Razorpay"}
                  </span>
                </button>

                <div className="pt-2 text-[11px] text-stone-400 text-center flex items-center justify-center gap-2">
                  <FaShieldAlt className="text-stone-400" />
                  <span>256-Bit Bank Grade Secure Checkout</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Order;
