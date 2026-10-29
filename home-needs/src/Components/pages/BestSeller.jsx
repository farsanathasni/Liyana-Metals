import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar, FaArrowRight, FaEye } from "react-icons/fa";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import { useWishlist } from "../../Contexts/WishList";
import api from "../../Api/Axios";

function BestSeller() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItemNotice, setAddedItemNotice] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        if (res.data?.product && Array.isArray(res.data.product)) {
          // Take top 8 products or 4
          setProducts(res.data.product.slice(0, 8));
        }
      } catch (error) {
        console.error("Failed to fetch bestsellers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (e, item) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please login to add items to your cart.");
      navigate("/loginpage");
      return;
    }

    try {
      await addToCart(item);
      setAddedItemNotice(`${item.name} added to cart!`);
      setTimeout(() => setAddedItemNotice(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlistToggle = async (e, item) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please login to save items to your wishlist.");
      navigate("/loginpage");
      return;
    }

    const isFav = wishlist?.some(
      (w) => w.productId?._id === item._id || w._id === item._id
    );

    try {
      if (isFav) {
        const wishItem = wishlist.find(
          (w) => w.productId?._id === item._id || w._id === item._id
        );
        if (wishItem) await removeFromWishlist(wishItem._id);
      } else {
        await addToWishlist(item);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "0";
    const num = Number(price.toString().replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? price : num.toLocaleString("en-IN");
  };

  return (
    <section id="bestsellers-section" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast feedback */}
        {addedItemNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A2F] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-sm font-medium">{addedItemNotice}</span>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="px-3.5 py-1.5 rounded-full bg-[#C05621]/10 text-[#C05621] text-xs font-bold uppercase tracking-wider">
            Customer Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-3 tracking-tight">
            Best Sellers for Your Home
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Hand-selected by culinary experts and loved by thousands of Indian families.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-5 border border-stone-200/70 shadow-sm animate-pulse space-y-4">
                <div className="h-52 bg-stone-100 rounded-2xl" />
                <div className="h-4 bg-stone-200 rounded w-3/4" />
                <div className="h-3 bg-stone-100 rounded w-1/2" />
                <div className="h-10 bg-stone-200 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => {
              const isFav = wishlist?.some(
                (w) => w.productId?._id === item._id || w._id === item._id
              );

              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/products/${item._id}`)}
                  className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-stone-200/70 flex flex-col justify-between group cursor-pointer relative"
                >
                  {/* Top Badges */}
                  <div className="relative">
                    <div className="flex items-center justify-between absolute top-2 left-2 right-2 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#1E3A2F] text-[11px] font-bold shadow-xs border border-stone-100">
                        {item.category || "Essential"}
                      </span>
                      
                      <button
                        type="button"
                        onClick={(e) => handleWishlistToggle(e, item)}
                        aria-label="Add to wishlist"
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          isFav
                            ? "bg-red-50 text-red-500 shadow-xs"
                            : "bg-white/90 text-stone-400 hover:text-red-500 shadow-xs hover:scale-110"
                        }`}
                      >
                        <FaHeart className="text-sm" />
                      </button>
                    </div>

                    {/* Image Container */}
                    <div className="h-52 w-full rounded-2xl bg-[#FAF8F5] flex items-center justify-center p-4 overflow-hidden relative">
                      <img
                        src={item.image || "/default-product.png"}
                        alt={item.name}
                        onError={(e) => (e.target.src = "/default-product.png")}
                        className="max-h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="pt-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                        <FaStar className="text-[11px]" />
                        <span className="font-bold text-stone-700">4.8</span>
                        <span className="text-stone-400 text-[11px]">(120+ verified)</span>
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-base text-stone-900 group-hover:text-[#1E3A2F] transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Description preview */}
                      {item.description && (
                        <p className="text-xs text-stone-500 line-clamp-1 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Price and Cart Action */}
                    <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-stone-400 block font-medium">Price</span>
                        <p className="text-lg font-extrabold text-[#1E3A2F]">
                          ₹{formatPrice(item.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, item)}
                        className="px-4 py-2.5 bg-[#1E3A2F] hover:bg-[#2e5746] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-95"
                      >
                        <FaShoppingCart className="text-xs" />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA to Shop All */}
        <div className="text-center mt-14">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm rounded-full border border-stone-300 shadow-xs hover:shadow-md transition-all"
          >
            <span>Explore All 100+ LIYANA METALS Products</span>
            <FaArrowRight className="text-xs text-[#C05621]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default BestSeller;
