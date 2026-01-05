

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import { useOrder } from "../../Contexts/OrderContext";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

function Order() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated, loadingAuth } = useAuth();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });

  // 🔐 Protect route
  useEffect(() => {
    if (loadingAuth) return;

    if (!isAuthenticated) {
      alert("Please login to place order");
      navigate("/loginpage");
    }
  }, [isAuthenticated, loadingAuth, navigate]);

  if (loadingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handlePlaceOrder = async () => {
  if (!form.name || !form.address || !form.phone) {
    alert("Please fill all details");
    return;
  }

  const itemsWithName = cart.map(item => ({
    ...item,
    name: item.name || "Unknown Product"  // attach product name
  }));


  try {
    const order = {
      userId: Number(user.id),
      items: itemsWithName,
      total: totalPrice,
      customer: form,
      payment: form.payment,
      status: "placed",
      createdAt: new Date().toISOString()
    };

    await placeOrder(order); // 🔥 if this fails → catch runs

    clearCart();
    alert("Order placed successfully 🎉");
    navigate("/orders");

  } catch (error) {
    console.error("Order error:", error);
    alert("Order failed. Please try again ❌");
  }
};

const getPriceNumber = (price) => {
  if (!price) return 0;
  return Number(
    price.toString().replace("₹", "").replace(/,/g, "")
  );
};



  return (
    <>
<Navbar/>

    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      
      {/* 🧾 Order Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-3"
          >
            <div>
              <p className="font-medium">
              {item.name}   {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
              ₹{getPriceNumber(item.price) * item.quantity}
            </p>
          </div>
        ))}

        <div className="flex justify-between text-xl font-bold mt-4">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>

      {/* 🚚 Shipping Details */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-3"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          className="w-full border p-3 rounded mb-3"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-3 rounded mb-3"
          value={form.phone}
          onChange={handleChange}
        />

        <select
          name="payment"
          className="w-full border p-3 rounded mb-6"
          value={form.payment}
          onChange={handleChange}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>

        <button
        type="button"
          onClick={handlePlaceOrder}
          
          className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700"
        >
          Place Order ✅
        </button>
      </div>
    </div>



    </>
  );
}

export default Order;

