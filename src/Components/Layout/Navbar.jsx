

import React, { useState } from "react";
import { Form, Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaShippingFast } from "react-icons/fa";
import { useEffect } from "react";
// import { useAuth } from "../Contexts/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useCart } from "../../Contexts/CartContext";




function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
const [wishlistCount, setWishlistCount] = useState(0);
const { user, isAuthenticated, logout } = useAuth();
const { cart } = useCart();
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
const navigate = useNavigate();


 useEffect(() => {
  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  updateCounts();

  window.addEventListener("storage", updateCounts);

  window.addEventListener("cartUpdated", updateCounts);

  return () => {
    window.removeEventListener("storage", updateCounts);
    window.removeEventListener("cartUpdated", updateCounts);
  };
}, []);


  const linkStyle = ({ isActive }) =>
    `text-lg font-medium transition-colors duration-300 ${
      isActive ? "text-amber-700" : "text-gray-700 hover:text-amber-600"
    }`;


    const handleLogout = () => {
  logout();
  navigate("/"); 
};

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">


          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">LM</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Liyana <span className="text-amber-700">Metals</span>
            </span>
          </Link>
        </div>
      </div>


      <nav className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center h-14 relative">

            <ul className="hidden md:flex items-center space-x-20">
              <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
              <li><NavLink to="/about" className={linkStyle}>About</NavLink></li>
              <li><NavLink to="/contact" className={linkStyle}>Contact</NavLink></li>
              <li><NavLink to="/products" className={linkStyle}>Products</NavLink></li>

            <li><NavLink to="/wishlist" className={linkStyle}>
  <div className="relative">
    <FaHeart size={20} />
    {wishlistCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {wishlistCount}
      </span>
    )}
  </div>
</NavLink></li> 

<NavLink to="/cart" className={linkStyle}>
  <div className="relative">
    <FaShoppingCart size={20} />
    {totalItems > 0 && (
      <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {totalItems}
      </span>
    )}
  </div>
</NavLink>

<li>
    <NavLink to="/orders" className={linkStyle}>
      <FaShippingFast/>
    </NavLink>
  </li>

             <li>
  {isAuthenticated ? (
    <button
      onClick={handleLogout}
      className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
    >
      Logout
    </button>
  ) : (
    <Link
      to="/register"
      className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
    >
      Login / Register
    </Link>
  )}
</li>
            </ul>

            <button
              className="md:hidden absolute right-4 font-semibold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Menu
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <ul className="px-4 py-4 space-y-4 text-center">
              <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={linkStyle}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setMenuOpen(false)} className={linkStyle}>About</NavLink></li>
              <li><NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkStyle}>Contact</NavLink></li>
              <li><NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className={linkStyle} >Wishlest </NavLink></li>
              <li><NavLink to="/cart" onClick={() => setMenuOpen(false)} className={linkStyle}> Cart</NavLink></li>
              <li><NavLink to="/orders" onClick={() => setMenuOpen(false)}className={linkStyle}>My Orders </NavLink> </li>
              <li><NavLink to="/products" onClick={() => setMenuOpen(false)}className={linkStyle}>Products </NavLink> </li>

              <li>
  {isAuthenticated ? (
    <button
      onClick={() => { handleLogout(); setMenuOpen(false); }}
      className="block mx-auto w-fit px-5 py-2 bg-amber-600 text-white rounded-lg"
    >
      Logout
    </button>
  ) : (
    <Link
      to="/register"
      onClick={() => setMenuOpen(false)}
      className="block mx-auto w-fit px-5 py-2 bg-amber-600 text-white rounded-lg"
    >
      Login / Register
    </Link>
  )}
</li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
