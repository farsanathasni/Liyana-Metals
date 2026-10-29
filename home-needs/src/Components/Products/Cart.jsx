import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {
  FaTrash,
  FaShoppingBag,
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaPlus,
  FaMinus,
  FaLock,
} from "react-icons/fa";

const DEFAULT_IMAGE = "/default-product.png";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  const formatPrice = (price) => {
    if (!price) return "0";
    const num = Number(price.toString().replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? price : num.toLocaleString("en-IN");
  };

  const deliveryFee = totalPrice >= 999 || totalPrice === 0 ? 0 : 99;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <Link to="/" className="hover:text-stone-800">Home</Link>
              <span>/</span>
              <span className="text-stone-800 font-semibold">Shopping Cart</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Your Shopping Bag
            </h1>
          </div>

          {!isAuthenticated ? (
            <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-md text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#1E3A2F]/10 text-[#1E3A2F] flex items-center justify-center text-2xl mx-auto mb-4">
                <FaShoppingBag />
              </div>
              <h2 className="text-xl font-bold text-stone-900">Sign in to view your cart</h2>
              <p className="text-stone-500 text-sm mt-1 mb-6">
                Your saved cart items, addresses, and discounts will be synchronized to your account.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/loginpage")}
                  className="px-6 py-3 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-xl text-sm shadow-xs transition-all"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-sm transition-all"
                >
                  Create Account
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto bg-white rounded-3xl p-10 border border-stone-200/80 shadow-sm">
              <div className="w-20 h-20 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center text-3xl mx-auto mb-4">
                <FaShoppingBag />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Your bag is currently empty</h2>
              <p className="text-stone-500 text-sm mt-2 mb-8 leading-relaxed">
                Looks like you haven't added any kitchen essentials to your bag yet.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-4 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold text-sm rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Discover Products</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4 text-xs font-bold uppercase tracking-wider text-stone-400">
                    <span>Product ({cart.length} items)</span>
                    <span>Quantity & Subtotal</span>
                  </div>

                  <div className="divide-y divide-stone-100 space-y-4">
                    {cart.map((item) => {
                      const prod = item.productId || {};
                      const itemPrice = Number(prod.price || item.price || 0);
                      const subtotal = itemPrice * item.quantity;

                      return (
                        <div
                          key={item._id}
                          className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          {/* Item Info */}
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-2xl bg-[#FAF8F5] border border-stone-200/60 p-2 flex items-center justify-center flex-shrink-0">
                              <img
                                src={prod.image || DEFAULT_IMAGE}
                                alt={prod.name || "Product"}
                                onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                                className="max-h-20 w-auto object-contain drop-shadow-xs"
                              />
                            </div>

                            <div className="space-y-1">
                              <Link
                                to={`/products/${prod._id}`}
                                className="font-bold text-stone-900 hover:text-[#1E3A2F] transition-colors text-base line-clamp-1"
                              >
                                {prod.name || item.name || "Home Essential"}
                              </Link>
                              
                              <p className="text-xs text-stone-400">
                                Category: {prod.category || "Cookware"}
                              </p>

                              <p className="text-sm font-extrabold text-[#1E3A2F]">
                                ₹{formatPrice(itemPrice)}
                              </p>
                            </div>
                          </div>

                          {/* Stepper & Total */}
                          <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-[#FAF8F5] border border-stone-200 rounded-xl p-1">
                              <button
                                onClick={() => decreaseQty(prod._id || item.productId)}
                                aria-label="Decrease quantity"
                                className="w-8 h-8 rounded-lg bg-white shadow-xs text-stone-600 hover:text-[#1E3A2F] flex items-center justify-center text-xs transition-colors"
                              >
                                <FaMinus />
                              </button>
                              <span className="w-10 text-center font-bold text-sm text-stone-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increaseQty(prod._id || item.productId)}
                                aria-label="Increase quantity"
                                className="w-8 h-8 rounded-lg bg-white shadow-xs text-stone-600 hover:text-[#1E3A2F] flex items-center justify-center text-xs transition-colors"
                              >
                                <FaPlus />
                              </button>
                            </div>

                            {/* Item Subtotal */}
                            <div className="text-right min-w-[80px]">
                              <p className="text-base font-extrabold text-stone-900">
                                ₹{formatPrice(subtotal)}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(prod._id || item.productId)}
                              aria-label="Remove item"
                              className="w-9 h-9 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                              title="Remove item"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200/80 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <FaTruck className="text-[#C05621] text-sm" />
                    <span>
                      {totalPrice >= 999
                        ? "🎉 You have unlocked Free Express Delivery!"
                        : `Add ₹${999 - totalPrice} more to qualify for Free Shipping.`}
                    </span>
                  </div>
                  <Link
                    to="/products"
                    className="font-bold text-[#1E3A2F] hover:underline hidden sm:inline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary Sticky Card */}
              <div className="lg:col-span-4 sticky top-28 space-y-4">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-md space-y-5">
                  <h2 className="text-xl font-extrabold text-stone-900 tracking-tight pb-3 border-b border-stone-100">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm text-stone-600">
                    <div className="flex items-center justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-semibold text-stone-900">
                        ₹{formatPrice(totalPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Estimated Shipping</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-emerald-700 font-bold">FREE</span>
                        ) : (
                          `₹${deliveryFee}`
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Taxes & GST</span>
                      <span>Included in price</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
                    <div>
                      <p className="text-xs text-stone-500 font-medium">Grand Total</p>
                      <p className="text-2xl font-black text-[#1E3A2F]">
                        ₹{formatPrice(grandTotal)}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Best Price
                    </span>
                  </div>

                  <button
                    onClick={() => navigate("/order")}
                    className="w-full py-4 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-2xl shadow-lg shadow-[#1E3A2F]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-sm active:scale-98 cursor-pointer"
                  >
                    <FaLock className="text-xs text-emerald-300" />
                    <span>Proceed to Checkout</span>
                  </button>

                  <div className="pt-3 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
                    <p className="flex items-center gap-2">
                      <FaShieldAlt className="text-stone-400" />
                      <span>256-bit SSL encrypted & secure payments via Razorpay</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaTruck className="text-stone-400" />
                      <span>Cash on Delivery (COD) available across India</span>
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
