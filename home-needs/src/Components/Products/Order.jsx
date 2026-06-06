

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useCart } from "../../Contexts/CartContext";
// import { useAuth } from "../../Contexts/AuthContext";
import { useOrder } from "../../Contexts/OrderContext";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import api from "../../Api/Axios";

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
  try {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all details");
      return;
    }

    // 🟢 COD FLOW
    if (form.payment === "COD") {
      const order = {
        userId: user._id,
       items: cart.map(i => ({
   productId: i.productId._id,

   name: i.productId.name,

   image: i.productId.image,

   price: i.productId.price,

   quantity: i.quantity,
})),
        total: totalPrice,
        customer: form,
        payment: "COD",
        status: "placed",
      };

      await placeOrder(order);
      clearCart();
      alert("COD Order placed 🎉");
      navigate("/orders");
      return;
    }

    // 🔵 ONLINE PAYMENT FLOW
    const { data } = await api.post("/payment/create", {
      cart,
      userId: user._id,
    });

    const razorpayOrder = data.order;

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }
console.log("KEY:", import.meta.env.VITE_PAYMENT_KEY);
    const options = {
      
      key: import.meta.env.VITE_PAYMENT_KEY,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "My Shop",
      order_id: razorpayOrder.id,

      prefill: {
        name: form.name,
        contact: form.phone,
      },
      

      handler: async function (response) {
        await api.post("/payment/verify", {
          order_id: razorpayOrder.id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          customer: form,
          cartItems: cart,
          total: totalPrice,
          userId: user._id,
          payment: form.payment,
        });

        clearCart();
        alert("Payment Successful 🎉");
        navigate("/orders");
      },

      modal: {
        ondismiss: function () {
          alert("Payment cancelled");
        },
      },
    };

    // ✅ THIS WAS MISSING — opens the Razorpay popup
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    alert("Payment failed");
  }
};

const getPriceNumber = (price) => {
    if (!price) return 0;
    return Number(price.toString().replace("₹", "").replace(/,/g, ""));
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
            key={item._id || item.productId?._id}
            className="flex justify-between border-b py-3"
          >
            <div className="flex items-center gap-4">
  <img
    src={item.productId?.image || "/default-product.png"}
    alt={item.productId?.name}
    className="w-20 h-20 object-contain"
  />

  <div>
    <p className="font-medium">{item.productId?.name}</p>
    <p>Qty: {item.quantity}</p>
  </div>
</div>
            <p className="font-semibold">
              ₹{getPriceNumber(item.productId.price) * item.quantity}
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