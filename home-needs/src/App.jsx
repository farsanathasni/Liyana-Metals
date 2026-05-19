import React from 'react';
import {  Routes, Route  } from "react-router-dom";
import Home from './Components/pages/Home';
import Contact from './Components/pages/Contact';
import About from './Components/pages/About';
import RegisterPage from './Components/Auth/RegisterPage';
import LoginPage from './Components/Auth/LoginPage';
import Cart from './Components/Products/Cart';
// import BestSeller from './Components/pages/BestSeller';
import Products from './Components/Products/Products';
import ProductDetails from './Components/Products/ProductsDetail';
import Wishlist from './Components/Products/Wishlist';
// import Banner from './Components/pages/Banner';
import Order from './Components/Products/Order';
import MyOrders from './Components/Products/MyOrders';
import AdminDashborad from './Admin/AdminDashborad';
import UserManagement from './Admin/UserManagement';
import OrderManagement from './Admin/OrderManagement';
import ProductsManagment from './Admin/ProductsManagment';
import ProtectedRoute from './Components/Layout/protectRoute';
import AdminRoute from './Components/Layout/adminRoute';


function App() {

  return (
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          {/* <Route path="/loginpage" element={<Banner />} /> */}
          <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
          {/* <Route path="/bestseller" element={<BestSeller/>} /> */}
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/order" element={<ProtectedRoute> <Order/> </ProtectedRoute>}/>
          <Route path="/orders" element={<ProtectedRoute> <MyOrders/> </ProtectedRoute>}/>
          <Route path="/dashboard" element={<AdminRoute> <AdminDashborad/> </AdminRoute>}/>
          <Route path="/usermanagement" element={<AdminRoute> <UserManagement/> </AdminRoute>}/>
          <Route path="/ordermanagement" element={<AdminRoute><OrderManagement/> </AdminRoute>}/>
          <Route path="/productsmanagement" element={<AdminRoute><ProductsManagment/> </AdminRoute>}/>
        </Routes>
        
  );
}

export default App;