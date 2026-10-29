import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../../Contexts/SerchContext";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import { useWishlist } from "../../Contexts/WishList";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaTimes,
  FaBoxes,
} from "react-icons/fa";
import api from "../../Api/Axios";

function Products() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState(["All Items"]);
  const [feedbackNotice, setFeedbackNotice] = useState("");

  const { searchTerm, setSearchTerm } = useSearch();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/products?page=${page}&search=${searchTerm}&category=${activeCategory}`
        );
        if (isMounted) {
          setFilteredProducts(res.data?.product || []);
          setTotalPages(res.data?.totalPages || 1);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      isMounted = false;
    };
  }, [page, searchTerm, activeCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/products/categories");
        if (Array.isArray(res.data)) {
          setCategories(["All Items", ...res.data]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleAddToCart = async (e, item) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      navigate("/loginpage");
      return;
    }
    try {
      await addToCart(item);
      setFeedbackNotice(`${item.name} added to cart!`);
      setTimeout(() => setFeedbackNotice(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlistToggle = async (e, item) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      alert("Please login to manage wishlist");
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
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />

      {/* Floating feedback alert */}
      {feedbackNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A2F] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-sm font-medium">{feedbackNotice}</span>
        </div>
      )}

      {/* Shop Header Banner */}
      <div className="bg-white border-b border-stone-200/70 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-3">
            <Link to="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <span className="text-stone-800 font-semibold">Shop Catalogue</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Living & Kitchen Catalog
              </h1>
              <p className="text-stone-500 text-sm mt-1">
                Explore our full line of chef-grade cookware, chimneys, appliances & dining sets.
              </p>
            </div>

            {/* Quick Search in Shop Header */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-[#FAF8F5] border border-stone-200 text-stone-800 text-sm rounded-full pl-10 pr-10 py-2.5 focus:outline-none focus:border-[#1E3A2F] focus:bg-white focus:ring-1 focus:ring-[#1E3A2F] transition-all"
              />
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setPage(1);
                  }}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <section className="bg-white/80 border-b border-stone-200/60 sticky top-20 z-30 backdrop-blur-md py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-400 uppercase tracking-wider mr-2 flex-shrink-0">
              <FaFilter className="text-[10px]" />
              <span>Category:</span>
            </div>
            {categories.map((category, index) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setActiveCategory(category);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? "bg-[#1E3A2F] text-white shadow-sm"
                      : "bg-[#FAF8F5] text-stone-700 hover:bg-stone-200/80 border border-stone-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Catalog Grid Section */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Active Status Info */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200/60">
            <p className="text-sm text-stone-600 font-medium">
              Showing category: <span className="font-bold text-stone-900">{activeCategory}</span>
              {searchTerm && (
                <span className="ml-2 text-stone-500">
                  matching "<span className="italic font-semibold text-stone-800">{searchTerm}</span>"
                </span>
              )}
            </p>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-200/60 text-stone-700">
              Page {page} of {totalPages}
            </span>
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="bg-white rounded-3xl p-5 border border-stone-200/70 shadow-sm animate-pulse space-y-4">
                  <div className="h-48 bg-stone-100 rounded-2xl" />
                  <div className="h-4 bg-stone-200 rounded w-3/4" />
                  <div className="h-3 bg-stone-100 rounded w-1/2" />
                  <div className="h-10 bg-stone-200 rounded-xl" />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="py-20 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center text-2xl mx-auto mb-4">
                <FaBoxes />
              </div>
              <h3 className="text-xl font-bold text-stone-900">No products found</h3>
              <p className="text-stone-500 text-sm mt-1 mb-6">
                We couldn't find any items matching your current filters or search query.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All Items");
                  setSearchTerm("");
                  setPage(1);
                }}
                className="px-6 py-2.5 bg-[#1E3A2F] text-white text-xs font-bold rounded-full shadow-xs hover:bg-[#284f3f] transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Product Cards Grid */}
          {!loading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => {
                const isFav = wishlist?.some(
                  (w) => w.productId?._id === item._id || w._id === item._id
                );

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-stone-200/70 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges & Wishlist Action */}
                      <div className="relative">
                        <div className="flex items-center justify-between absolute top-2 left-2 right-2 z-10">
                          <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#1E3A2F] text-[11px] font-bold shadow-xs border border-stone-100">
                            {item.category || "Item"}
                          </span>
                          
                          <button
                            type="button"
                            onClick={(e) => handleWishlistToggle(e, item)}
                            aria-label="Toggle wishlist"
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                              isFav
                                ? "bg-red-50 text-red-500 shadow-xs"
                                : "bg-white/90 text-stone-400 hover:text-red-500 shadow-xs hover:scale-110"
                            }`}
                          >
                            <FaHeart className="text-sm" />
                          </button>
                        </div>

                        {/* Image Frame */}
                        <Link to={`/products/${item._id}`} className="block">
                          <div className="h-52 w-full rounded-2xl bg-[#FAF8F5] flex items-center justify-center p-4 overflow-hidden">
                            <img
                              src={item.image || "/default-product.png"}
                              alt={item.name}
                              onError={(e) => (e.target.src = "/default-product.png")}
                              className="max-h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xs"
                            />
                          </div>
                        </Link>
                      </div>

                      {/* Info & Title */}
                      <div className="pt-4">
                        <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                          <FaStar className="text-[11px]" />
                          <span className="font-bold text-stone-700">4.8</span>
                          <span className="text-stone-400 text-[11px]">
                            {item.stock > 0 ? `(${item.stock} in stock)` : "(Out of stock)"}
                          </span>
                        </div>

                        <Link to={`/products/${item._id}`}>
                          <h3 className="font-bold text-base text-stone-900 group-hover:text-[#1E3A2F] transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-stone-400 block font-medium">Price</span>
                        <p className="text-lg font-extrabold text-[#1E3A2F]">
                          ₹{formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/products/${item._id}`}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
                        >
                          Details
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, item)}
                          className="px-3.5 py-2 bg-[#1E3A2F] hover:bg-[#2e5746] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow-md transition-all active:scale-95"
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

          {/* Modern Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-14">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2.5 bg-white border border-stone-200 text-stone-700 rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <FaChevronLeft className="text-[10px]" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      page === pageNum
                        ? "bg-[#1E3A2F] text-white shadow-sm"
                        : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2.5 bg-[#1E3A2F] text-white rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#295140] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Next</span>
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Products;
