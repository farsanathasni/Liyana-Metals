// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
          
//           {/* Brand Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">HN</span>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Home Needs</h1>
//                 <p className="text-xs text-gray-500">Premium Home Essentials</p>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {/* Navigation Links */}
//             <div className="flex items-center space-x-10">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.name}
//                   to={link.href}
//                   className={({ isActive }) =>
//                     `text-lg font-medium transition-colors duration-200 ${
//                       isActive 
//                         ? 'text-amber-700 border-b-2 border-amber-700' 
//                         : 'text-gray-700 hover:text-amber-700'
//                     }`
//                   }
//                 >
//                   {link.name}
//                 </NavLink>
//               ))}
//             </div>

//             {/* Action Icons and Buttons */}
//             <div className="flex items-center space-x-8 pl-8 border-l border-gray-100">
//               {/* Wishlist */}
//               <NavLink 
//                 to="/wishlist" 
//                 className={({ isActive }) => 
//                   `relative group transition-colors duration-200 ${isActive ? 'text-amber-700' : 'text-gray-600 hover:text-amber-700'}`
//                 }
//               >
//                 <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-amber-50 transition-colors duration-200">
//                   <span className="text-2xl">❤️</span>
//                 </div>
//                 <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   3
//                 </span>
//                 <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
//                   Wishlist
//                 </span>
//               </NavLink>

//               {/* Cart */}
//               <NavLink 
//                 to="/cart" 
//                 className={({ isActive }) => 
//                   `relative group transition-colors duration-200 ${isActive ? 'text-amber-700' : 'text-gray-600 hover:text-amber-700'}`
//                 }
//               >
//                 <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-amber-50 transition-colors duration-200">
//                   <span className="text-2xl">🛒</span>
//                 </div>
//                 <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   5
//                 </span>
//                 <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
//                   Cart
//                 </span>
//               </NavLink>

//               {/* Login/Register */}
//               <div className="flex items-center space-x-6">
//                 <Link
//                   to="/login"
//                   className="text-lg font-medium text-gray-700 hover:text-amber-700 transition-colors duration-200"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200 shadow-sm text-lg"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden flex items-center space-x-6">
//             <NavLink to="/wishlist" className="text-gray-600 relative">
//               <div className="w-10 h-10 flex items-center justify-center">
//                 <span className="text-2xl">❤️</span>
//               </div>
//               <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 3
//               </span>
//             </NavLink>
//             <NavLink to="/cart" className="text-gray-600 relative">
//               <div className="w-10 h-10 flex items-center justify-center">
//                 <span className="text-2xl">🛒</span>
//               </div>
//               <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 5
//               </span>
//             </NavLink>
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-gray-700 focus:outline-none p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//               aria-label="Toggle mobile menu"
//             >
//               {isMobileMenuOpen ? (
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="lg:hidden bg-white border-t border-gray-100 py-4">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.name}
//                   to={link.href}
//                   className={({ isActive }) =>
//                     `block px-4 py-4 text-lg font-medium rounded-lg transition-colors duration-150 ${
//                       isActive
//                         ? 'text-amber-700 bg-amber-50'
//                         : 'text-gray-700 hover:text-amber-700 hover:bg-amber-50'
//                     }`
//                   }
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {link.name}
//                 </NavLink>
//               ))}
              
//               {/* Mobile Auth Buttons */}
//               <div className="pt-4 border-t border-gray-100 space-y-3">
//                 <Link
//                   to="/login"
//                   className="block px-4 py-4 text-lg font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors duration-150 text-center"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="block px-4 py-4 text-lg font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-150 text-center"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const linkStyle = ({ isActive }) =>
//     `text-lg font-medium transition-colors duration-300 ${
//       isActive ? "text-amber-700" : "text-gray-700 hover:text-amber-600"
//     }`;

//   return (
//     <>
    
// <div>
//   {/* uppernavbar */}
//   <div>
//     <div>
//       <div>
//          <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold">LM</span>
//             </div>
//             <span className="text-2xl font-bold">
//               Liyana <span className="text-amber-700">Metals</span>
//             </span>
//           </Link>
//       </div>
//       <div>
//         <input type="text" placeholder="serch......" />
//       </div>
//     </div>
//   </div>


// </div>


//     <nav className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">

//           {/* Brand */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold">LM</span>
//             </div>
//             <span className="text-2xl font-bold">
//               Liyana <span className="text-amber-700">Metals</span>
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <ul className="hidden md:flex items-center space-x-8">
//             <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
//             <li><NavLink to="/about" className={linkStyle}>About</NavLink></li>
//             <li><NavLink to="/contact" className={linkStyle}>Contact</NavLink></li>
//             <li><NavLink to="/wishlist" className={linkStyle}>❤️</NavLink></li>
//             <li><NavLink to="/cart" className={linkStyle}>🛒</NavLink></li>
//             <li>
//               <Link
//                 to="/register"
//                 className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
//               >
//                 Register / Login
//               </Link>
//             </li>
//           </ul>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden font-semibold"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             Menu
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden border-t">
//           <ul className="px-4 py-4 space-y-4">
//             <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={linkStyle}>Home</NavLink></li>
//             <li><NavLink to="/about" onClick={() => setMenuOpen(false)} className={linkStyle}>About</NavLink></li>
//             <li><NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkStyle}>Contact</NavLink></li>
//             <li><NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className={linkStyle}>❤️ Wishlist</NavLink></li>
//             <li><NavLink to="/cart" onClick={() => setMenuOpen(false)} className={linkStyle}>🛒 Cart</NavLink></li>
//             <li>
//               <Link
//                 to="/register"
//                 onClick={() => setMenuOpen(false)}
//                 className="block text-center px-5 py-2 bg-amber-600 text-white rounded-lg"
//               >
//                 Login / Register
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//     </>
//   );
// }

// export default Navbar;


// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const linkStyle = ({ isActive }) =>
//     `text-lg font-medium transition-colors duration-300 ${
//       isActive ? "text-amber-700" : "text-gray-700 hover:text-amber-600"
//     }`;

//   return (
//     <>
//       {/* ================= UPPER NAVBAR ================= */}
//       <div className="bg-amber-50 border-b border-amber-100">
//         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
//           {/* Brand */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold">LM</span>
//             </div>
//             <span className="text-2xl font-bold text-gray-900">
//               Liyana <span className="text-amber-700">Metals</span>
//             </span>
//           </Link>

//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="hidden md:block w-80 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//           />
//         </div>
//       </div>

//       {/* ================= MAIN NAVBAR ================= */}
//       <nav className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between items-center h-14">

//             {/* Empty left space (no logo here) */}
//             <div />

//             {/* Desktop Menu */}
//             <ul className="hidden md:flex items-center space-x-8">
//               <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
//               <li><NavLink to="/about" className={linkStyle}>About</NavLink></li>
//               <li><NavLink to="/contact" className={linkStyle}>Contact</NavLink></li>
//               <li><NavLink to="/wishlist" className={linkStyle}>❤️</NavLink></li>
//               <li><NavLink to="/cart" className={linkStyle}>🛒</NavLink></li>
//               <li>
//                 <Link
//                   to="/register"
//                   className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
//                 >
//                   Login / Register
//                 </Link>
//               </li>
//             </ul>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden font-semibold"
//               onClick={() => setMenuOpen(!menuOpen)}
//             >
//               Menu
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden border-t bg-white">
//             <ul className="px-4 py-4 space-y-4">
//               <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={linkStyle}>Home</NavLink></li>
//               <li><NavLink to="/about" onClick={() => setMenuOpen(false)} className={linkStyle}>About</NavLink></li>
//               <li><NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkStyle}>Contact</NavLink></li>
//               <li><NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className={linkStyle}>❤️ Wishlist</NavLink></li>
//               <li><NavLink to="/cart" onClick={() => setMenuOpen(false)} className={linkStyle}>🛒 Cart</NavLink></li>
//               <li>
//                 <Link
//                   to="/register"
//                   onClick={() => setMenuOpen(false)}
//                   className="block text-center px-5 py-2 bg-amber-600 text-white rounded-lg"
//                 >
//                   Login / Register
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

// export default Navbar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";
import { useEffect } from "react";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
const [wishlistCount, setWishlistCount] = useState(0);


 useEffect(() => {
  const handleStorageChange = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

  const linkStyle = ({ isActive }) =>
    `text-lg font-medium transition-colors duration-300 ${
      isActive ? "text-amber-700" : "text-gray-700 hover:text-amber-600"
    }`;

  return (
    <>
      {/* ================= UPPER NAVBAR ================= */}
      <div className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">LM</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Liyana <span className="text-amber-700">Metals</span>
            </span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center bg-white rounded-lg overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 w-70 focus:outline-none"
            />
            <button className="px-4 py-2  focus:outline-none">
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <nav className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center h-14 relative">

            {/* Desktop Menu (Centered) */}
            <ul className="hidden md:flex items-center space-x-20">
              <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
              <li><NavLink to="/about" className={linkStyle}>About</NavLink></li>
              <li><NavLink to="/contact" className={linkStyle}>Contact</NavLink></li>
             <NavLink to="/wishlist" className={linkStyle}>
  <div className="relative">
    <FaHeart size={20} />
    {wishlistCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {wishlistCount}
      </span>
    )}
  </div>
</NavLink>

<NavLink to="/cart" className={linkStyle}>
  <div className="relative">
    <FaShoppingCart size={20} />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </div>
</NavLink>

              <li>
                <Link to="/register" className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                  Login / Register
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden absolute right-4 font-semibold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <ul className="px-4 py-4 space-y-4 text-center">
              <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={linkStyle}>Home</NavLink></li>
              <li><NavLink to="/about" onClick={() => setMenuOpen(false)} className={linkStyle}>About</NavLink></li>
              <li><NavLink to="/contact" onClick={() => setMenuOpen(false)} className={linkStyle}>Contact</NavLink></li>
              <li><NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className={linkStyle} >Wishlest </NavLink></li>
              <li><NavLink to="/cart" onClick={() => setMenuOpen(false)} className={linkStyle}> Cart</NavLink></li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block mx-auto w-fit px-5 py-2 bg-amber-600 text-white rounded-lg"
                >
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
