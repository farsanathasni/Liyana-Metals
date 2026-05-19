import React, { useEffect, useState } from "react";import { useNavigate } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import api from "../../Api/Axios";




function BestSeller() {
  const navigate = useNavigate();
  const {cart, addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.product.slice(0, 4));
    } catch (error) {
      console.log("Failed to fetch products", error);
    }
  };

  fetchProducts();
}, []);

  // const isInCart = (id) =>
  // cart.some(item => item.productId?._id === id);


  const handleAddToCart = (item) => {
  if (!isAuthenticated) {
    alert("Please login to add items to cart");
    navigate("/loginpage");
    return;
  }

  // 👇 If already in cart → go to cart
  //  if (isInCart(item._id)) {
  //   navigate("/cart");
  //   return;
  // }

  addToCart(item);
  alert(`${item.name} added to cart!`);
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
  {products.map((item) => (
    <div key={item._id} className="bg-white rounded-xl shadow-md">

      <div className="h-52 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-44"
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-amber-600 font-bold">₹{item.price}</p>
        <p className="text-sm text-gray-500">⭐ {item.rating}</p>

        <button
          onClick={() => handleAddToCart(item)}
          className={`mt-4 w-full py-2 rounded-lg text-white bg-amber-600 hover:bg-amber-700`}
          //   ${isInCart(item._id)
          //     ? "bg-green-600 hover:bg-green-700"
          //     : "bg-amber-600 hover:bg-amber-700"}
          // `}
        >
          {/* {isInCart(item._id) ? "View Cart" : "Add to Cart"} */}Add to Cart
        </button>
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
