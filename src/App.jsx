import React from 'react';
import {  Routes, Route ,Navigate } from "react-router-dom";

import RegisterPage from './Components/Auth/RegisterPage';
import LoginPage from './Components/Auth/LoginPage';
import Home from './Components/Products/Home';
import About from './Pages/About';
import Cart from './Components/Products/Cart';
import Contact from './Components/Layout/Contact';
import BestSeller from './Components/Products/BestSeller';
import Products from './Components/Products/Products';
import ProductDetails from './Components/Products/ProductsDetail';
import Wishlist from './Components/Products/Wishlist';
import Checkout from './Components/Products/Checkout';
import { useAuth } from "./Contexts/AuthContext";


function App() {
    const { isAuthenticated, loadingAuth } = useAuth();
  if (loadingAuth) return <div>Loading...</div>;

  return (
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bestseller" element={<BestSeller/>} />
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="wishlist" element={<Wishlist/>}/>
          <Route path="checkout" element={<Checkout/>}/>
        </Routes>
        
  );
}

export default App;