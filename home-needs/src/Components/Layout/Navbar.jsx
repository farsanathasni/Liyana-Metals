import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaShippingFast,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChevronDown,
  FaHome,
  FaBoxes,
  FaShieldAlt,
} from "react-icons/fa";
import { useAuth } from "../../Contexts/AuthContext";
import { useCart } from "../../Contexts/CartContext";
import { useWishlist } from "../../Contexts/WishList";
import { useSearch } from "../../Contexts/SerchContext";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { searchTerm, setSearchTerm } = useSearch();

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const totalItems = cart?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const wishlistCount = wishlist?.length || 0;

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== "/products") {
      navigate("/products");
    }
    setSearchOpenMobile(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-all duration-200 ${
      isActive
        ? "text-[#C05621] font-semibold border-b-2 border-[#C05621] pb-1"
        : "text-stone-700 hover:text-[#C05621] pb-1 border-b-2 border-transparent"
    }`;

  const categoriesList = [
    { name: "All Products", path: "/products" },
    { name: "Cookware", path: "/products" },
    { name: "Cooktop & Chimney", path: "/products" },
    { name: "Kitchen Tools", path: "/products" },
    { name: "Appliances", path: "/products" },
    { name: "Homeware", path: "/products" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#1E3A2F] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="flex items-center gap-2 mx-auto sm:mx-0 font-medium tracking-wide">
            <span className="hidden sm:inline bg-emerald-700/60 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase">
              Special Offer
            </span>
            <span>Free Express Delivery on Orders Over ₹999 across India</span>
          </p>
          <div className="hidden sm:flex items-center gap-6 text-emerald-100 text-[11px]">
            <span>100% Food-Grade Certified</span>
            <span>24/7 Support: +91 9633849846</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1E3A2F] to-[#2E5848] flex items-center justify-center text-white shadow-md shadow-[#1E3A2F]/20 group-hover:scale-105 transition-transform">
                <FaHome className="text-xl text-emerald-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-stone-900 group-hover:text-[#1E3A2F] transition-colors">
                  LIYANA <span className="text-[#C05621]">METALS</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-stone-600 -mt-1">
                  Living & Kitchen Essentials
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/products" className={navLinkClass}>
                Shop
              </NavLink>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  onMouseEnter={() => setCategoryDropdownOpen(true)}
                  className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-stone-700 hover:text-[#C05621] transition-colors py-2"
                >
                  <span>Categories</span>
                  <FaChevronDown className="text-[10px] transition-transform group-hover:rotate-180 text-stone-400" />
                </button>

                <div
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                  className={`absolute left-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-stone-100 py-2 transition-all duration-200 z-50 ${
                    categoryDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }`}
                >
                  {categoriesList.map((cat, idx) => (
                    <Link
                      key={idx}
                      to={cat.path}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-stone-600 hover:text-[#1E3A2F] hover:bg-[#FAF8F5] transition-colors font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </nav>

            {/* Live Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-2">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search cookware, stove, grinder..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    if (location.pathname !== "/products") {
                      // allow search typing without immediate forced navigation, but on submit goes to /products
                    }
                  }}
                  className="w-full bg-[#FAF8F5] border border-stone-200 text-stone-800 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1E3A2F] focus:bg-white focus:ring-2 focus:ring-[#1E3A2F]/10 transition-all placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#1E3A2F] transition-colors"
                >
                  <FaSearch className="text-sm" />
                </button>
              </form>
            </div>

            {/* Right Action Icons Group */}
            <div className="flex items-center gap-2 sm:gap-4" ref={dropdownRef}>
              
              {/* Mobile Search Toggle */}
              <button
                type="button"
                aria-label="Open search"
                onClick={() => setSearchOpenMobile(!searchOpenMobile)}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
              >
                <FaSearch className="text-base" />
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                aria-label="View wishlist"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-stone-700 hover:text-[#C05621] hover:bg-stone-100/80 transition-colors"
              >
                <FaHeart className="text-lg" />
                {wishlistCount > 0 && (
                  <span className="absolute 1 top-1 right-1 w-4 h-4 bg-[#C05621] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Icon */}
              <Link
                to="/cart"
                aria-label="View shopping cart"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-stone-700 hover:text-[#1E3A2F] hover:bg-stone-100/80 transition-colors"
              >
                <FaShoppingCart className="text-lg" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#1E3A2F] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {/* Orders Icon (If Authenticated) */}
              {isAuthenticated && (
                <Link
                  to="/orders"
                  aria-label="My orders"
                  title="My Orders"
                  className="hidden sm:flex relative w-10 h-10 rounded-full items-center justify-center text-stone-700 hover:text-[#1E3A2F] hover:bg-stone-100/80 transition-colors"
                >
                  <FaShippingFast className="text-lg" />
                </Link>
              )}

              {/* User Account / Auth Dropdown */}
              <div className="relative">
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-medium transition-all"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-[10px] font-bold">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span className="max-w-[80px] truncate hidden sm:inline">
                        {user?.name || "Account"}
                      </span>
                      <FaChevronDown className="text-[9px] text-stone-500" />
                    </button>

                    {/* Account Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-4 py-3 border-b border-stone-100">
                          <p className="text-xs text-stone-500">Signed in as</p>
                          <p className="text-sm font-semibold text-stone-800 truncate">
                            {user?.name || user?.email}
                          </p>
                          <p className="text-xs text-stone-400 truncate">{user?.email}</p>
                        </div>

                        {user?.role === "admin" && (
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 font-medium"
                          >
                            <FaShieldAlt className="text-sm" />
                            Admin Dashboard
                          </Link>
                        )}

                        <Link
                          to="/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 font-medium"
                        >
                          <FaBoxes className="text-sm text-stone-400" />
                          My Orders
                        </Link>

                        <Link
                          to="/wishlist"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 font-medium"
                        >
                          <FaHeart className="text-sm text-stone-400" />
                          Wishlist ({wishlistCount})
                        </Link>

                        <div className="border-t border-stone-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                          >
                            <FaSignOutAlt className="text-sm" />
                            Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/loginpage"
                      className="px-4 py-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="hidden sm:inline-flex items-center px-4 py-2 bg-[#1E3A2F] hover:bg-[#284f3f] text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs hover:shadow-md transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors ml-1"
              >
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>

            </div>
          </div>

          {/* Mobile Search Input Drawer (Visible when toggled) */}
          {searchOpenMobile && (
            <div className="md:hidden pb-4 pt-1 animate-in fade-in duration-150">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-300 text-stone-800 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white/98 backdrop-blur-md px-4 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-medium rounded-xl text-stone-800 hover:bg-stone-50"
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-medium rounded-xl text-stone-800 hover:bg-stone-50"
              >
                Shop All Products
              </NavLink>

              <div className="pl-4 py-1 space-y-1 border-l-2 border-stone-100 ml-4">
                <p className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">
                  Top Categories
                </p>
                {categoriesList.slice(1).map((cat, idx) => (
                  <Link
                    key={idx}
                    to={cat.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1.5 text-sm text-stone-600 hover:text-[#C05621]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-medium rounded-xl text-stone-800 hover:bg-stone-50"
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-medium rounded-xl text-stone-800 hover:bg-stone-50"
              >
                Contact
              </NavLink>

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 text-base font-medium rounded-xl text-stone-800 hover:bg-stone-50 flex items-center justify-between"
                  >
                    <span>My Orders</span>
                    <FaShippingFast className="text-stone-400" />
                  </NavLink>

                  <NavLink
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 text-base font-medium rounded-xl text-stone-800 hover:bg-stone-50 flex items-center justify-between"
                  >
                    <span>Wishlist</span>
                    <span className="bg-stone-100 text-stone-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                      {wishlistCount}
                    </span>
                  </NavLink>
                </>
              )}

              <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 text-center bg-stone-100 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition"
                  >
                    Log Out
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/loginpage"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-center border border-stone-300 text-stone-800 font-semibold rounded-xl hover:bg-stone-50 text-sm"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 text-center bg-[#1E3A2F] text-white font-semibold rounded-xl hover:bg-[#284f3f] text-sm"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
