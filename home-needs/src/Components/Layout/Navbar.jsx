import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaShippingFast,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChevronDown,
  FaBoxes,
  FaShieldAlt,
  FaHome,
  FaStore,
  FaPhone,
} from "react-icons/fa";
import { useAuth } from "../../Contexts/AuthContext";
import { useCart } from "../../Contexts/CartContext";
import { useWishlist } from "../../Contexts/WishList";
import { useSearch } from "../../Contexts/SerchContext";

/* ─────────────────────────────────────────────
   Liyana Metals — Navbar
   Breakpoints tested: 320 / 375 / 425 / 768 / 1024 / 1280+
───────────────────────────────────────────── */

const CATEGORIES = [
  { name: "All Products",      path: "/products" },
  { name: "Cookware",          path: "/products" },
  { name: "Cooktop & Chimney", path: "/products" },
  { name: "Kitchen Tools",     path: "/products" },
  { name: "Appliances",        path: "/products" },
  { name: "Homeware",          path: "/products" },
];

function Navbar() {
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [searchMobile,  setSearchMobile]  = useState(false);
  const [userDrop,      setUserDrop]      = useState(false);
  const [catDrop,       setCatDrop]       = useState(false);
  const [catMobile,     setCatMobile]     = useState(false); // accordion in mobile menu
  const [scrolled,      setScrolled]      = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const { cart }                          = useCart();
  const { wishlist }                      = useWishlist();
  const { searchTerm, setSearchTerm }     = useSearch();

  const navigate     = useNavigate();
  const location     = useLocation();
  const dropRef      = useRef(null);

  const totalItems    = cart?.reduce((s, i) => s + (i.quantity || 0), 0) || 0;
  const wishlistCount = wishlist?.length || 0;

  /* ── close mobile menu on route change ── */
  useEffect(() => {
    setMobileOpen(false);
    setSearchMobile(false);
    setCatMobile(false);
  }, [location.pathname]);

  /* ── scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close dropdowns on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setUserDrop(false);
        setCatDrop(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── keyboard: Escape closes everything ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setUserDrop(false);
        setCatDrop(false);
        setSearchMobile(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (location.pathname !== "/products") navigate("/products");
    setSearchMobile(false);
    setMobileOpen(false);
  }, [location.pathname, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    setUserDrop(false);
    setMobileOpen(false);
    navigate("/");
  }, [logout, navigate]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setCatMobile(false);
  }, []);

  /* ── active link style ── */
  const navLink = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-all duration-200 ${
      isActive
        ? "text-[#C05621] font-semibold border-b-2 border-[#C05621] pb-0.5"
        : "text-stone-700 hover:text-[#C05621] pb-0.5 border-b-2 border-transparent"
    }`;

  /* ── mobile link style ── */
  const mobileLink = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? "bg-[#1E3A2F]/8 text-[#1E3A2F] font-semibold"
        : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
    }`;

  return (
    <>
      {/* ══════════════ TOP ANNOUNCEMENT STRIP ══════════════ */}
      <div className="bg-[#1E3A2F] text-white text-[11px] py-2 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Scrolling ticker on mobile, static on sm+ */}
          <p className="font-medium tracking-wide truncate flex items-center gap-2 min-w-0">
            <span className="hidden sm:inline shrink-0 bg-emerald-700/60 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              Offer
            </span>
            <span className="truncate">Free Express Delivery on Orders Over ₹999</span>
          </p>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-emerald-100">
            <span className="flex items-center gap-1">
              <FaPhone className="text-[9px]" />+91 9633849846
            </span>
            <span className="opacity-60">|</span>
            <span>Food-Grade Certified</span>
          </div>
        </div>
      </div>

      {/* ══════════════ STICKY HEADER ══════════════ */}
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow duration-200 ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 sm:h-18 lg:h-20 gap-2 sm:gap-4">

            {/* ── LOGO ── */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 group shrink-0 mr-1"
              aria-label="Liyana Metals – Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-[#1E3A2F] to-[#2E5848] flex items-center justify-center text-white shadow-md shadow-[#1E3A2F]/20 group-hover:scale-105 transition-transform shrink-0">
                <FaHome className="text-base sm:text-lg lg:text-xl text-emerald-200" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-stone-900 group-hover:text-[#1E3A2F] transition-colors whitespace-nowrap">
                  LIYANA <span className="text-[#C05621]">METALS</span>
                </span>
                <span className="hidden sm:block text-[9px] tracking-widest uppercase font-semibold text-stone-500 mt-0.5">
                  Living &amp; Kitchen Essentials
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            <nav className="hidden lg:flex items-center gap-7 shrink-0" aria-label="Main navigation">
              <NavLink to="/"        className={navLink}>Home</NavLink>
              <NavLink to="/products" className={navLink}>Shop</NavLink>

              {/* Categories hover dropdown */}
              <div
                className="relative"
                ref={dropRef}
                onMouseEnter={() => setCatDrop(true)}
                onMouseLeave={() => setCatDrop(false)}
              >
                <button
                  onClick={() => setCatDrop((v) => !v)}
                  className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-stone-700 hover:text-[#C05621] transition-colors py-2"
                  aria-haspopup="true"
                  aria-expanded={catDrop}
                >
                  <span>Categories</span>
                  <FaChevronDown
                    className={`text-[10px] text-stone-400 transition-transform duration-200 ${catDrop ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`absolute left-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50 transition-all duration-200 ${
                    catDrop ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible pointer-events-none"
                  }`}
                >
                  {CATEGORIES.map((cat, i) => (
                    <Link
                      key={i}
                      to={cat.path}
                      onClick={() => setCatDrop(false)}
                      className="block px-4 py-2.5 text-sm text-stone-600 hover:text-[#1E3A2F] hover:bg-[#FAF8F5] transition-colors font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink to="/about"   className={navLink}>About</NavLink>
              <NavLink to="/contact" className={navLink}>Contact</NavLink>
            </nav>

            {/* ── DESKTOP SEARCH ── */}
            <div className="hidden md:flex flex-1 min-w-0 max-w-xs lg:max-w-sm mx-2">
              <form onSubmit={handleSearchSubmit} className="relative w-full" role="search">
                <input
                  type="search"
                  placeholder="Search cookware, stove, grinder…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-200 text-stone-800 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1E3A2F] focus:bg-white focus:ring-2 focus:ring-[#1E3A2F]/10 transition-all placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#1E3A2F] transition-colors"
                >
                  <FaSearch className="text-sm" />
                </button>
              </form>
            </div>

            {/* ── RIGHT ICONS ── */}
            <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0" ref={dropRef}>

              {/* Mobile search toggle */}
              <button
                type="button"
                aria-label={searchMobile ? "Close search" : "Open search"}
                onClick={() => { setSearchMobile((v) => !v); setMobileOpen(false); }}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
              >
                {searchMobile ? <FaTimes className="text-base" /> : <FaSearch className="text-base" />}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                aria-label={`Wishlist (${wishlistCount} items)`}
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-stone-700 hover:text-[#C05621] hover:bg-stone-100/80 transition-colors"
              >
                <FaHeart className="text-base sm:text-lg" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#C05621] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label={`Cart (${totalItems} items)`}
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-stone-700 hover:text-[#1E3A2F] hover:bg-stone-100/80 transition-colors"
              >
                <FaShoppingCart className="text-base sm:text-lg" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#1E3A2F] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {/* Orders icon – only authenticated, hidden on small mobile */}
              {isAuthenticated && (
                <Link
                  to="/orders"
                  aria-label="My Orders"
                  title="My Orders"
                  className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-stone-700 hover:text-[#1E3A2F] hover:bg-stone-100/80 transition-colors"
                >
                  <FaShippingFast className="text-base sm:text-lg" />
                </Link>
              )}

              {/* User account button / login */}
              <div className="relative">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setUserDrop((v) => !v)}
                      className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-medium transition-all"
                      aria-haspopup="true"
                      aria-expanded={userDrop}
                      aria-label="User account menu"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span className="max-w-[72px] truncate hidden sm:inline">
                        {user?.name || "Account"}
                      </span>
                      <FaChevronDown
                        className={`text-[9px] text-stone-500 transition-transform duration-150 ${userDrop ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Account dropdown */}
                    {userDrop && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-4 py-3 border-b border-stone-100">
                          <p className="text-[11px] text-stone-500">Signed in as</p>
                          <p className="text-sm font-semibold text-stone-800 truncate">{user?.name || user?.email}</p>
                          <p className="text-[11px] text-stone-400 truncate">{user?.email}</p>
                        </div>

                        {user?.role === "admin" && (
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDrop(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 font-medium"
                          >
                            <FaShieldAlt className="text-sm" /> Admin Dashboard
                          </Link>
                        )}

                        <Link
                          to="/orders"
                          onClick={() => setUserDrop(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 font-medium"
                        >
                          <FaBoxes className="text-sm text-stone-400" /> My Orders
                        </Link>

                        <Link
                          to="/wishlist"
                          onClick={() => setUserDrop(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 font-medium"
                        >
                          <FaHeart className="text-sm text-stone-400" /> Wishlist ({wishlistCount})
                        </Link>

                        <div className="border-t border-stone-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                          >
                            <FaSignOutAlt className="text-sm" /> Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <Link
                      to="/loginpage"
                      className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors"
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

              
            </div>
          </div>

          {/* ── MOBILE SEARCH DRAWER ── */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              searchMobile ? "max-h-20 opacity-100 pb-3 pt-1" : "max-h-0 opacity-0"
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="relative w-full" role="search">
              <input
                type="search"
                placeholder="Search products…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-stone-300 text-stone-800 text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#1E3A2F] focus:ring-1 focus:ring-[#1E3A2F]"
                autoFocus={searchMobile}
              />
              <button type="submit" aria-label="Search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
                <FaSearch className="text-sm" />
              </button>
            </form>
          </div>
        </div>

        {/* ══════════════ MOBILE DRAWER MENU ══════════════
            CSS-driven slide transition — no JS-only render flash        */}
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`lg:hidden fixed inset-x-0 bottom-0 z-40 flex flex-col bg-white border-t border-stone-200 overflow-y-auto transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
          style={{ top: "calc(24px + 64px)" /* announcement(24) + header(64) */}}
        >
          {/* Backdrop overlay when open */}
          {mobileOpen && (
            <div
              className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-[1px]"
              onClick={closeMobile}
              aria-hidden="true"
            />
          )}

          <nav className="flex-1 px-4 py-5 space-y-1" aria-label="Mobile navigation">

            {/* Brand row inside drawer */}
            <div className="flex items-center gap-2 pb-4 mb-2 border-b border-stone-100">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E3A2F] to-[#2E5848] flex items-center justify-center text-white shadow shrink-0">
                <FaStore className="text-base text-emerald-200" />
              </div>
              <div>
                <p className="text-sm font-extrabold tracking-tight text-stone-900">
                  LIYANA <span className="text-[#C05621]">METALS</span>
                </p>
                <p className="text-[10px] text-stone-500 tracking-wider uppercase">Kitchen &amp; Living Essentials</p>
              </div>
            </div>

            {/* Main links */}
            <NavLink to="/"         onClick={closeMobile} className={mobileLink}>
              <FaHome className="text-stone-400 shrink-0" /> <span>Home</span>
            </NavLink>

            <NavLink to="/products" onClick={closeMobile} className={mobileLink}>
              <FaStore className="text-stone-400 shrink-0" /> <span>Shop All Products</span>
            </NavLink>

            {/* Categories accordion */}
            <div>
              <button
                onClick={() => setCatMobile((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                aria-expanded={catMobile}
              >
                <span className="flex items-center gap-3">
                  <FaBoxes className="text-stone-400 shrink-0" />
                  <span>Categories</span>
                </span>
                <FaChevronDown
                  className={`text-stone-400 text-[11px] transition-transform duration-200 ${catMobile ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-250 ${
                  catMobile ? "max-h-80 mt-1" : "max-h-0"
                }`}
              >
                <div className="ml-7 pl-4 border-l-2 border-stone-100 space-y-0.5">
                  {CATEGORIES.map((cat, i) => (
                    <Link
                      key={i}
                      to={cat.path}
                      onClick={closeMobile}
                      className="block py-2 px-3 text-sm text-stone-600 hover:text-[#1E3A2F] hover:bg-stone-50 rounded-lg transition-colors font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <NavLink to="/about"   onClick={closeMobile} className={mobileLink}>
              <span className="w-5 shrink-0 flex justify-center text-stone-400">ℹ</span>
              <span>About Us</span>
            </NavLink>

            <NavLink to="/contact" onClick={closeMobile} className={mobileLink}>
              <FaPhone className="text-stone-400 shrink-0" /> <span>Contact</span>
            </NavLink>

            {/* Authenticated extras */}
            {isAuthenticated && (
              <>
                <NavLink to="/orders"   onClick={closeMobile} className={mobileLink}>
                  <FaShippingFast className="text-stone-400 shrink-0" />
                  <span>My Orders</span>
                </NavLink>
                <NavLink to="/wishlist" onClick={closeMobile} className={mobileLink}>
                  <FaHeart className="text-stone-400 shrink-0" />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="ml-auto bg-[#C05621]/10 text-[#C05621] text-xs px-2 py-0.5 rounded-full font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </NavLink>
                {user?.role === "admin" && (
                  <NavLink to="/dashboard" onClick={closeMobile} className={mobileLink}>
                    <FaShieldAlt className="text-amber-600 shrink-0" />
                    <span className="text-amber-700 font-semibold">Admin Dashboard</span>
                  </NavLink>
                )}
              </>
            )}
          </nav>

          {/* Bottom auth section */}
          <div className="px-4 py-5 border-t border-stone-100 bg-[#FAF8F5]">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-1">
                  <div className="w-9 h-9 rounded-full bg-[#1E3A2F] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{user?.name}</p>
                    <p className="text-xs text-stone-500 truncate">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { handleLogout(); closeMobile(); }}
                  className="w-full py-3 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition text-sm"
                >
                  <FaSignOutAlt /> Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/loginpage"
                  onClick={closeMobile}
                  className="py-3 text-center border border-stone-300 text-stone-800 font-semibold rounded-xl hover:bg-stone-100 text-sm transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobile}
                  className="py-3 text-center bg-[#1E3A2F] text-white font-semibold rounded-xl hover:bg-[#284f3f] text-sm transition-colors shadow-xs"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
