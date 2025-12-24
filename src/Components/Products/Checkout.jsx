import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });

  const getPriceNumber = (price) => {
  return Number(
    price
      .toString()
      .replace("₹", "")
      .replace(/,/g, "")
  );
};


  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce(
  (sum, item) => sum + getPriceNumber(item.price) * item.quantity,
  0
);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all details");
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      total,
      customer: form,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("order", JSON.stringify(order));
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));

    alert("Order placed successfully 🎉");
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">

      {/* Cart Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-3"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
  ₹{getPriceNumber(item.price) * item.quantity}
            </p>
          </div>
        ))}

        <div className="flex justify-between text-xl font-bold mt-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Checkout Form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-3"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          className="w-full border p-3 rounded mb-3"
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-3 rounded mb-3"
          onChange={handleChange}
        />

        <select
          name="payment"
          className="w-full border p-3 rounded mb-6"
          onChange={handleChange}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>

        <button
          onClick={placeOrder}
          className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700"
        >
          Place Order ✅
        </button>
      </div>
    </div>
  );
}

export default Checkout;
