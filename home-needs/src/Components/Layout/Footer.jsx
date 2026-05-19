import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { name: 'Cookware', path: '/categories/cookware' },
    { name: 'Appliances', path: '/categories/appliances' },
    { name: 'Cooktop & Chimney', path: '/categories/cooktop-chimney' },
    { name: 'Home Care', path: '/categories/home-care' },
    { name: 'Kitchen Tools', path: '/categories/kitchen-tools' },
    { name: 'Home Appliances', path: '/categories/home-appliances' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">LM</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Liyana Metals</h2>
                <p className="text-sm text-amber-500">Premium Home Solutions</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg">
              Curating premium kitchen and home essentials that blend timeless design with modern functionality for the contemporary Indian household.
            </p>
          </div>


          <div>
            <h3 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-gray-700">
              Shop Categories
            </h3>
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-lg"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-6 pb-3 border-b border-gray-700">
              Contact Us
            </h3>
            <ul className="space-y-5">
             <li className="flex items-start space-x-4">
  <div className="w-10 h-10 bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
    <span className="text-amber-400">✉️</span>
  </div>
  <div>
    <p className="font-medium text-white">Email</p>
    <a href="mailto:farsanathasni9846@gmail.com" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-lg">
      farsanathasni9846@gmail.com
    </a>
  </div>
</li>
<li className="flex items-start space-x-4">
  <div className="w-10 h-10 bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
    <span className="text-amber-400">📞</span>
  </div>
  <div>
    <p className="font-medium text-white">Phone</p>
    <a href="tel:+919633849846" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-lg">
      +91 9633849846
    </a>
  </div>
</li>
<li className="flex items-start space-x-4">
  <div className="w-10 h-10 bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
    <span className="text-amber-400">📍</span>
  </div>
  <div>
    <p className="font-medium text-white">Location</p>
      Tamil nadu,Mettupalayam  
  </div>
</li>

            </ul>
          </div>
        </div>


        <div className="mt-12 pt-10 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Updated with Premium Collections
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-500"
              />
              <button className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-3">
              Get exclusive offers and new arrivals before anyone else
            </p>
          </div>
        </div>


        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-lg">
              &copy; {currentYear} Home Needs. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-lg">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-lg">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-lg">
                Return Policy
              </a>
            </div>
          </div>
          <p className="text-center text-gray-600 text-lg mt-6">
            Premium kitchen and home essentials for modern India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;