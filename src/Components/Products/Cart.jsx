import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, totalPrice } = useCart();
const { isAuthenticated } = useAuth();

 
if (!isAuthenticated) {
  return (
    <div className="text-center mt-10">
      <h2>Please login to view your cart</h2>

      <button
        onClick={() => navigate("/loginpage")}
        className="text-amber-600 underline mr-2"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="text-amber-600 underline"
      >
        Register
      </button>
    </div>
  );
}
  return (
    <>
<Navbar/>

    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>
          Cart is empty.{" "}
          <span
            onClick={() => navigate("/products")}
            className="text-amber-600 underline cursor-pointer"
          >
            Shop now
          </span>
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-amber-600 font-bold">₹{item.price}</p>
                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Total: ₹{totalPrice.toLocaleString()}
            </p>
            <button
              className="mt-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              onClick={() => navigate("/order")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>


    </>
  );
}

export default Cart;
