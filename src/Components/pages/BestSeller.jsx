import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";

import farypanImg from "../../Assets/farypan.jpeg"; // Import at top
import airtightjarImg from "../../Assets/airtightjar.jpeg";
import knife1Img from "../../Assets/knife1.jpeg";
import nonsticcasaroleImg from "../../Assets/nonsticcasarole.jpeg";


const Productsdata = [
  {
    id: 1,
    image: airtightjarImg,
    title: "Airtight Storage Jar",
    price: 299,
    rating: 5.0,
  },
  {
    id: 2,
    image: farypanImg,
    title: "Non-Stick Fry Pan",
    price: 399,
    rating: 5.0,
  },
  {
    id: 3,
    image: knife1Img,
    title: "Premium Kitchen Knife",
    price: 275,
    rating: 4.5,
  },
  {
    id: 4,
    image: nonsticcasaroleImg,
    title: "Non-Stick Casserole",
    price: 1599,
    rating: 4.0,
  },
];

function BestSeller() {
  const navigate = useNavigate();
  const {cart, addToCart } = useCart();
  const { isAuthenticated } = useAuth();


  const isInCart = (id) =>
  cart.some(item => item.productId === id);


  const handleAddToCart = (item) => {
  if (!isAuthenticated) {
    alert("Please login to add items to cart");
    navigate("/loginpage");
    return;
  }

  // 👇 If already in cart → go to cart
  if (isInCart(item.id)) {
    navigate("/cart");
    return;
  }

  addToCart(item);
  alert(`${item.title} added to cart!`);
};


  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <p className="text-amber-600 font-medium">
            Top Selling Products for You
          </p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Best Sellers
          </h1>
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {Productsdata.map((item) => (
    <div key={item.id} className="bg-white rounded-xl shadow-md">

      <div className="h-52 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.title}
          className="max-h-44"
          onError={(e) => (e.target.src = fallbackImg)} // fallback if image fails
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-amber-600 font-bold">₹{item.price}</p>
        <p className="text-sm text-gray-500">⭐ {item.rating}</p>

        <button
          onClick={() => handleAddToCart(item)}
          className={`mt-4 w-full py-2 rounded-lg text-white
            ${isInCart(item.id)
              ? "bg-green-600 hover:bg-green-700"
              : "bg-amber-600 hover:bg-amber-700"}
          `}
        >
          {isInCart(item.id) ? "View Cart" : "Add to Cart"}
        </button>
      </div>

    </div>
  ))}
</div>


            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-amber-600 text-white rounded-full"
          >
            View All Products
          </button>
        </div>

      </div>
    </section>
  );
}

export default BestSeller;
