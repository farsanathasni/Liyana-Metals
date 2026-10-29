import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaCreditCard,
  FaCheckCircle,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All Products', path: '/products' },
    { name: 'About Our Heritage', path: '/about' },
    { name: 'Customer Care & Contact', path: '/contact' },
    { name: 'Track My Orders', path: '/orders' },
    { name: 'Wishlist', path: '/wishlist' },
  ];

  const categories = [
    { name: 'Cookware Sets & Pans', path: '/products' },
    { name: 'Cooktop & Chimneys', path: '/products' },
    { name: 'Kitchen & Chef Tools', path: '/products' },
    { name: 'Smart Kitchen Appliances', path: '/products' },
    { name: 'Designer Dinnerware', path: '/products' },
    { name: 'Homeware & Storage', path: '/products' },
  ];

  const trustHighlights = [
    {
      icon: <FaTruck className="text-xl text-[#C05621]" />,
      title: "Pan-India Express Shipping",
      desc: "Fast delivery to 15,000+ pin codes",
    },
    {
      icon: <FaShieldAlt className="text-xl text-[#C05621]" />,
      title: "Certified Food-Grade Safe",
      desc: "Toxin-free, durable materials",
    },
    {
      icon: <FaCreditCard className="text-xl text-[#C05621]" />,
      title: "100% Secure Checkout",
      desc: "Protected by Razorpay & UPI",
    },
    {
      icon: <FaUndo className="text-xl text-[#C05621]" />,
      title: "7-Day Easy Replacement",
      desc: "Hassle-free return policy",
    },
  ];

  return (
    <footer className="bg-[#141A17] text-stone-300 relative border-t border-stone-800">
      
      {/* Top Value Proposition Strip */}
      <div className="border-b border-stone-800/80 bg-[#19221E]/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustHighlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#C05621]/15 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">{item.title}</h4>
                  <p className="text-xs text-stone-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2E5848] to-[#1E3A2F] flex items-center justify-center text-white shadow-md shadow-emerald-950/40">
                <FaHome className="text-xl text-emerald-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  LIYANA  <span className="text-[#C05621]"> METALS</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400/80">
                  Living & Kitchen Essentials
                </span>
              </div>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Curating premium cookware, induction essentials, and kitchen appliances crafted to bring comfort, durability, and elegance to modern Indian households.
            </p>

            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-center gap-3 text-stone-300">
                <FaMapMarkerAlt className="text-[#C05621] text-base flex-shrink-0" />
                <span>Tamil Nadu, Mettupalayam, India</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <FaPhoneAlt className="text-[#C05621] text-sm flex-shrink-0" />
                <a href="tel:+919633849846" className="hover:text-white transition-colors">
                  +91 9633849846
                </a>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <FaEnvelope className="text-[#C05621] text-sm flex-shrink-0" />
                <a href="mailto:farsanathasni9846@gmail.com" className="hover:text-white transition-colors">
                  farsanathasni9846@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 pb-2 border-b border-stone-800">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-stone-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700 group-hover:bg-[#C05621] transition-colors"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 pb-2 border-b border-stone-800">
              Categories
            </h3>
            <ul className="space-y-3 text-sm">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={cat.path}
                    className="text-stone-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700 group-hover:bg-[#C05621] transition-colors"></span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-5 pb-2 border-b border-stone-800">
              Stay in Touch
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Subscribe to get seasonal promotional discounts, new arrival launches, and kitchen care guides.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1F2722] border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C05621] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#C05621] hover:bg-[#d4642c] text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md transition-all duration-200"
              >
                Subscribe Now
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <FaCheckCircle /> Thank you for subscribing!
              </p>
            )}

            <div className="pt-2">
              <span className="inline-block text-[11px] text-stone-500">
                🔒 We respect your privacy. No spam ever.
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {currentYear} Liyana Metals. All rights reserved. Built for modern homes across India.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-stone-300 transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-stone-300 transition-colors">
              Customer Support
            </Link>
            <Link to="/products" className="hover:text-stone-300 transition-colors">
              Catalogue
            </Link>
            <span className="text-stone-500">Razorpay Verified Merchant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
