import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import { useWishlist } from "../../Contexts/WishList";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaCheckCircle,
  FaArrowLeft,
  FaBoxes,
} from "react-icons/fa";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import api from "../../Api/Axios";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("specs");

  const { addToCart } = useCart();
  const { isAuthenticated, loadingAuth } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (loadingAuth) return;

    if (!isAuthenticated) {
      alert("Please login or register to add items to your cart.");
      navigate("/loginpage");
      return;
    }

    try {
      await addToCart(product);
      setFeedback(`${product.name} added to cart!`);
      setTimeout(() => setFeedback(""), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  const isFav = wishlist?.some(
    (w) => w.productId?._id === product?._id || w._id === product?._id
  );

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      alert("Please login to save items to your wishlist.");
      navigate("/loginpage");
      return;
    }

    try {
      if (isFav) {
        const wishItem = wishlist.find(
          (w) => w.productId?._id === product._id || w._id === product._id
        );
        if (wishItem) await removeFromWishlist(wishItem._id);
        setFeedback("Removed from wishlist");
      } else {
        await addToWishlist(product);
        setFeedback(`${product.name} added to wishlist ❤️`);
      }
      setTimeout(() => setFeedback(""), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "0";
    const num = Number(price.toString().replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? price : num.toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-6xl mx-auto px-4 py-16 w-full animate-pulse space-y-8">
          <div className="h-4 bg-stone-200 rounded w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-96 bg-stone-200 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-8 bg-stone-200 rounded w-3/4" />
              <div className="h-4 bg-stone-200 rounded w-1/4" />
              <div className="h-6 bg-stone-200 rounded w-1/3" />
              <div className="h-24 bg-stone-200 rounded" />
              <div className="h-12 bg-stone-200 rounded-xl" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-2xl mb-4">
            <FaBoxes />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">Product Not Found</h2>
          <p className="text-stone-500 text-sm mt-1 mb-6">
            The item you are searching for might have been moved or is currently unavailable.
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-[#1E3A2F] text-white rounded-xl text-sm font-semibold shadow-sm"
          >
            Back to Catalogue
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      <Navbar />

      {/* Floating feedback alert */}
      {feedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A2F] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-700 animate-in fade-in slide-in-from-bottom-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-sm font-medium">{feedback}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-stone-200/60 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-stone-500 truncate">
            <Link to="/" className="hover:text-stone-800">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-stone-800">Products</Link>
            <span>/</span>
            <span className="text-stone-800 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>

          <button
            onClick={() => navigate(-1)}
            className="text-xs font-semibold text-stone-600 hover:text-[#1E3A2F] flex items-center gap-1.5 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Product Detail Main Section */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Product Image Frame */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl bg-[#FAF8F5] border border-stone-200/60 p-8 flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[440px] group">
                
                {/* Product Category Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white text-[#1E3A2F] text-xs font-bold shadow-xs border border-stone-200">
                    {product.category || "Home Needs Essential"}
                  </span>
                </div>

                {/* Stock status indicator */}
                <div className="absolute top-4 right-4 z-10">
                  {product.stock > 0 ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                      <FaCheckCircle className="text-[10px]" /> In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                      Out of Stock
                    </span>
                  )}
                </div>

                <img
                  src={product.image || "/default-product.png"}
                  alt={product.name}
                  onError={(e) => (e.target.src = "/default-product.png")}
                  className="max-h-80 sm:max-h-96 w-auto object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                />
              </div>

              {/* Guarantees Strip below image */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
                  <FaShieldAlt className="mx-auto text-[#1E3A2F] text-lg mb-1" />
                  <p className="text-[11px] font-bold text-stone-800">1-Year Warranty</p>
                  <p className="text-[10px] text-stone-500">Genuine Replacement</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
                  <FaTruck className="mx-auto text-[#C05621] text-lg mb-1" />
                  <p className="text-[11px] font-bold text-stone-800">Free Delivery</p>
                  <p className="text-[10px] text-stone-500">On Orders &gt; ₹999</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
                  <FaUndo className="mx-auto text-amber-700 text-lg mb-1" />
                  <p className="text-[11px] font-bold text-stone-800">7 Days Return</p>
                  <p className="text-[10px] text-stone-500">Safe Replacement</p>
                </div>
              </div>
            </div>

            {/* Right Product Meta & Purchase Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Rating & Category header */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-500 text-sm">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <span className="text-xs font-bold text-stone-700">4.9 / 5.0</span>
                  <span className="text-xs text-stone-400">• Verified Customer Reviews</span>
                </div>

                {/* Product Name */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#1E3A2F]">
                    ₹{formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Inclusive of all taxes
                  </span>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed pt-2">
                  {product.description}
                </p>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 px-6 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-2xl shadow-lg shadow-[#1E3A2F]/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-98"
                  >
                    <FaShoppingCart className="text-base" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleToggleWishlist}
                    className={`py-4 px-6 rounded-2xl font-bold border transition-all duration-200 flex items-center justify-center gap-2 ${
                      isFav
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200"
                    }`}
                  >
                    <FaHeart className={isFav ? "text-red-500" : "text-stone-400"} />
                    <span>{isFav ? "Saved to Wishlist" : "Wishlist"}</span>
                  </button>
                </div>

              </div>

              {/* Tabs Section (Product Details / Material & Care / Delivery) */}
              <div className="mt-10 pt-6 border-t border-stone-200/80">
                <div className="flex items-center gap-6 border-b border-stone-200 text-xs font-bold uppercase tracking-wider mb-4">
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`pb-3 transition-colors ${
                      activeTab === "specs"
                        ? "border-b-2 border-[#1E3A2F] text-[#1E3A2F]"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab("care")}
                    className={`pb-3 transition-colors ${
                      activeTab === "care"
                        ? "border-b-2 border-[#1E3A2F] text-[#1E3A2F]"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    Care & Usage
                  </button>
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className={`pb-3 transition-colors ${
                      activeTab === "shipping"
                        ? "border-b-2 border-[#1E3A2F] text-[#1E3A2F]"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    Delivery & Warranty
                  </button>
                </div>

                <div className="text-xs sm:text-sm text-stone-600 leading-relaxed min-h-[90px]">
                  {activeTab === "specs" && (
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2F]"></span>
                        <strong>Material:</strong> Heavy-gauge stainless steel & certified food-grade alloy.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2F]"></span>
                        <strong>Base Compatibility:</strong> Induction, Gas Stove, Electric, & Ceramic.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A2F]"></span>
                        <strong>Safety:</strong> Heat-resistant handles and 100% PFOA/toxin-free.
                      </li>
                    </ul>
                  )}

                  {activeTab === "care" && (
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C05621]"></span>
                        Allow cookware to cool naturally before washing with room-temperature water.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C05621]"></span>
                        Use mild liquid detergent and a soft sponge. Avoid steel wool scourers.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C05621]"></span>
                        Dry thoroughly after washing to retain pristine mirror finish.
                      </li>
                    </ul>
                  )}

                  {activeTab === "shipping" && (
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                        Dispatches in 24 hours. Typical transit time 2-5 business days across India.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                        Covered under Home Needs 1-Year Manufacturer Warranty against defects.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                        Cash on Delivery (COD) and Razorpay secure online payment accepted.
                      </li>
                    </ul>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;
