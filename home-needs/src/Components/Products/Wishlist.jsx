import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../../Contexts/WishList";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");

  const formatPrice = (price) => {
    if (!price) return "0";
    const num = Number(price.toString().replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? price : num.toLocaleString("en-IN");
  };

  const handleMoveToCart = async (e, item) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please login to add to cart");
      navigate("/loginpage");
      return;
    }

    try {
      const prod = item.productId || item;
      await addToCart(prod);
      await removeFromWishlist(item._id);
      setNotice(`${prod.name || "Product"} moved to cart!`);
      setTimeout(() => setNotice(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />

      {notice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A2F] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-sm font-medium">{notice}</span>
        </div>
      )}

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <Link to="/" className="hover:text-stone-800">Home</Link>
              <span>/</span>
              <span className="text-stone-800 font-semibold">Wishlist</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              My Saved Wishlist
            </h1>
          </div>

          {!wishlist || wishlist.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto bg-white rounded-3xl p-10 border border-stone-200/80 shadow-sm">
              <div className="w-20 h-20 rounded-3xl bg-red-50 text-red-400 flex items-center justify-center text-3xl mx-auto mb-4">
                <FaHeart />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Your wishlist is empty</h2>
              <p className="text-stone-500 text-sm mt-2 mb-8 leading-relaxed">
                Save your favorite cookware and appliances by clicking the heart icon on any product.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => {
                const prod = item.productId || {};
                const name = prod.name || item.name || "Home Essential";
                const price = prod.price || item.price;
                const image = prod.image || item.image || "/default-product.png";

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image & Remove Action */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item._id)}
                          aria-label="Remove from wishlist"
                          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 text-stone-400 hover:text-red-500 flex items-center justify-center shadow-xs transition-colors"
                          title="Remove item"
                        >
                          <FaTrash className="text-xs" />
                        </button>

                        <div
                          onClick={() => prod._id && navigate(`/products/${prod._id}`)}
                          className="h-48 w-full rounded-2xl bg-[#FAF8F5] flex items-center justify-center p-4 cursor-pointer overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={name}
                            onError={(e) => (e.target.src = "/default-product.png")}
                            className="max-h-40 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="pt-4">
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                          {prod.category || "Cookware"}
                        </span>
                        
                        <h3
                          onClick={() => prod._id && navigate(`/products/${prod._id}`)}
                          className="font-bold text-stone-900 group-hover:text-[#1E3A2F] text-sm line-clamp-1 mt-0.5 cursor-pointer"
                        >
                          {name}
                        </h3>

                        <p className="text-base font-extrabold text-[#1E3A2F] mt-2">
                          ₹{formatPrice(price)}
                        </p>
                      </div>
                    </div>

                    {/* Move to Cart Action */}
                    <div className="pt-4 mt-3 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={(e) => handleMoveToCart(e, item)}
                        className="w-full py-2.5 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart className="text-xs" />
                        <span>Move to Bag</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Wishlist;
