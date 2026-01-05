import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../Contexts/CartContext";
import { useAuth } from "../../Contexts/AuthContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { useWishlist } from "../../Contexts/WishList";
import api from "../../Api/Axios";


function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);   
  const {cart, addToCart } = useCart();
const { isAuthenticated, loadingAuth } = useAuth();
const { wishlist,addToWishlist } = useWishlist();




  useEffect(() => {
    
      api.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);


 const isInCart = product
  ? cart.some(item => item.productId === product.id)
  : false;

 const handleAddToCart = async () => {
  if (loadingAuth) return;

  if (!isAuthenticated) {
    alert("Please login or register to add items to cart");
    navigate("/loginpage");
    return;
  }

  // 👇 If already in cart → go to cart
  if (isInCart) {
    navigate("/cart");
    return;
  }

  try {
    await addToCart(product);
    alert(`${product.name} added to cart!`);
  } catch (err) {
    console.error(err);
    alert("Failed to add to cart");
  }
};



const isInWishlist = product
  ? wishlist.some(item => item.id === product.id)
  : false;



const handleAddToWishlist = async () => {
  if (!isAuthenticated) {
    alert("Please login to add wishlist");
    navigate("/loginpage");
    return;
  }

  // If already in wishlist → go to wishlist
  if (isInWishlist) {
    navigate("/wishlist");
    return;
  }

  try {
    await addToWishlist(product);
    alert(`${product.name} added to wishlist ❤️`);
  } catch (err) {
    console.error(err);
    alert("Failed to add to wishlist");
  }
};


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
    
  }


 

  return (
    <>
    <Navbar/>

    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image || "/assets/fallback.png"}
          alt={product.name}
          className="w-full h-[400px] object-contain"
          onError={(e) => (e.target.src = "/assets/fallback.png")}
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-3">{product.description}</p>

          <p className="text-amber-600 text-2xl font-bold mt-4">
            {product.price}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Stock: {product.stock}
          </p>

        <div className="mt-6 flex items-center gap-4">
  {/* Add / View Cart */}
  <button
    onClick={handleAddToCart}
    className={`px-6 py-3 text-white rounded-lg transition flex items-center gap-2
      ${
        isInCart
          ? "bg-green-600 hover:bg-green-700"
          : "bg-amber-600 hover:bg-amber-700"
      }
    `}
  >
    <FaShoppingCart />
    {isInCart ? "View Cart" : "Add to Cart"}
  </button>

<button
  onClick={handleAddToWishlist}
  className={`px-4 py-3 rounded-lg transition flex items-center gap-2 text-white
    ${
      isInWishlist
        ? "bg-green-600 hover:bg-green-700"
        : "bg-amber-600 hover:bg-amber-700"
    }
  `}
>
  <FaHeart />
  {isInWishlist ? "View Wishlist" : "Add to Wishlist"}
</button>

</div>
       

          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold text-lg text-gray-800">
              Product Details
            </h3>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              <li>High quality & durable material</li>
              <li>Easy to clean & maintain</li>
              <li>Perfect for daily kitchen use</li>
              <li>1 Year Manufacturer Warranty</li>
            </ul>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="mt-4 inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
          >
            Back to Products
          </button>
        </div>
         </div>
    </section>

<Footer/>

    </>
  );
}

export default ProductDetails;
